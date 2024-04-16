import { IUser } from "@/types";
import defaultAvatar from "@/assets/vectors/default-user-avatar.svg";

export const defaultUserState: IUser = {
  id: 0,
  firstName: "",
  lastName: "",
  nickName: "",
  avatarUrl: defaultAvatar,
  userStatus: null,
  email: "",
  myFollowersCount: 0,
  myFollowingCount: 0,
  provider: "",
  socialId: null,
  createdAt: "",
  updatedAt: "",
  location: null,
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
