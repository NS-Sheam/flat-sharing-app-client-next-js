"use client";

import { Box, CircularProgress, Typography, Grid, Container } from "@mui/material";
import { isLoggedIn } from "@/services/auth.services";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";
import FlatCard from "@/components/UI/FlatCard";
const AllFlatPage = () => {
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm") || "";
  const rent = searchParams.get("rent") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const params = {
    searchTerm,
    rent,
    bedrooms,
  };

  const { data: fData, isLoading } = useGetAllFlatsQuery(params);
  const router = useRouter();

  if (!isLoggedIn()) {
    return router.push("/login");
  }

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  const handleViewMore = () => {
    router.push("/flats");
  };

  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{ mb: 4, textAlign: "center", color: "primary.main" }}
      >
        All Flat
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {fData?.flats.map((flat) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={flat.id}
          >
            <FlatCard flat={flat} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllFlatPage;
