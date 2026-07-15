import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TheatersIcon from "@mui/icons-material/Theaters";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import apiData from "../../../api/apidata";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
interface Box{
    seatType:string
    rows:number
    columns:number
    price:number
}
function LocationMarker({
    latitude,
    longitude,
    setLatitude,
    setLongitude,
}: {
  latitude: number;
  longitude: number;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
}) {
    useMapEvents({
        click(e) {
            setLatitude(e.latlng.lat);
            setLongitude(e.latlng.lng);
        },
    });

    return <Marker position={[latitude, longitude]} />;
}
const CreateTheatre = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState(28.6139);
    const [longitude, setLongitude] = useState(77.209);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [boxNumber, setBoxNumber] = useState<Box[]>([
        {
            seatType: "",
            rows: 0,
            columns: 0,
            price: 0,
        },
    ]);

    const addData = () => {
        if(boxNumber.length<5){
            setBoxNumber((prev) => [
                ...prev,
                {
                    seatType: "",
                    rows: 0,
                    columns: 0,
                    price: 0,
                },
            ]);
        }else{
            toast.error("only 5 rows can be created");
        }
    };

    const handleChange = (
        index: number,
        field: keyof Box,
        value: string | number
    ) => {
        const updated = [...boxNumber];
        updated[index][field] = value as never;
        setBoxNumber(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const filteredBoxes = boxNumber.filter((box) =>
            box.seatType.trim() !== "" &&
            box.rows > 0 &&
            box.columns > 0 &&
            box.price > 0
        );
        const theatreData = {
            name,
            address,
            latitude,
            longitude,
            seatMap:filteredBoxes
        };
        try {
            setLoading(true);
            const response = await apiData.post("/admin/create-theatre", theatreData);
            if (response.data.success) {
                setName("");
                setAddress("");
                setLatitude(28.6139);
                setLongitude(77.209);
                setError("");
                toast.success(response.data.message);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Login failed");
                toast.error(err.response?.data?.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                py: 5,
                bgcolor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: 800,
                    maxWidth: "100%",
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
                            mb: 2,
                        }}
                    >
                        <TheatersIcon
                            sx={{
                                fontSize: 55,
                                color: "primary.main",
                            }}
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                mt: 1,
                            }}
                        >
                        Create Theatre
                        </Typography>
                    </Box>
                    <Typography sx={{color:"red"}}>{error}</Typography>
                    <TextField
                        label="Theatre Name"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        multiline
                        rows={3}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                        }}
                    >
                    Select Theatre Location
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #ddd",
                        }}
                    >
                        <MapContainer
                            center={[latitude, longitude]}
                            zoom={13}
                            style={{
                                height: "400px",
                                width: "100%",
                            }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationMarker
                                latitude={latitude}
                                longitude={longitude}
                                setLatitude={setLatitude}
                                setLongitude={setLongitude}
                            />
                        </MapContainer>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Latitude"
                            value={latitude}
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            label="Longitude"
                            value={longitude}
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                    </Box>

                    {boxNumber.map((ele, index) => (
                        <Card key={index} sx={{ p: 2, mb: 2 }}>
                            <Box sx={{display:"flex",justifyContent:"space-between"}}>

                                <TextField
                                    label="Seat Type"
                                    value={ele.seatType}
                                    onChange={(e) =>
                                        handleChange(index, "seatType", e.target.value)
                                    }
                                />

                                <TextField
                                    label="Rows"
                                    type="number"
                                    value={ele.rows}
                                    onChange={(e) =>
                                        handleChange(index, "rows", Number(e.target.value))
                                    }
                                />

                                <TextField
                                    label="Columns"
                                    type="number"
                                    value={ele.columns}
                                    onChange={(e) =>
                                        handleChange(index, "columns", Number(e.target.value))
                                    }
                                />

                                <TextField
                                    label="Price"
                                    type="number"
                                    value={ele.price}
                                    onChange={(e) =>
                                        handleChange(index, "price", Number(e.target.value))
                                    }
                                />

                                <TextField
                                    label="Total Seat"
                                    value={ele.rows * ele.columns}
                                    slotProps={{
                                        htmlInput: {
                                            readOnly: true,
                                        },
                                    }}
                                />

                                <Button onClick={addData}><AddIcon/></Button>
                            </Box>
                        </Card>
                    ))}
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        sx={{
                            mt: 2,
                        }}
                        disabled={loading}
                    >
                    Create Theatre
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateTheatre;
