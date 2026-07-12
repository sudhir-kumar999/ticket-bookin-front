import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const UserLogin = () => {
    const { userLogin } = useContext(AuthContext)!;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading,setLoading]=useState(false);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await userLogin(email, password);
            if (data.success) {
                navigate("/user/dashboard");
            } else {
                setError(data.message);
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
          Log in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display:"flex",flexDirection:"column",gap:2}}
                >
                    <Typography sx={{color:"red"}}>{error}</Typography>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
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
                </Box>
                <Typography sx={{marginTop:2}}><Link to="/usersignup"style={{textDecoration: "none",color: "inherit",}}>
                        Not Registered? Signup Here
                </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default UserLogin;