import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RegisterDialog } from "@/features/auth/register/components/register-dialog";
import { LoginDialog } from "@/features/auth/token/components/login-dialog";
import { LogoutAlert } from "@/features/auth/token/components/logout-alert";
import { SideMenu } from "@/client/components/side-menu";
import { Toaster } from "@/client/components/ui/sonner";
import { AlertInvalidToken } from "@/client/components/alert-invalid-token";

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
  icons: {
    icon: "/favicon.ico",
  },
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
        <Toaster position="top-center" richColors />
        <AlertInvalidToken />
      </body>
    </html>
  );
}
