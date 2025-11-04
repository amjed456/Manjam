"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/lib/context/app-context"
import CompanyNav from "@/components/company/company-nav"

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentUser } = useApp()

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    } else if (currentUser.role !== "company") {
      router.push("/")
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== "company") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 page-transition">
      <CompanyNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
