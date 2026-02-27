import { Nunito, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const nunito = Nunito({
  variable: "--nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: "Restro",
  description: "It's a resturant app, that allows you to buy and sell food, in reel content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
