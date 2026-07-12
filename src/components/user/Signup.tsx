import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiData from "../../../api/apidata";
const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res=await apiData.post("/user/signup",formData);
            if (res.data.success) {
                navigate("/userlogin");
            } else {
                setError(res.data.message);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Login failed");
            } else {
                setError("Something went wrong");
            }
        }finally{
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f5f5",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: 400,
                    maxWidth: "90%",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{textAlign:"center",marginBottom:3,fontWeight:"bold"}}
                >
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display:"flex",flexDirection:"column",gap:2}}
                >
                    <Typography sx={{color:"red"}}>{error}</Typography>
                    <TextField
                        label="Full Name"
                        name="name"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mt: 1 }}
                        disabled={loading}
                    >
                    Sign Up
                    </Button>
                    <Typography><Link to="/userlogin" style={{textDecoration: "none",color: "inherit",}}>
                        Already Registered? Login Here
                    </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Signup;