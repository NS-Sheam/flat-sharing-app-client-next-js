"use client";
import ModifiedForm from "@/components/Forms/ModifiedForm";
import ModifiedInput from "@/components/Forms/ModifiedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import AdbIcon from "@mui/icons-material/Adb";

import React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);

      if (res.data?.accessToken) {
        toast.success(res?.message || "Login Successful");
        router.push("/");
      } else {
        toast.error(res?.message || "Login Failed");
      }
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
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
            >
              <Grid
                container
                spacing={2}
                my={1}
              >
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
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Typography
                mb={1}
                component="p"
                fontWeight="300"
                textAlign="end"
              >
                Forgot Password?
              </Typography>

              <Button
                fullWidth
                sx={{
                  margin: "10px 0",
                }}
                type="submit"
              >
                Login
              </Button>
              <Typography
                component="p"
                fontWeight="300"
              >
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Create an account
                </Link>
              </Typography>
            </ModifiedForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
