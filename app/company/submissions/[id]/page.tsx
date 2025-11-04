"use client"

import { use } from "react"
import { useApp } from "@/lib/context/app-context"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import SubmissionReview from "@/components/company/submission-review"
import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"

export default function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { user, submissions, jobs, users, companies, assessments, sections, questions, answers } = useApp()
  const t = useTranslation()
  const { id } = use(params)
  const [submission, setSubmission] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      redirect("/login")
      return
    }

    const foundSubmission = submissions.find((s) => s.id === id)
    if (!foundSubmission) {
      notFound()
      return
    }

    // Build full submission object with nested data
    const job = jobs.find((j) => j.id === foundSubmission.jobId)
    const company = companies.find((c) => c.id === job?.companyId)
    const candidate = users.find((u) => u.id === foundSubmission.userId)
    const assessment = assessments.find((a) => a.id === foundSubmission.assessmentId)
    const assessmentSections = sections.filter((s) => s.assessmentId === assessment?.id)
    const sectionsWithQuestions = assessmentSections.map((section) => ({
      ...section,
      questions: questions.filter((q) => q.sectionId === section.id),
    }))
    const submissionAnswers = answers.filter((a) => a.submissionId === id)

    const fullSubmission = {
      ...foundSubmission,
      jobs: { ...job, companies: company },
      users: candidate,
      assessments: {
        ...assessment,
        assessment_sections: sectionsWithQuestions,
      },
      answers: submissionAnswers,
    }

    setSubmission(fullSubmission)
  }, [user, submissions, jobs, users, companies, assessments, sections, questions, answers, id])

  if (!user) return null
  if (!submission) return <div>جاري التحميل...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/company/submissions">
          <Button variant="ghost">
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة للمتقدمين
          </Button>
        </Link>
      </div>

      {/* Candidate Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{submission.users?.fullName}</CardTitle>
              <p className="text-muted-foreground">{submission.users?.email}</p>
              {submission.users?.phone && <p className="text-muted-foreground">{submission.users.phone}</p>}
            </div>
            <div className="text-left space-y-2">
              <Badge variant={submission.status === "submitted" ? "default" : "secondary"}>
                {submission.status === "submitted" ? "مكتمل" : "قيد التنفيذ"}
              </Badge>
              {submission.decision && (
                <Badge
                  variant={
                    submission.decision === "accepted"
                      ? "default"
                      : submission.decision === "rejected"
                        ? "destructive"
                        : "secondary"
                  }
                  className={submission.decision === "accepted" ? "bg-success text-success-foreground block" : "block"}
                >
                  {submission.decision === "accepted"
                    ? "مقبول"
                    : submission.decision === "rejected"
                      ? "مرفوض"
                      : submission.decision === "shortlisted"
                        ? "قائمة مختصرة"
                        : "قيد الانتظار"}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">الوظيفة</p>
              <p className="font-medium">{submission.jobs?.title}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">تاريخ التقديم</p>
              <p className="font-medium">{new Date(submission.createdAt).toLocaleDateString("ar-SA")}</p>
            </div>
            {submission.submittedAt && (
              <div>
                <p className="text-sm text-muted-foreground">تاريخ الإرسال</p>
                <p className="font-medium">{new Date(submission.submittedAt).toLocaleDateString("ar-SA")}</p>
              </div>
            )}
            {submission.totalScore !== null && (
              <div>
                <p className="text-sm text-muted-foreground">النتيجة الإجمالية</p>
                <p className="font-medium text-lg">
                  {submission.totalScore} / {submission.maxScore}
                  <span className="text-sm text-muted-foreground mr-2">
                    ({Math.round((submission.totalScore / submission.maxScore) * 100)}%)
                  </span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Review Component */}
      <SubmissionReview submission={submission} />
    </div>
  )
}
