import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    // You can return a spinner or loader here
    return <div>Loading...</div>;
  }

  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    // Redirect non-admins to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
