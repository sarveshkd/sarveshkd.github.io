import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { CustomCursor } from "@/components/custom-cursor"
import { Intro } from "@/components/intro"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Sarvesh Kurhade | Cloud & ServiceNow",
  description:
    "Portfolio of Sarvesh Kurhade, a Toronto cloud engineer and ServiceNow developer working across infrastructure, enterprise workflow, and applied AI.",
  openGraph: {
    title: "Sarvesh Kurhade | Cloud & ServiceNow",
    description:
      "Cloud engineering, ServiceNow workflows, and applied AI, presented as one practice.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="grain pointer-events-none fixed inset-0 z-[55] opacity-[0.16] mix-blend-overlay" />
        <SmoothScroll>
          <CustomCursor />
          <Intro />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
