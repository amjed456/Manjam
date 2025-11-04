import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/lib/context/app-context"
import { LanguageProvider } from "@/lib/i18n/language-context"

export const metadata: Metadata = {
  title: "منجم | Manjam",
  description: "منصة شاملة للتوظيف والتقييم | Comprehensive job and assessment platform",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className="font-sans">
        <LanguageProvider>
          <AppProvider>{children}</AppProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
