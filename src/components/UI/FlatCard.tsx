import Image from "next/image";
import { Card, CardContent, Typography } from "@mui/material";
import asset from "@/assets";
import { TFlat } from "@/types";
import Link from "next/link";
const FlatCard = ({ flat }: { flat: TFlat }) => {
  return (
    <Card
      component={Link}
      href={`/flats/${flat.id}`}
      sx={{
        position: "relative",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          "& > div": {
            bottom: 0,
          },
        },
      }}
    >
      <Image
        src={flat.images.length > 0 ? flat.images[0] : asset.images.flat2}
        width={345}
        height={230}
        alt="flat-image"
        style={{ objectFit: "cover", width: "100%", height: "230px" }}
      />

      <CardContent
        sx={{
          position: "absolute",
          bottom: "-100%",
          left: 0,
          right: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          transition: "0.5s linear",
          padding: "16px",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          color="primary.main"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          {flat.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          Location: <span style={{ color: "black" }}>{flat.location}</span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          Price: <span style={{ color: "black" }}>${flat.rent}</span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
          }}
        >
          Bedrooms: <span style={{ color: "black" }}>{flat.bedrooms}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlatCard;
