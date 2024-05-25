"use client";
import React from "react";
import { Box, Card, CardContent, Typography, Grid, CircularProgress, Button } from "@mui/material";
import Image from "next/image";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";
import asset from "@/assets";
import Link from "next/link";

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
          >
            <Card
              sx={{
                maxWidth: 345,
                position: "relative",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  "& > div": {
                    bottom: 0,
                  },
                },
              }}
            >
              <Image
                src={asset.images.flat1}
                width={345}
                height={230}
                alt="flat-image"
                style={{ objectFit: "cover", width: "100%", height: "230px" }}
              />

              <CardContent
                sx={{
                  position: "absolute",
                  bottom: "-100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  transition: "0.5s linear",
                  padding: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  color="primary.main"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {flat.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  Location: <span style={{ color: "black" }}>{flat.location}</span>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  Price: <span style={{ color: "black" }}>${flat.rent}</span>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Bedrooms: <span style={{ color: "black" }}>{flat.bedrooms}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        component={Link}
        href="/all-flats"
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
