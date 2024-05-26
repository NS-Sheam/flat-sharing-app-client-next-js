import { USER_ROLE } from "@/constants/role";
import { TDrawerItem, TUserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import TryIcon from "@mui/icons-material/Try";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
export const drawerItems = (role: TUserRole): TDrawerItem[] => {
  const roleMenus: TDrawerItem[] = [];
  const defaultMenus = [
    {
      title: "Profile",
      path: `/profile`,
      icon: PersonIcon,
    },
    {
      title: "Change Password",
      path: "change-password",
      icon: KeyIcon,
    },
  ];
  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: GroupIcon,
        },
        {
          title: "Manage Flats",
          path: `${role}/manage-flats`,
          icon: GroupIcon,
        }
      );
      break;

    case USER_ROLE.MEMBER:
      roleMenus.push(
        {
          title: "My Flats",
          path: `${role}/my-flats`,
          icon: GroupIcon,
        },
        {
          title: "Add Flat",
          path: `${role}/add-flat`,
          icon: GroupIcon,
        },
        {
          title: "My Flat Requests",
          path: `${role}/my-requests`,
          icon: GroupIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
