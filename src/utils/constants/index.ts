import { IUser } from "@/types";
import defaultAvatar from "@/assets/vectors/default-user-avatar.svg";

export const defaultSessionUserState: Pick<
  IUser,
  "id" | "avatarUrl" | "email" | "nickName"
> = {
  id: 0,
  nickName: "",
  email: "",
  avatarUrl: defaultAvatar,
};

export const defaultUserState: IUser = {
  ...defaultSessionUserState,
  firstName: "",
  lastName: "",
  location: null,
  userStatus: null,
  myFollowersCount: 0,
  myFollowingCount: 0,
  provider: "",
  socialId: null,
  createdAt: "",
  updatedAt: "",
  role: {
    id: 0,
    name: "",
  },
  status: {
    id: 0,
    name: "",
  },
  userBooks: [],
};
