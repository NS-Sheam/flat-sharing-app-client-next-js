import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        my: { xs: 4, md: 12 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Find Your Dream Home
        </Typography>

        <Typography
          variant="h3"
          component="h1"
          color="primary.main"
          fontWeight={600}
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          No Issue!
        </Typography>
        <Typography
          variant="h6"
          component="p"
          fontWeight={400}
          sx={{
            my: { xs: 2, md: 4 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          We provide you with the best flats and apartments in town. You can easily find your dream home with us.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Link href="/flats">
            <Button>Search Flats</Button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          position: "relative",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box>
          <Image
            src={assets.images.flat3}
            width={240}
            height={350}
            alt="hero-img-1"
            className="w-full h-64 md:h-94  rounded-full md:-mt-10 shadow-xl border-8 border-white"
          />
        </Box>
        <Box>
          <Image
            src={assets.images.flat2}
            width={240}
            height={350}
            alt="hero-img-2"
            className="w-full h-64 md:h-94 rounded-full md:mt-10 shadow-xl border-8 border-white"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
