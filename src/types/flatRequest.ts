import { TFlat } from "./flat";

export type TFlatRequest = {
  id: string;
  status: string;
  additionalInfo: string;
  memberId: string;
  flatId: string;
  flat?: TFlat;
  createdAt: string;
  updatedAt: string;
};
