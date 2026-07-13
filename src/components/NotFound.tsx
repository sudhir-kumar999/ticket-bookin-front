import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const NotFound = () => {
    const { user, loading } = useContext(AuthContext)!;
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }
    if (user?.role === "user") {
        return <Navigate to="/user/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
};

export default NotFound;
