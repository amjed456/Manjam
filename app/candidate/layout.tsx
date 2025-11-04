"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/lib/context/app-context"
import CandidateNav from "@/components/candidate/candidate-nav"

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentUser } = useApp()

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    } else if (currentUser.role !== "jobseeker") {
      router.push("/")
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== "jobseeker") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 page-transition">
      <CandidateNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
