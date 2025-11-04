"use client"

import CVBuilder from "@/components/candidate/cv-builder"
import { useApp } from "@/lib/context/app-context"

export default function CVPage() {
  const { currentUser, getCVByUser } = useApp()

  if (!currentUser) return null

  // Get existing CV
  const cv = getCVByUser(currentUser.id)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">السيرة الذاتية</h1>
        <p className="text-muted-foreground">أنشئ سيرتك الذاتية واحصل على ملف PDF احترافي</p>
      </div>

      <CVBuilder initialData={cv} userId={currentUser.id} />
    </div>
  )
}
