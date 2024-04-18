"use client";
import { FC, useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

import { EndpointsEnum, IUser } from "@/types";
import { clientApi } from "@/services";

import { ProfileContext } from "./hooks";
import { IProfileProviderProps } from "./ProfileProvider.type";
import { getParsedSession } from "@/lib";

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);
  const [addPostModalIsOpen, setAddPostModalIsOpen] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const res: AxiosResponse<IUser> = await clientApi.get(
          EndpointsEnum.PROFILE
        );
        setUser(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("🚀 ~ getMe ~ error:", error);
        }
      }
    }

    getMe();
  }, []);

  useEffect(() => {
    getParsedSession().then((res) => {
      setIsAuth(res.isLoggedIn);
      setToken(res.token);
    });
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        setAddPostModalIsOpen,
        setHeaderAddPostBtnIsDisabled,
        headerAddPostBtnIsDisabled,
        addPostModalIsOpen,
        isAuth,
        token,
        user,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
