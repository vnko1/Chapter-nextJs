"use client";
import { FC, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

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

  useEffect(() => {
    async function getMe() {
      const res: AxiosResponse<IUser> = await clientApi.get(
        EndpointsEnum.PROFILE
      );
      setUser(res.data);
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
        headerAddPostBtnIsDisabled,
        setHeaderAddPostBtnIsDisabled,
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
