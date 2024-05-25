import { Box, Button, TextField, Typography, InputAdornment } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BedIcon from "@mui/icons-material/Bed";

const SearchSection = () => {
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
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ width: { xs: "100%", md: "auto" }, py: 1.5 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchSection;
