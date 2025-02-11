"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ModifiedForm from "@/components/Forms/ModifiedForm";
import ModifiedInput from "@/components/Forms/ModifiedInput";
import ModifiedFileUploader from "@/components/Forms/ModifiedFileUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { uploadImageToImgBB } from "@/services/actions/imageUploadActions";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useAddFlatShareRequestMutation } from "@/redux/api/flatShareApi";
import ModifiedCheckBox from "@/components/Forms/ModifiedCheckBox";

const flatShareRequestValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  additionalInfo: z.string().min(10, "Additional information must be at least 10 characters").optional(),
  termsAgreement: z
    .boolean()
    .refine((value) => value === true, { message: "You must agree to the terms and conditions" }),
});

const FlatShareRequest = () => {
  const { id } = useParams();
  const [addFlatShareRequest] = useAddFlatShareRequestMutation();
  const { data: myProfile, isLoading, isFetching } = useGetMyProfileQuery(undefined);

  if (isLoading || isFetching) {
    return (
      <Stack sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Stack>
    );
  }

  const handleFlatShareRequest = async (values: FieldValues) => {
    try {
      const requestData = {
        additionalInfo: values.additionalInfo,
      };

      const res = await addFlatShareRequest({ flatId: id as string, data: requestData });

      if (res?.data?.id) {
        toast.success("Flat share request sent successfully");
      } else {
        toast.error((res?.error as any)?.data || "Failed to send flat share request");
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("An error occurred while sending the request");
    }
  };

  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, textAlign: "center", color: "#fff" }}
      >
        Flat Share Request
      </Typography>
      <Box sx={{ maxWidth: 600, width: "100%", boxShadow: 1, borderRadius: 1, p: 4, textAlign: "center" }}>
        <ModifiedForm
          onSubmit={handleFlatShareRequest}
          resolver={zodResolver(flatShareRequestValidationSchema)}
          defaultValues={{
            name: myProfile?.member?.name || "",
            email: myProfile?.email || "",
          }}
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
                name="additionalInfo"
                label="Additional Information"
                type="text"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid
              item
              md={12}
              width="100%"
              sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
            >
              <Box>
                <ModifiedCheckBox
                  name="termsAgreement"
                  required
                />
              </Box>
              <Box>I agree to the terms and conditions</Box>
            </Grid>
          </Grid>
          <Button
            fullWidth
            sx={{ margin: "10px 0" }}
            type="submit"
          >
            Submit Request
          </Button>
        </ModifiedForm>
      </Box>
    </Container>
  );
};

export default FlatShareRequest;
