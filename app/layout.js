import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vahiql",
  description: "Find your dream car",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
