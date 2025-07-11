import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PizzaFun",
  description:
    "Next-generation Bitcoin token trading protocol with 2-second confirmations, zero gas fees, and military-grade security.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "PizzaFun",
    description:
      "Next-generation Bitcoin token trading protocol with 2-second confirmations, zero gas fees, and military-grade security.",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PizzaFun",
    description:
      "Next-generation Bitcoin token trading protocol with 2-second confirmations, zero gas fees, and military-grade security.",
    images: ["/favicon.svg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
