"use client";
import React from "react";
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";

import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";

import Link from "next/link";
import FlatCard from "../../FlatCard";

const FlatList = () => {
  const { data, error, isLoading } = useGetAllFlatsQuery({});
  const router = useRouter();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
      >
        Failed to load flats.
      </Typography>
    );
  }

  const flatsToShow = data?.flats.slice(0, 3);

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, textAlign: "center", color: "primary.main" }}
      >
        Available Flats
      </Typography>
      <Grid
        container
        spacing={4}
      >
        {flatsToShow?.map((flat) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={flat.id}
            sx={{
              overflow: "hidden",
            }}
          >
            <FlatCard flat={flat} />
          </Grid>
        ))}
      </Grid>
      <Box
        component={Link}
        href="/flats"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
        >
          View More Flats
        </Button>
      </Box>
    </Box>
  );
};

export default FlatList;
