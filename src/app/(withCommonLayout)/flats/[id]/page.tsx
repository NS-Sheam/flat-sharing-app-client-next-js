"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Card, CardContent, Button, CircularProgress } from "@mui/material";
import { useGetFlatQuery } from "@/redux/api/flatApi";
import { useParams } from "next/navigation";
import Image from "next/image";
import assets from "@/assets";
import { isLoggedIn } from "@/services/auth.services";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const SingleFlatPage = () => {
  const { data: myProfileData } = useGetMyProfileQuery(undefined);
  const router = useRouter();
  const { id } = useParams();
  const { data: flatData, isLoading } = useGetFlatQuery(id);

  if (!isLoggedIn()) {
    return router.push("/login");
  }

  const handleRequestToShare = () => {
    router.push(`/flats/${id}/flat-share-request`);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 6 }, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={8}
        >
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <Box sx={{ p: 2 }}>
              <Grid
                container
                spacing={2}
              >
                {flatData?.images?.map((image: string, index: number) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={index}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={image}
                        alt={`Flat image ${index + 1}`}
                        width={400}
                        height={300}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
              >
                {flatData.description}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                <strong>Location:</strong> {flatData.location}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                <strong>Price:</strong> ${flatData.rent}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                <strong>Bedrooms:</strong> {flatData.bedrooms}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                <strong>Amenities:</strong> {flatData.amenities.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "sticky",
              top: 0,
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            {flatData?.memberId === myProfileData?.member?.id && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push(`/flats/${id}/edit`)}
                sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
              >
                Edit Flat
              </Button>
            )}
            {flatData?.memberId !== myProfileData?.member?.id && myProfileData?.role !== "ADMIN" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRequestToShare}
                sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
              >
                Request to Share this Flat
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.back()}
              sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleFlatPage;
