"use client";
import { Box, Button, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ModifiedForm from "@/components/Forms/ModifiedForm";
import ModifiedInput from "@/components/Forms/ModifiedInput";
import ModifiedFileUploader from "@/components/Forms/ModifiedFileUploader";
import { uploadImageToImgBB } from "@/services/actions/imageUploadActions";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.services";

const profileValidationSchema = z.object({
  userName: z.string().min(4, "User Name must be at least 4 characters"),
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  mobileNo: z.string().optional(),
  address: z.string().optional(),
  image: z.instanceof(File).optional(),
});

const ProfilePage = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const { data: myProfileData, isLoading: isMyProfileLoading } = useGetMyProfileQuery(undefined);
  const { role } = getUserInfo();

  const router = useRouter();

  if (isMyProfileLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  const defaultValues = {
    userName: myProfileData?.userName,
    name: myProfileData?.[role]?.name,
    email: myProfileData?.email,
    mobileNo: myProfileData?.[role]?.mobileNo,
    address: myProfileData?.[role]?.address,
    // image: myProfileData?.[role]?.image,
  };

  const handleUpdateProfile: SubmitHandler<FieldValues> = async (values) => {
    try {
      const imageUrl = values.image ? await uploadImageToImgBB(values.image) : null;
      const userData = {
        userName: values.userName,
        name: values.name,
        email: values.email,
        mobileNo: values.mobileNo,
        address: values.address,
        image: imageUrl,
      };

      const res = await updateProfile(userData);

      if (res?.data?.id) {
        toast.success("Profile updated successfully");
        // router.push("/");
      } else {
        toast.error("Failed to update profile");
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
            width: "100%",
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
            Update Profile
          </Typography>
          <ModifiedForm
            onSubmit={handleUpdateProfile}
            resolver={zodResolver(profileValidationSchema)}
            defaultValues={defaultValues}
          >
            <Grid
              container
              spacing={2}
              my={1}
              justifyContent="cebter"
              alignItems="center"
            >
              <Grid
                item
                xs={6}
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
                xs={6}
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
                xs={6}
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
                xs={6}
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
                xs={6}
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
                xs={6}
              >
                <ModifiedFileUploader
                  fullWidth
                  name="image"
                  label="Profile Picture"
                  type="file"
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Button
                  fullWidth
                  sx={{
                    margin: "10px 0",
                  }}
                  type="submit"
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </ModifiedForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
