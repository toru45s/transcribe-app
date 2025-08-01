import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RegisterDialog } from "@/components/register-dialog";
import { LoginDialog } from "@/components/login-dialog";
import { LogoutAlert } from "@/components/logout-alert";
import { SideMenu } from "@/components/side-menu";
import { Toaster } from "@/components/ui/sonner";
import { AlertDeleteHistorySet } from "@/components/histories/alert-delete-history-set";
import { DialogEditHistorySet } from "@/components/histories/dialog-edit-history-set";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subtitles",
  description: "Subtitles is a helper for listening to English",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="relative px-4 pb-16 md:px-6 min-h-screen flex flex-col">
          {children}
        </main>
        <SideMenu />
        <RegisterDialog />
        <LoginDialog />
        <LogoutAlert />
        <Toaster />
        <AlertDeleteHistorySet />
        <DialogEditHistorySet />
      </body>
    </html>
  );
}
