import { USER_ROLE } from "@/constants/role";

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
