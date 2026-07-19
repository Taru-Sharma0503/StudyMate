import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

     const isAuthRoute =
      original.url.includes("/auth/login") ||
      original.url.includes("/auth/register") ||
      original.url.includes("/auth/profile") ||
      original.url.includes("/auth/refresh-token");

    if (err.response?.status === 401 && !original._retry && !isAuthRoute) {
        original._retry = true;
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,{withCredentials: true});
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);
            return api(original);
        }
        catch(err){
            console.log(err);
            setAccessToken(null);
        }
    }
    throw err;
  },
);

export default api;
