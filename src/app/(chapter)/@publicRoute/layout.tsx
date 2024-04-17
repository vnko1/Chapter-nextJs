import React from "react";
import { PublicHeader } from "@/app/(chapter)/@publicRoute/components";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
}

export default PublicLayout;
