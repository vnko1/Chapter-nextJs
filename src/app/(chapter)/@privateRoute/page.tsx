import Link from "next/link";
import React from "react";
import { LogoutButton } from "./components";

function FeedPage() {
  return (
    <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1>FeedPage</h1>
      <Link href={"/settings"}>Settings</Link>
      <LogoutButton />
    </div>
  );
}

export default FeedPage;
