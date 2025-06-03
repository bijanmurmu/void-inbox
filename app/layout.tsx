import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Void Inbox - Send messages to no one",
  description: "Send messages to no one. They disappear after you send them. Occasionally, the Void replies.",
  keywords: ["void", "inbox", "messages", "minimalist", "anti-social", "meditation"],
  authors: [{ name: "Bijan", url: "https://github.com/bijanmurmu/void-inbox" }],
  creator: "Bijan",
  publisher: "Bijan",
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Void Inbox",
    description: "Send messages to no one. They disappear after you send them. Occasionally, the Void replies.",
    url: "https://void-inbox.vercel.app",
    siteName: "Void Inbox",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Void Inbox",
    description: "Send messages to no one. They disappear after you send them.",
    creator: "@bijanbwb",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="canonical" href="https://void-inbox.vercel.app" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
