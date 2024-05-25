import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

const Tips = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 6 },
        backgroundColor: "#f7f7f7",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, textAlign: "center", color: "primary.main" }}
      >
        Tips for Finding and Sharing Flats
      </Typography>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
              borderRadius: 4,
              backgroundColor: "#fff",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                sx={{ mb: 2, color: "primary.main" }}
              >
                Tip 1: Define Your Preferences
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
              >
                Before you start your search, make a list of your preferences such as location, budget, and amenities.
                This will help narrow down your options.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
              borderRadius: 4,
              backgroundColor: "#fff",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                sx={{ mb: 2, color: "primary.main" }}
              >
                Tip 2: Utilize Online Platforms
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
              >
                Take advantage of online platforms and apps dedicated to finding flat-mates and shared accommodations.
                These platforms often have advanced search filters and allow you to connect with potential flat-mates
                easily.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tips;
