import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";

const josefinSans = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} bg-primary-950 text-primary-100 min-h-screen`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
