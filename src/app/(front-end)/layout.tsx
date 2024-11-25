import type { Metadata } from "next";
import { Lora } from "next/font/google";
import Footer from "./Footer";
import Navbar from "./Navbar";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Megiwa Shoppers",
    absolute: "Megiwa Shoppers",
  },
  description: "A full-stack e-commerce application built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={lora.className}>
      <Navbar />
      <div className="min-h-[50vh]">{children}</div>
      <Footer />
    </div>
  );
}
