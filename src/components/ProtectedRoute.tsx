import { Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
interface ProtectedRouteProps {
    children: ReactNode;
    allowedRole?: "user" | "admin"; 
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
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
    if (!user) {
        const loginPath = allowedRole === "admin" ? "/" : "/";
        return <Navigate to={loginPath} replace />;
    }
    if (allowedRole && user.role !== allowedRole) {
        const redirectPath = user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
        return <Navigate to={redirectPath} replace />;
    }
    return (
        <>
            {children}
        </>
    );
}
