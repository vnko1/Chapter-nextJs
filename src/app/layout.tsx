import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/styles/index.scss";

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
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={raleway.variable}>{children}</body>
    </html>
  );
}
