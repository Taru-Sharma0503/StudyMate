import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
