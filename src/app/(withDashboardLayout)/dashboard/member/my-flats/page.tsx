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
        my: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", color: "primary.main", fontWeight: "bold" }}
      >
        All Flat
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {fData?.length ? (
          fData?.map((flat: TFlat) => (
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
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "primary.main" }}
          >
            No flats found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MyFlats;
