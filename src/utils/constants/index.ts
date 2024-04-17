import { IUser } from "@/types";
import defaultAvatar from "@/assets/vectors/default-user-avatar.svg";

export const defaultUserState: IUser = {
  id: 0,
  nickName: "",
  email: "",
  avatarUrl: defaultAvatar,
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

export const accountDeletionTerm = 30;

export const redirectTimeoutValue = 1000 * 60;

export const tabScreen = 769;

export const pageLimit = 10;

export const commentsPageLimit = 50;

export const nickNameMinLength = 3;
