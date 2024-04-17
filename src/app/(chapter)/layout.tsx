import React from "react";
import { getSession } from "@/lib";

async function ChapterLayout({
  publicRoute,
  privateRoute,
}: {
  publicRoute: React.ReactNode;
  privateRoute: React.ReactNode;
}) {
  const session = await getSession();

  const root = session.isLoggedIn ? privateRoute : publicRoute;

  return root;
}

export default ChapterLayout;
