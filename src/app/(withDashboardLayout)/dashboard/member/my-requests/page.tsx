"use client";

import {
  Box,
  CircularProgress,
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { TFlatRequest } from "@/types";

const MyFlatRequestsPage = () => {
  const { data: myProfile, isLoading, isFetching } = useGetMyProfileQuery(undefined);

  if (isLoading || isFetching) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const myRequests = myProfile?.member?.request;

  if (!myRequests || myRequests.length === 0) {
    return (
      <Container>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginTop: 4 }}
        >
          You have no requests.
        </Typography>
      </Container>
    );
  }

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
        My Flat Requests
      </Typography>
      <Box>
        {myRequests.map((request: TFlatRequest) => (
          <Card
            key={request.id}
            sx={{ boxShadow: 3, marginBottom: 3, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6">Location: {request?.flat?.location}</Typography>
              <Chip
                label={request.status}
                color={request.status === "APPROVED" ? "success" : request.status === "REJECTED" ? "error" : "warning"}
                sx={{ mt: 1 }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                Additional Info: {request.additionalInfo}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => alert(`Flat details for ${request?.flat?.location}`)}
              >
                View Flat Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default MyFlatRequestsPage;
