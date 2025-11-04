"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import JobForm from "@/components/company/job-form"
import { useApp } from "@/lib/context/app-context"
import { useTranslation } from "@/lib/i18n/use-translation"

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { currentUser, jobs } = useApp()
  const t = useTranslation()
  const { id } = use(params)

  if (!currentUser) return null

  const job = jobs.find((j) => j.id === id && j.companyId === currentUser.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 section-spacing page-transition">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text">{t.jobs.editJob}</h1>
        <p className="text-muted-foreground animate-fade-in animate-delay-100">{t.jobs.createAndManageJobs}</p>
      </div>

      <JobForm companyId={currentUser.id} initialData={job} />
    </div>
  )
}
