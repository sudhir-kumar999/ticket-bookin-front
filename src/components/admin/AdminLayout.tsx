import {  useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GridViewIcon from "@mui/icons-material/GridView";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import  { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

const drawerWidth = 280;

function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const {logout,user}=useContext(AuthContext)!;
    async function handleLogout(){
        await logout();
    }

    const navItems = [
        {
            title: "Dashboard",
            icon: <DashboardIcon />,
            href: "/admin/dashboard",
        },
        {
            title: "Add Theatre",
            icon: <PeopleIcon />,
            href: "/admin/create-theatre",
        },
        {
            title: "Theatre List",
            icon: <AssessmentIcon />,
            href: "/admin/theatres",
        },
        {
            title: "Search Movie",
            icon: <QuizIcon />,
            href: "/admin/search-movie",
        },
        {
            title: "Movies List",
            icon: <GridViewIcon />,
            href: "/admin/movies",
        },
        {
            title: "Create Show",
            icon: <AddIcon/>,
            href: "/admin/create-show",
        },
        {
            title: "All Show",
            icon: <UploadFileIcon />,
            href: "/admin/all-show",
        },
        {
            title: "All Bookings",
            icon: <BookOnlineIcon />,
            href: "/booking/all",
        },
    ];
    const drawer = (
        <Box>
            <Toolbar
                sx={{
                    justifyContent: "center",
                    py: 2,
                }}
            >
                <Avatar
                    sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                    }}
                />
                <Box>
                    <Typography sx={{ fontWeight: 600 }}>Admin Panel</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ticket Booking
                    </Typography>
                </Box>
            </Toolbar>
            <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
                {user?.email}
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <Link
                            to={item.href}
                            style={{
                                width: "100%",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`,
                    },
                    ml: {
                        sm: `${drawerWidth}px`,
                    },
                    bgcolor: "#1976d2",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: {
                                sm: "none",
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                        }}
                    >
            Hello Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: {
                        sm: drawerWidth,
                    },
                    flexShrink: {
                        sm: 0,
                    },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {
                            xs: "block",
                            sm: "none",
                        },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block",
                        },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#f5f5f5",
                    minHeight: "100vh",
                    p: 3,
                }}
            >
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}

export default AdminLayout;