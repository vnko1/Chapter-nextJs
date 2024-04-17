import React from "react";
import { ProfileProvider } from "@/context";

// import styles from "./privateRoute.module.scss";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}

export default PrivateLayout;
