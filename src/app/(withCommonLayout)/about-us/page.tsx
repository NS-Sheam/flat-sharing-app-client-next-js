"use client";
import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Link, CircularProgress } from "@mui/material";
import { Email, Phone, Facebook, Twitter, Instagram } from "@mui/icons-material";
import { useGetAllUsersQuery } from "@/redux/api/userApi";

const AboutUsPage = () => {
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery({ role: "ADMIN" });

  if (isLoading || isFetching) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 6 }, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container>
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", color: "primary.main", fontWeight: "bold" }}
        >
          About Us
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
          >
            Mission Statement
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            Our mission is to provide a platform where users can find and share information about flats for rent. We aim
            to make the process of finding a flat easier, more efficient, and more enjoyable for everyone.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
          >
            Admin Information
          </Typography>
          <Grid
            container
            spacing={4}
          >
            {users?.map((user: any, index: number) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
              >
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar
                      alt={user?.admin?.name}
                      src={user?.admin?.image}
                      sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#555" }}
                    >
                      {user?.admin?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {user?.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {user?.admin?.address}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            mb: 4,
            "& a": {
              textDecoration: "none",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
          >
            Contact Information
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              gap: 1,
            }}
          >
            <Email />
            <Link
              href="mailto:123sheamfeni@gmail.com"
              sx={{ color: "primary.main" }}
            >
              flat-finder@gmail.com
            </Link>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}
          >
            <Phone /> <Box sx={{ color: "primary.main" }}>123-456-7890</Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Facebook />
            <Link
              href="https://facebook.com"
              sx={{ color: "primary.main" }}
            >
              Facebook
            </Link>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}
          >
            <Twitter />
            <Link
              href="https://twitter.com"
              sx={{ color: "primary.main" }}
            >
              Twitter
            </Link>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}
          >
            <Instagram />
            <Link
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "primary.main" }}
            >
              Instagram
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUsPage;
