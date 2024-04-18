import Link from "next/link";
import React from "react";

function SettingsPage() {
  return (
    <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1>SettingsPage</h1>
      <Link href={"/"}>Feed</Link>
    </div>
  );
}

export default SettingsPage;
