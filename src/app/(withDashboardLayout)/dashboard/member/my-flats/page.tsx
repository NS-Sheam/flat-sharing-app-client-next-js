"use client";

import { CircularProgress, Typography, Grid, Container } from "@mui/material";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import FlatCard from "@/components/UI/FlatCard";

import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { TFlat } from "@/types";
const MyFlats = () => {
  const { data: myProfile, isLoading, isFetching } = useGetMyProfileQuery(undefined);
  const fData = myProfile?.member?.flat;

  const router = useRouter();

  if (!isLoggedIn()) {
    return router.push("/login");
  }

  if (isLoading || isFetching) {
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

export default MyFlats;
