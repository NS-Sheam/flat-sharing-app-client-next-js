"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { USER_ROLE } from "@/constants/role";
import { useRouter } from "next/navigation";
import { AccountCircle } from "@mui/icons-material";

function Navbar() {
  const { data: myProfile, isLoading: isMyProfileLoading } = useGetMyProfileQuery(undefined);

  const router = useRouter();
  const settings = [
    {
      path: "/about-us",
      name: "About Us",
    },
  ];
  if (!myProfile) {
    settings.push({
      path: "/login",
      name: "Login",
    });
  }
  if (myProfile) {
    settings.unshift(
      {
        name: "Dashboard",
        path: `/dashboard/${
          myProfile?.role.toLowerCase() === USER_ROLE.MEMBER
            ? "member/my-flats"
            : myProfile?.role.toLowerCase() === USER_ROLE.ADMIN
            ? "admin/manage-users"
            : ""
        }`,
      },
      {
        name: "Profile",
        path: `/dashboard/profile`,
      }
    );
  }
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
    router.refresh();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.secondary",
        color: "white",
        boxShadow: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
              ].map((page) => (
                <Link
                  href={page.path}
                  key={page.name}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Flat Finder
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                {myProfile?.profilePicture ? (
                  <Avatar
                    alt={myProfile?.id}
                    src={myProfile?.[myProfile?.role.toLowerCase()].image}
                  />
                ) : (
                  <AccountCircle sx={{ color: "white", height: 40, width: 40 }} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link
                  href={setting.path}
                  key={setting.name}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
              {myProfile?.id && (
                <MenuItem>
                  <Box
                    onClick={handleLogout}
                    textAlign="center"
                  >
                    <Typography>Logout</Typography>
                  </Box>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
