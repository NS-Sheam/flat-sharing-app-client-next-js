"use client";

import ModifiedForm from "@/components/Forms/ModifiedForm";
import ModifiedInput from "@/components/Forms/ModifiedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { z } from "zod";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import AdbIcon from "@mui/icons-material/Adb";
import { FieldValues } from "react-hook-form";
import { changePassword } from "@/services/actions/changePassword";
import logoutUser from "@/services/actions/userLogout";
import { authKey } from "@/constants/authkey";

const changePasswordValidationSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ChangePasswordPage = () => {
  const router = useRouter();

  const handleChangePassword = async (values: FieldValues) => {
    try {
      const res = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      if (res?.success) {
        toast.success("Password changed successfully");
        logoutUser(router, { redirect: "/login" });

        router.push("/login");
      } else {
        toast.error(res?.message || "Password change failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while changing the password");
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
              onSubmit={handleChangePassword}
              resolver={zodResolver(changePasswordValidationSchema)}
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
                    name="oldPassword"
                    label="Old Password"
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
                    name="newPassword"
                    label="New Password"
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
                    label="Confirm New Password"
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
                Change Password
              </Button>
            </ModifiedForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ChangePasswordPage;
