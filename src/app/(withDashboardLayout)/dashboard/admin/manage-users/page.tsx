"use client";

import React from "react";
import { Box, Container, Typography, CircularProgress, Button, Chip } from "@mui/material";

import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "@/redux/api/userApi";
// import { updateUserProfile } from "@/services/actions/updateUserProfile";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserManagement = () => {
  const router = useRouter();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery(undefined);

  if (isLoading || isFetching) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleActivateDeactivate = async (userId: string, isActive: boolean) => {
    const res = await updateUserStatus({ id: userId, body: { isActive: !isActive } });
    if (res?.data?.id) {
      toast.success("User updated successfully");
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", color: "primary.main", fontWeight: "bold" }}
      >
        User Management
      </Typography>
      {users?.map((user: any) => (
        <Box
          key={user.id}
          sx={{ mb: 2, p: 2, border: "1px solid", borderRadius: 1 }}
        >
          <Typography variant="h6">{user.userName}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          <Chip
            label={user.role}
            color="primary"
          />
          <Chip
            label={user.isActive ? "Active" : "Inactive"}
            color={user.isActive ? "success" : "error"}
          />
          <Button
            variant="contained"
            color={user.isActive ? "error" : "success"}
            sx={{ ml: 2 }}
            onClick={() => handleActivateDeactivate(user.id, user.isActive)}
          >
            {user.isActive ? "Deactivate" : "Activate"}
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default UserManagement;
