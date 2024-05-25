import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { TUserRole } from "@/types";
import SidebarItem from "./SidebarItem";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);

  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
          cursor: "pointer",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
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
          &nbsp;<Box color={"#000"}>FINDER</Box>
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as TUserRole).map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
          />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
