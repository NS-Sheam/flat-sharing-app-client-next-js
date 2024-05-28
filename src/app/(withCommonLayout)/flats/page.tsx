"use client";

import { CircularProgress, Typography, Grid, Container } from "@mui/material";
import { isLoggedIn } from "@/services/auth.services";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";
import FlatCard from "@/components/UI/FlatCard";
import { TFlat } from "@/types";

const AllFlatPage = () => {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const searchTerm = searchParams.get("searchTerm") || "";
  const rent = searchParams.get("rent") || "";
  const bedrooms = searchParams.get("bedrooms") || "";

  const params = {
    searchTerm,
    rent,
    bedrooms,
    page: 1,
    limit: 1000,
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

  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", color: "primary.main", fontWeight: "bold" }}
      >
        All Flats
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {fData?.map((flat: TFlat) => (
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
    </Container>
  );
};

export default AllFlatPage;
