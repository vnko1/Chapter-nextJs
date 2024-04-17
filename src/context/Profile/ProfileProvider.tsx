"use client";
import { FC, createRef, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import {
  INotification,
  INots,
  SocketEventsEnum,
  PostRefType,
  EndpointsEnum,
  IUser,
} from "@/types";
import { SocketApi, clientApi } from "@/services";

import { ProfileContext } from "./hooks";
import { IProfileProviderProps } from "./ProfileProvider.type";
import { getParsedSession } from "@/lib";

const socket = new SocketApi();

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  console.log(user);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading] = useState(false);
  const [userPostsList, setUserPostsList] = useState<Array<PostRefType>>([]);
  const [isLoad, setIsLoad] = useState(false);

  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  const [notifications, setNotifications] = useState<Array<INots>>([]);

  const editedNotifications: Array<INotification> = notifications
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((el) => ({
      ...el,
      nodeRef: createRef(),
    }));

  const viewedNotifications = editedNotifications.filter(
    (notification) => notification.isViewed
  );
  const newNotifications = editedNotifications.filter(
    (notification) => !notification.isViewed
  );
  const [unreadMessage, setUnreadMessage] = useState(newNotifications.length);

  const [page, setPage] = useState<number>(0);

  const fetchUserPosts = async (currentPage: number) => {
    try {
      const response = await clientApi.get(
        `${EndpointsEnum.POSTS_BY_AUTHOR}?page=${currentPage}&limit=50`
      );
      setUserPostsList(response.data);
      setIsLoad(true);
      return response.data;
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

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

  // useLayoutEffect(() => {
  //   setIsLoading(true);
  //   clientApi
  //     .get(EndpointsEnum.NOTA)
  //     .then(({ data }: AxiosResponse<Array<INots>>) => setNotifications(data))
  //     .catch((e) => {
  //       if (e instanceof AxiosError) {
  //         throw new Error(e.message);
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onError = (error: Error) => console.log(error);
    const onDisconnect = () => setIsConnected(false);

    // if (token) {
    //   socket.init(token);
    //   socket.connect(isAuth);
    // }

    socket.addListener("connect", onConnect);
    socket.addListener("connect_error", onError);
    socket.addListener("disconnect", onDisconnect);

    return () => {
      socket.removeListener("connect", onConnect);
      socket.addListener("connect_error", onError);
      socket.removeListener("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [isAuth, token]);

  useEffect(() => {
    const onHandleSubscribe = socket.handleData<INots>(setNotifications);

    const onHandleNewPost = socket.handleData<INots>(setNotifications);

    if (isConnected) {
      socket.addListener<INots>(SocketEventsEnum.subscribe, onHandleSubscribe);

      socket.addListener<INots>(SocketEventsEnum.post, onHandleNewPost);
    }

    return () => {
      socket.removeListener<INots>(
        SocketEventsEnum.subscribe,
        onHandleSubscribe
      );

      socket.removeListener<INots>(SocketEventsEnum.post, onHandleNewPost);
    };
  }, [isConnected]);

  useEffect(() => {
    setUnreadMessage(newNotifications.length);
  }, [newNotifications.length]);

  return (
    <ProfileContext.Provider
      value={{
        headerAddPostBtnIsDisabled,
        unreadMessage,
        viewedNotifications,
        newNotifications,
        isLoading,
        notificationsLength: notifications.length,
        setHeaderAddPostBtnIsDisabled,
        setUnreadMessage,
        setNotifications,

        page,
        setPage,
        fetchUserPosts,
        userPostsList,
        setUserPostsList,
        isLoad,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
