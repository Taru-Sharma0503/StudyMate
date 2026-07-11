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
    if (err.response?.status === 401 && !original._retry) {
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
            window.location.href = "/login";
        }
    }
    throw err;
  },
);

export default api;
