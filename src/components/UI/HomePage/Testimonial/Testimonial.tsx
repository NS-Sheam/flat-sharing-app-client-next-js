import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import QuoteIcon from "@mui/icons-material/FormatQuote";

const Testimonials = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 6 },
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, textAlign: "center", color: "primary.main" }}
      >
        Testimonials
      </Typography>
      <Grid
        container
        spacing={4}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    color: "primary.main",
                  }}
                >
                  <QuoteIcon sx={{ fontSize: "5rem", fontWeight: 600 }} />
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Finding a flat-mate was never this easy. I found a great place with an amazing flat-mate. Highly
                  recommend!
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  sx={{
                    textAlign: "right",
                    fontStyle: "italic",
                    color: "primary.main",
                    fontWeight: 600,
                  }}
                >
                  - Nazmus Sakib
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
