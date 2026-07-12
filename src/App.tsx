// import { useState } from 'react'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PubLayout from "./components/PubLayout";
import AdminLogin from "./components/admin/AdminLogin";
import UserLogin from "./components/user/UserLogin";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import TheatreList from "./components/admin/TheatreList";
import SearchMovie from "./components/admin/SearchMovie";
import MovieList from "./components/admin/MovieList";
import Createshow from "./components/admin/Createshow";
import CreateTheatre from "./components/admin/CreateTheatre";
import MainLayout from "./components/user/MainLayout";
import Signup from "./components/user/Signup";
import UserDashboard from "./components/user/UserDashboard";
import AllShow from "./components/admin/AllShow";
import MovieUserList from "./components/user/MovieUserList";
import MovieDetaiols from "./components/user/MovieDetaiols";
import ShowsList from "./components/user/ShowsList";
import SeatList from "./components/user/SeatList";
import NotFound from "./components/NotFound";
function App() {
    return (
        <>
            <Routes> 
                <Route element={<PubLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    <Route path="/userlogin" element={<UserLogin />} />
                    <Route path="/usersignup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
 
                <Route
                    element={
                        <ProtectedRoute allowedRole="user">
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/user/dashboard/" element={<UserDashboard/>} />
                    <Route path="/user/movie-list" element={<MovieUserList />} />
                    <Route path="/movies/:movieId" element={<MovieDetaiols/>} />
                    <Route path="/movies/:movieId/theatres/:theatreId/shows" element={<ShowsList />} />
                    <Route path="/shows/:showId/seats" element={<SeatList />} />
                </Route>
 
                <Route element={
                    <ProtectedRoute allowedRole="admin">
                        <AdminLayout />
                    </ProtectedRoute>
                }
                >
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/create-theatre" element={<CreateTheatre />} />
                    <Route path="/admin/theatres" element={<TheatreList />} />
                    <Route path="/admin/search-movie" element={<SearchMovie />} />
                    <Route path="/admin/movies" element={<MovieList />} />
                    <Route path="/admin/create-show" element={<Createshow/>} />
                    <Route path="/admin/all-show" element={<AllShow/>} />

                </Route>
            </Routes>

            <ToastContainer />
        </>
    );
}

export default App;
