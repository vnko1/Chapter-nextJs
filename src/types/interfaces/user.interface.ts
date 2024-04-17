import { IBook } from "./book.interface";

export interface IUser {
  id: number;
  email: string;
  nickName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  location: string | null;
  userStatus: string | null;
  provider: string;
  socialId: number | string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  photo?: string | null;
  role: IUserRole;
  status: IUserStatus;
  myFollowersCount: number | null;
  myFollowingCount: number | null;
  userBooks: Array<IBook> | [];
}

export type UserBooks = {
  userBooks: Array<IBook> | [];
};

export type UserBookFavoriteStatus = {
  id: number;
  userBooks: Array<IBook> | [];
  UserBookFavoriteStatus: boolean;
};

export interface IUserRole {
  id: number;
  name: string;
}

export interface IUserStatus {
  id: number;
  name: string;
}
