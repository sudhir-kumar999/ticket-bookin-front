import Box from "@mui/material/Box";
import PubNav from "./PubNav";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const PubLayout = () => {
    const { user, loading } = useContext(AuthContext)!;
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress aria-label="Loading…" />
            </Box>
        );
    }
    if (user) {
        const redirectPath = user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
        return <Navigate to={redirectPath} replace />;
    }
    return (
        <Box
            sx={{
                minHeight: "100vh",
            }}
        >
            <PubNav/>
            <Outlet/>
        </Box>
    );
};

export default PubLayout;