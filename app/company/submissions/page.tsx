"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"
import { useApp } from "@/lib/context/app-context"

export default function CompanySubmissionsPage() {
  const { currentUser, submissions, jobs, users } = useApp()

  if (!currentUser) return null

  // Get company jobs
  const companyJobs = jobs.filter((j) => j.companyId === currentUser.id)

  // Get all submissions for company jobs
  const companySubmissions = submissions.filter((s) => companyJobs.some((j) => j.id === s.jobId))

  const stats = {
    total: companySubmissions.length,
    pending: companySubmissions.filter((s) => s.status === "submitted" && !s.decision).length,
    accepted: companySubmissions.filter((s) => s.decision === "accepted").length,
    rejected: companySubmissions.filter((s) => s.decision === "rejected").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">المتقدمون</h1>
        <p className="text-muted-foreground">راجع وقيّم طلبات المتقدمين</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">قيد المراجعة</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">مقبول</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accepted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">مرفوض</CardTitle>
            <XCircle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>جميع الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          {companySubmissions.length > 0 ? (
            <div className="space-y-3">
              {companySubmissions.map((submission) => {
                const job = jobs.find((j) => j.id === submission.jobId)
                const candidate = users.find((u) => u.id === submission.userId)
                return (
                  <Link
                    key={submission.id}
                    href={`/company/submissions/${submission.id}`}
                    className="block p-4 rounded-lg border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{candidate?.fullName}</h4>
                        <p className="text-sm text-muted-foreground">{candidate?.email}</p>
                        <p className="text-sm text-muted-foreground mt-1">الوظيفة: {job?.title}</p>
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
                            className={
                              submission.decision === "accepted" ? "bg-success text-success-foreground block" : "block"
                            }
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
                        {submission.totalScore !== null && submission.totalScore !== undefined && (
                          <p className="text-sm font-medium">النتيجة: {submission.totalScore}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>لا يوجد متقدمون بعد</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
