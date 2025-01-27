import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link'
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PyTAD",
  description: "Test Status Dashboard",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="h-screen w-screen">
          <div className="flex h-full w-full">
            <div className="h-full w-1/6 bg-gray-100 shadow-sm min-w-max">
              <div className="w-full bg-gray-100 p-10">
                <Link href="/">PyTAD</Link>
              </div>
              <div className="w-full bg-gray-100 p-10">
                {SideMenu()}
              </div>
            </div>
            <div className="h-full w-5/6 p-20">
                {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}


function SideMenu() {
  const links: { [key: string]: string } = {
    "Search": "",
    "Test Cases" : "/testcases",
    "In Progress" : "",
    "Recent Runs" : "",
    "Environments" : ""
  };

  return (
    <ul>
      {
        Object.entries(links).map(([label, path]) => (
          <li className="mt-5" key={label}>
            {(path == "") 
            ? <span className="cursor-not-allowed text-gray-400 pointer-events-none">{label} (Under development)</span>
            : <Link href={path}>{label}</Link>
            }
          </li>
        ))
      }
    </ul>
  );
}
