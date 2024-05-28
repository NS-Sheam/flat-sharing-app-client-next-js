"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "@/redux/api/userApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { toast } from "sonner";

const UserManagementPage = () => {
  const { data: myProfile } = useGetMyProfileQuery(undefined);
  const currentUserId = myProfile?.id;

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({
    page: 1,
    limit: 1000,
  });

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
    <Container
      sx={{
        my: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", color: "primary.main", fontWeight: "bold" }}
      >
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user?.[user.role.toLowerCase()]?.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive ? "Active" : "Inactive"}
                    color={user.isActive ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  {
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        width: 100,
                        height: 30,
                        fontSize: 12,
                      }}
                      disabled={currentUserId === user.id}
                      color={user.isActive ? "error" : "success"}
                      onClick={() => handleActivateDeactivate(user.id, user.isActive)}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserManagementPage;
