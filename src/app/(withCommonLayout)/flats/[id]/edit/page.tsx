"use client";

import { useRouter, useParams } from "next/navigation";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ModifiedForm from "@/components/Forms/ModifiedForm";
import ModifiedInput from "@/components/Forms/ModifiedInput";
import ModifiedSelectField from "@/components/Forms/ModifiedSelectField";
import ModifiedMultipleFileUploader from "@/components/Forms/ModifiedMultipleFileUploader";
import { uploadImageToImgBB } from "@/services/actions/imageUploadActions";
import { useGetFlatQuery, useUpdateFlatMutation } from "@/redux/api/flatApi";

// const editFlatValidationSchema = z.object({
//   location: z.string().min(1, "Location is required"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   rent: z.string().min(1, "Rent is required"),
//   bedrooms: z.string().min(1, "Number of bedrooms is required"),
//   amenities: z.array(z.string()).min(1, "At least one amenity is required"),
//   images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
// });

const EditFlatPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: flat, isLoading } = useGetFlatQuery(id);
  const [updateFlat] = useUpdateFlatMutation();

  const handleEditFlat: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Updating flat...");
    try {
      const imageUrls = await Promise.all(values.images.map((file: File) => uploadImageToImgBB(file)));

      const flatData = {
        id,
        body: {
          location: values.location,
          description: values.description,
          rent: Number(values.rent),
          bedrooms: Number(values.bedrooms),
          amenities: values.amenities,
          images: imageUrls,
        },
      };

      const res = await updateFlat(flatData);

      if (res?.data?.id) {
        toast.success("Flat updated successfully", { id: toastId });
        router.push("/flats");
      } else {
        toast.error("Failed to update flat", { id: toastId });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Stack
        sx={{
          my: 4,
        }}
      >
        <Box
          sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 4, textAlign: "center", color: "#333", fontWeight: "bold" }}
          >
            Edit Flat
          </Typography>
          <ModifiedForm
            onSubmit={handleEditFlat}
            defaultValues={{
              location: flat?.location,
              description: flat?.description,
              rent: flat?.rent,
              bedrooms: flat?.bedrooms,
              amenities: flat?.amenities,
              images: [],
            }}
          >
            <Grid
              container
              spacing={2}
              my={1}
              justifyContent="start"
              alignItems="center"
            >
              <Grid
                item
                xs={6}
              >
                <ModifiedInput
                  name="location"
                  label="Location"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <ModifiedInput
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <ModifiedInput
                  name="rent"
                  label="Rent"
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <ModifiedInput
                  name="bedrooms"
                  label="Number of Bedrooms"
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <ModifiedSelectField
                  name="amenities"
                  label="Amenities"
                  items={["Furnished", "Parking", "Security", "Balcony", "Garden", "Swimming Pool"]}
                  fullWidth
                  multiple
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <ModifiedMultipleFileUploader
                  name="images"
                  label="Images"
                />
                <Button
                  sx={{
                    margin: "10px 0",
                  }}
                  type="submit"
                >
                  Update Flat
                </Button>
              </Grid>
            </Grid>
          </ModifiedForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default EditFlatPage;
