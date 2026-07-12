// import React from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
const AdminLogin = () => {
    const { adminLogin } = useContext(AuthContext)!;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("");
        try {
            const data = await adminLogin(email, password);
            if (data.success) {
                navigate("/admin/dashboard");
            } else {
                setError(data.message);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Login failed");
            } else {
                setError("Something went wrong");
            }
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#f5f5f5",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: 500,
                    maxWidth: "90%",
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <LoginIcon sx={{ fontSize: 45, color: "primary.main" }} />
                        <Typography
                            variant="h4"
                            sx={{fontWeight:"bold",textAlign:"center"}}
                        >
                        Welcome Back Admin
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        label="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" sx={{textAlign:"center"}}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                    Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminLogin;

