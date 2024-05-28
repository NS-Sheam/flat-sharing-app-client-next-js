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
  IconButton,
} from "@mui/material";
import { Check, Close, Visibility } from "@mui/icons-material";

import { toast } from "sonner";
import { useGetAllFlatShareRequestsQuery, useUpdateFlatShareRequestStatusMutation } from "@/redux/api/flatShareApi";
import { useRouter } from "next/navigation";

const FlatShareRequestPage = () => {
  const router = useRouter();
  const { data: flatShareRequests, isLoading, isFetching } = useGetAllFlatShareRequestsQuery({});

  const [updateRequestStatus] = useUpdateFlatShareRequestStatusMutation();

  if (isLoading || isFetching) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleUpdateStatus = async (requestId: string, status: string) => {
    const res = await updateRequestStatus({ id: requestId, body: { status } });
    if (res?.data) {
      toast.success("Request status updated successfully");
    } else {
      toast.error("Failed to update request status");
    }
  };

  const handleViewDetails = (flatId: string) => {
    router.push(`/flats/${flatId}`);
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
        Flat Request Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Flat Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Additional Info</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flatShareRequests?.map((request: any) => (
              <TableRow key={request.id}>
                <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{request.member.name}</TableCell>
                <TableCell>{request.flat.location}</TableCell>
                <TableCell>
                  <Chip
                    label={request.status}
                    color={
                      request.status === "APPROVED" ? "success" : request.status === "REJECTED" ? "error" : "warning"
                    }
                  />
                </TableCell>
                <TableCell>{request.additionalInfo}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewDetails(request.flat.id)}
                  >
                    <Visibility />
                  </IconButton>
                  {request.status !== "APPROVED" && (
                    <IconButton
                      color="success"
                      onClick={() => handleUpdateStatus(request.id, "APPROVED")}
                    >
                      <Check />
                    </IconButton>
                  )}
                  {request.status !== "REJECTED" && (
                    <IconButton
                      color="error"
                      onClick={() => handleUpdateStatus(request.id, "REJECTED")}
                    >
                      <Close />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FlatShareRequestPage;
