import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { IUser, RefType, SocketEventsEnum } from "..";

export type SetErrorType = Dispatch<SetStateAction<AxiosError | null | string>>;

export type SocketEventsType =
  | SocketEventsEnum.subscribe
  | SocketEventsEnum.post;

export interface INots {
  id: number;
  isViewed: boolean;
  createdAt: Date | string;
  data: {
    message: string;
    postId?: number;
    user: Required<
      Pick<IUser, "avatarUrl" | "firstName" | "lastName" | "nickName" | "id">
    >;
  };
}

export interface INotification extends INots {
  nodeRef: RefType;
}
