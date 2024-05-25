import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type IMeta = {
  page: Number;
  limit: Number;
  total: Number;
};

export type TUserRole = keyof typeof USER_ROLE;

export type TErrorDetails = {
  issues: {
    field: string;
    message: string;
  }[];
};

export type TSuccessResponse = {
  data: any;
  meta?: IMeta;
};

export type TErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorDetails: TErrorDetails;
};

export type TDrawerItem = {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: TDrawerItem[];
};
