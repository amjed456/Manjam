"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useApp } from "@/lib/context/app-context"

interface AssessmentFormProps {
  jobId: string
  initialData?: any
}

export default function AssessmentForm({ jobId, initialData }: AssessmentFormProps) {
  const router = useRouter()
  const { addAssessment, updateAssessment } = useApp()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    timeLimitMinutes: initialData?.timeLimitMinutes || "",
    passingScore: initialData?.passingScore || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (initialData?.id) {
        updateAssessment(initialData.id, formData)
      } else {
        addAssessment({
          ...formData,
          jobId,
        })
      }

      router.push(`/company/jobs/${jobId}/assessment`)
    } catch (err: any) {
      setError(err.message || "فشل حفظ التقييم")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>معلومات التقييم</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">عنوان التقييم *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: تقييم المهارات التقنية"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">وصف التقييم</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="اكتب وصفاً للتقييم..."
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeLimitMinutes">الوقت المحدد (بالدقائق)</Label>
              <Input
                id="timeLimitMinutes"
                type="number"
                value={formData.timeLimitMinutes}
                onChange={(e) => setFormData({ ...formData, timeLimitMinutes: e.target.value })}
                placeholder="60"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingScore">درجة النجاح (%)</Label>
              <Input
                id="passingScore"
                type="number"
                value={formData.passingScore}
                onChange={(e) => setFormData({ ...formData, passingScore: e.target.value })}
                placeholder="70"
                min="0"
                max="100"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "جاري الحفظ..." : initialData ? "تحديث التقييم" : "إنشاء التقييم"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
