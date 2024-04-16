import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/styles/index.scss";

import { EndpointsEnum } from "@/types";
import { fetchData } from "@/utils";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  variable: "--font-raleway",
});

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Chapter app",
  description: "Social about books",
};

export default async function RootLayout({
  publicRoute,
  privateRoute,
}: {
  publicRoute: React.ReactNode;
  privateRoute: React.ReactNode;
}) {
  const user = await fetchData(EndpointsEnum.PROFILE, { method: "get" });
  console.log("🚀 ~ user:", user);
  let userIsUnauthorized: boolean = user.message === "Unauthorized";

  if (userIsUnauthorized) {
    const user = await fetchData(EndpointsEnum.REFRESH, { method: "POST" });
    console.log("🚀 ~ userIsUnauthorized user:", user);
  }
  return (
    <html lang="en">
      <body className={raleway.variable}>
        {userIsUnauthorized ? publicRoute : privateRoute}
      </body>
    </html>
  );
}
