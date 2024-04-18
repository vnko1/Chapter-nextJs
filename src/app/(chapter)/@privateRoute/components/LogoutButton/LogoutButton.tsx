"use client";
import { logout } from "@/lib";
import React, { FC } from "react";

const LogoutButton: FC = () => {
  return <button onClick={async () => await logout()}>Logout</button>;
};

export default LogoutButton;
