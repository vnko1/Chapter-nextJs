import React from "react";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

export default AuthLayout;
