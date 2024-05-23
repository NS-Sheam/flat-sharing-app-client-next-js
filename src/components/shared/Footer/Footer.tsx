import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import AdbIcon from "@mui/icons-material/Adb";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Container>
        <Stack
          direction="row"
          gap={4}
          justifyContent="center"
        >
          <Typography
            component={Link}
            href="/"
            color="#fff"
          >
            About
          </Typography>
          <Typography
            component={Link}
            href="/"
            color="#fff"
          >
            Blog
          </Typography>
          <Typography
            component={Link}
            href="/"
            color="#fff"
          >
            Contact Us
          </Typography>
        </Stack>
        <Box sx={{ borderBottom: "1px dashed lightgray" }}></Box>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography
            component="p"
            color="#fff"
          >
            @copy; 2024 Flat Finder All Rights Reserved
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "secondary.main",
                  px: 1,
                  borderRadius: 1,
                  color: "primary.main",
                  display: { xs: "none", md: "flex", justifyContent: "center", alignItems: "center" },
                }}
              >
                <AdbIcon sx={{ display: { xs: "none", md: "flex", color: "primary.main" }, mr: 1 }} />
                FLAT
              </Box>
              &nbsp;FINDER
            </Typography>
          </Box>
          <Typography
            component="p"
            color="#fff"
          >
            Privacy Policy | Terms of Use
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
