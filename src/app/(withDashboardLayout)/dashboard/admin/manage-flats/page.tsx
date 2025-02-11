"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useGetAllFlatsQuery, useDeleteFlatMutation } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const FlatManagementPage = () => {
  const router = useRouter();
  const {
    data: flats,
    isLoading,
    isFetching,
  } = useGetAllFlatsQuery({
    page: 1,
    limit: 1000,
  });
  const [deleteFlat] = useDeleteFlatMutation();

  if (isLoading || isFetching) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleEditFlat = (flatId: string) => {
    router.push(`/flats/${flatId}/edit`);
  };

  const handleDeleteFlat = async (flatId: string) => {
    const res = await deleteFlat(flatId);
    console.log(res);

    if (!res?.error) {
      toast.success("Flat deleted successfully");
    } else {
      toast.error((res?.error as any)?.data || "Failed to delete flat");
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
        Flat Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flats?.map((flat: any) => (
              <TableRow key={flat.id}>
                <TableCell>
                  <Image
                    src={flat.images?.[0] || "/placeholder-image.jpg"}
                    alt={flat.location}
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{flat.location}</TableCell>
                <TableCell>${flat.rent}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditFlat(flat.id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteFlat(flat.id)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewDetails(flat.id)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FlatManagementPage;
