"use client";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BedIcon from "@mui/icons-material/Bed";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rent, setRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/flats?searchTerm=${searchTerm}&rent=${rent}&bedrooms=${bedrooms}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        my: { xs: 4, md: 6 },
        px: { xs: 2, md: 0 },
        backgroundColor: "#f5f5f5",
        p: 3,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        label="Location"
        variant="outlined"
        placeholder="Enter location"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: { xs: "100%", md: "auto" }, mb: { xs: 2, md: 0 } }}
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
      <TextField
        label="Price Range"
        variant="outlined"
        placeholder="Enter price range"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoneyIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: { xs: "100%", md: "auto" }, mb: { xs: 2, md: 0 } }}
        onChange={(e: any) => setRent(e.target.value)}
      />
      <TextField
        label="Number of Bedrooms"
        variant="outlined"
        placeholder="Enter number of bedrooms"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BedIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: { xs: "100%", md: "auto" }, mb: { xs: 2, md: 0 } }}
        onChange={(e: any) => setBedrooms(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ width: { xs: "100%", md: "auto" } }}
        onClick={handleSearch}
      >
        Search Flats
      </Button>
    </Box>
  );
};

export default SearchSection;
