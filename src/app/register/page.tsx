"use client";
import ModifiedForm from "@/components/Forms/ModifiedForm";
import ModifiedInput from "@/components/Forms/ModifiedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import AdbIcon from "@mui/icons-material/Adb";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const registerValidationSchema = z
  .object({
    userName: z
      .string({
        required_error: "User Name is required",
      })
      .min(4, "User Name must be at least 4 characters"),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(4, "Name must be at least 4 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const handleRegister = async (values: FieldValues) => {
    try {
      console.log(values);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "secondary.main",
                  px: 1,
                  borderRadius: 1,
                  color: "primary.main",
                  display: { xs: "none", md: "flex", justifyContent: "center", alignItems: "center" },
                }}
              >
                <AdbIcon sx={{ display: { xs: "none", md: "flex", color: "primary.main" }, mr: 1 }} />
                FLAT
              </Box>
              &nbsp; <Box sx={{ color: "#000000" }}>FINDER</Box>
            </Typography>
          </Stack>

          <Box>
            <ModifiedForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerValidationSchema)}
            >
              <Grid
                container
                spacing={2}
                my={1}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  md={12}
                  width="100%"
                >
                  <ModifiedInput
                    name="userName"
                    label="User Name"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  width="100%"
                >
                  <ModifiedInput
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  width="100%"
                >
                  <ModifiedInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  width="100%"
                >
                  <ModifiedInput
                    name="mobileNo"
                    label="Mobile No"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  width="100%"
                >
                  <ModifiedInput
                    name="address"
                    label="Address"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  width="100%"
                >
                  <ModifiedInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  width="100%"
                >
                  <ModifiedInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                sx={{
                  margin: "10px 0",
                }}
                type="submit"
              >
                Register
              </Button>
              <Typography
                component="p"
                fontWeight="300"
              >
                Don&apos;t have an account?{" "}
                <Link
                  href="/login"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Already have an account
                </Link>
              </Typography>
            </ModifiedForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
