import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import apiData from "../../../api/apidata";
import axios from "axios";
import Button from "@mui/material/Button";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
interface Shows {
  id: string;
  name:string
  prem_Price: number;
  reg_Price: number;
showDate:string
showName:string
showStartTime:string
showEndTime:string
total_seat:number
isCancel: boolean;
}

const AllShow = () => {
    const [shows, setShows] = useState<Shows[]>([]);
    const [showId,setShowId]=useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [open, setOpen] = React.useState(false);
    const [showDate, setShowDate] = useState("");
    const [showStartTime, setShowStartTime] = useState("");
    const [showEndTime, setShowEndTime] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try {
            const res = await apiData.patch("/admin/change-show-time", {
                showId,
                showDate,
                showStartTime,
                showEndTime,
            });
            if (res.data.success) {
                handleClose();
                fetchTheatres();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to fetch theatres");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
        handleClose();
    };
    const handleCancelShow = async (showId: string) => {
        try {
            const res = await apiData.patch("/admin/cancel-show", {
                showId,
            });

            if (res.data.success) {
                fetchTheatres();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Failed to cancel show");
            } else {
                setError("Something went wrong");
            }
        }
    };
    const fetchTheatres = async () => {
        try {
            const res = await apiData.get("/admin/show-list");
            if (res.data.success) {
                setShows(res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to fetch theatres");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTheatres();
    }, []);
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontWeight: "bold",
                }}
            >
                All Shows List
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {shows.length === 0 ? (
                <Typography>No Shows Found.</Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {shows.map((show) => (
                        <Paper
                            key={show.id}
                            elevation={3}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-between"
                            }}
                        >
                            <Box>
                                <Typography variant="h6" sx={{fontWeight:"bold"}}>
                                    {show.showName}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Regular Price:</strong> {show.reg_Price}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Premium Price:</strong> {show.prem_Price}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Show Date:</strong> {show.showDate}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Show Start Time:</strong> {show.showStartTime}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Show End Time:</strong> {show.showEndTime}
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Total Seat:</strong> {show.total_seat}
                                </Typography>
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
                                <Button onClick={() => {
                                    handleClickOpen();
                                    setShowId(show.id);
                                }}
                                variant="contained"
                                disabled={show.isCancel}
                                >
                                    {show.isCancel ? "Show Cancelled" : "Change Show Time"}
                                </Button>
                                {show.isCancel ? (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        disabled
                                    >
        Cancelled
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleCancelShow(show.id)}
                                    >
        Cancel Show
                                    </Button>
                                )}
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Change show Time</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <Box
                            component="form"
                            onSubmit={(e)=>handleSubmit(e)}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                        >
                            <TextField
                                type="date"
                                label="Show Date"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                value={showDate}
                                onChange={(e) => setShowDate(e.target.value)}
                                fullWidth
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    type="time"
                                    label="Start Time"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    value={showStartTime}
                                    onChange={(e) => setShowStartTime(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    type="time"
                                    label="End Time"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    value={showEndTime}
                                    onChange={(e) => setShowEndTime(e.target.value)}
                                    fullWidth
                                />
                            </Box>
                        
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{marginTop:2}}
                            >
                            Change Show Time
                            </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Box>
    );
};

export default AllShow;