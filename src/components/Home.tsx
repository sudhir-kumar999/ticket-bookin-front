import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Typewriter from "typewriter-effect";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <Box >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 5,
                }}
            >
                <Typography variant="h3" sx={{ mr: 5 }}>
                  Movie Ticket
                </Typography>
                <Typewriter
                    options={{
                        strings: ["Hello", "World"],
                        autoStart: true,
                        loop: true,
                    }}
                />
                <Typography variant="h3" sx={{ ml: 5 }}>
                  Platform
                </Typography>
            </Box>
            <Box sx={{display:"flex" , justifyContent:"center", alignItems:"center",height:"80vh" }}>
                <Box sx={{display:"flex",gap:10}}>
                    <Card sx={{ maxWidth: 600,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:5}}>
                        <CardMedia
                        />
                        <AdminPanelSettingsIcon sx={{fontSize:"6rem"}}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
                              Admin Login
                            </Typography>
                            <Box sx={{display:"flex",justifyContent:"center"}}>
                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                                    {["Create Theatre", "Create Show", "Manage Movies"].map((value) => (
                                        <ListItem
                                            key={value}
                                            disableGutters
                                            secondaryAction={
                                                <IconButton aria-label="comment">
                                                    <DoneIcon/>
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText primary={`${value}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="large" variant="contained">
                                <Link
                                    to="/adminlogin"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                Go to Login Page
                                </Link>
                            </Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 600,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <CardMedia
                        />
                        <AccountCircleIcon sx={{fontSize:"6rem"}}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
                              User Login
                            </Typography>
                            <Box sx={{display:"flex",justifyContent:"center"}}>
                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                                    {["Register and Login", "Book Ticket", "Secure Payment"].map((value) => (
                                        <ListItem
                                            key={value}
                                            disableGutters
                                            secondaryAction={
                                                <IconButton aria-label="comment">
                                                    <DoneIcon/>
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText primary={`${value}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="large" variant="contained">
                                <Link
                                    to="/usersignup"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                Go to Signup Page
                                </Link>
                            </Button>
                            {/* <Button size="large" variant='contained' ><Link to="/usersignup" >Go to Login Page</Link></Button> */}
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
