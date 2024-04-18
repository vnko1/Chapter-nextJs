import { Dispatch, ReactNode, SetStateAction } from "react";
import { IUser } from "@/types";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetBoolean = Dispatch<SetStateAction<boolean>>;

export type ProfileContextType = {
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  setAddPostModalIsOpen: SetBoolean;
  addPostModalIsOpen: boolean;
  headerAddPostBtnIsDisabled: boolean;
  token: string | null;
  isAuth: boolean;
  user: IUser | null;
};
