"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Briefcase, Clock, CheckCircle, Search } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useTranslation } from "@/lib/i18n/use-translation"

export default function CandidateDashboardPage() {
  const { currentUser, submissions, jobs, users } = useApp()
  const t = useTranslation()

  if (!currentUser) return null

  // Get user submissions
  const userSubmissions = submissions
    .filter((s) => s.userId === currentUser.id)
    .slice(-5)
    .reverse()

  // Get stats
  const totalApplications = submissions.filter((s) => s.userId === currentUser.id).length
  const inProgress = submissions.filter((s) => s.userId === currentUser.id && s.status === "in_progress").length
  const completed = submissions.filter((s) => s.userId === currentUser.id && s.status === "submitted").length

  return (
    <div className="space-y-6 section-spacing page-transition">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold gradient-text">{t.dashboard.controlPanel}</h1>
          <p className="text-muted-foreground animate-fade-in animate-delay-100">{t.dashboard.welcomeMessage} {currentUser.fullName}</p>
        </div>
        <Link href="/candidate/jobs">
          <Button size="lg" className="btn-enhanced hover-lift shadow-brand animate-fade-in animate-delay-200">
            <Search className="ml-2 h-5 w-5" />
            {t.dashboard.browseJobs}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-enhanced hover-lift animate-fade-in animate-delay-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.dashboard.totalApplications}</CardTitle>
            <Briefcase className="h-5 w-5 text-primary animate-float" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApplications}</div>
          </CardContent>
        </Card>

        <Card className="card-enhanced hover-lift animate-fade-in animate-delay-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.dashboard.inProgress}</CardTitle>
            <Clock className="h-5 w-5 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inProgress}</div>
          </CardContent>
        </Card>

        <Card className="card-enhanced hover-lift animate-fade-in animate-delay-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t.dashboard.completed}</CardTitle>
            <CheckCircle className="h-5 w-5 text-primary animate-float" style={{ animationDelay: '1s' }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card className="card-enhanced shadow-brand animate-fade-in animate-delay-400">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="gradient-text">{t.dashboard.myRecentApplications}</CardTitle>
            <Link href="/candidate/applications">
              <Button variant="ghost" size="sm" className="btn-enhanced hover-lift">
                {t.dashboard.viewAll}
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {userSubmissions.length > 0 ? (
            <div className="space-y-4">
              {userSubmissions.map((submission, index) => {
                const job = jobs.find((j) => j.id === submission.jobId)
                const company = users.find((u) => u.id === job?.companyId)
                return (
                  <div key={submission.id} className="p-4 rounded-lg border hover:shadow-brand hover-lift transition-all animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{job?.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{company?.companyName}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              submission.status === "submitted"
                                ? "default"
                                : submission.status === "in_progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {submission.status === "submitted"
                              ? t.applications.submitted
                              : submission.status === "in_progress"
                                ? t.applications.inProgress
                                : t.applications.reviewed}
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
                              className={submission.decision === "accepted" ? "bg-success text-success-foreground" : ""}
                            >
                              {submission.decision === "accepted"
                                ? t.applications.accepted
                                : submission.decision === "rejected"
                                  ? t.applications.rejected
                                  : submission.decision === "shortlisted"
                                    ? t.applications.shortlisted
                                    : t.applications.pending}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {submission.status === "in_progress" && (
                        <Link href={`/candidate/assessments/${submission.id}`}>
                          <Button size="sm">{t.applications.continueAssessment}</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">{t.dashboard.noApplicationsYet}</p>
              <Link href="/candidate/jobs">
                <Button>{t.dashboard.browseAvailableJobs}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
