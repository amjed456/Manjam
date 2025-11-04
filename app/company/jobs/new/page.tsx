"use client"

import JobForm from "@/components/company/job-form"
import { useApp } from "@/lib/context/app-context"

export default function NewJobPage() {
  const { currentUser } = useApp()

  if (!currentUser) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">إضافة وظيفة جديدة</h1>
        <p className="text-muted-foreground">املأ البيانات لإنشاء وظيفة جديدة</p>
      </div>

      <JobForm companyId={currentUser.id} />
    </div>
  )
}
