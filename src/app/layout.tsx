import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import React from "react";
import { Toaster } from "../components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";

export const metadata = {
  title: "T3 Gallery",
  description: "Test Project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" className={`${GeistSans.variable} dark`}>
          <body>
            <div className="grid h-screen grid-rows-[auto_1fr] ">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
              {modal}
            </div>
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
