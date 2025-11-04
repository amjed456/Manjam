"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Code, FileText, Video, CheckSquare, MessageSquare, Upload } from "lucide-react"
import { useApp } from "@/lib/context/app-context"

const sectionTypes = [
  { value: "coding", label: "اختبار برمجي", icon: Code, description: "أسئلة برمجية مع تصحيح تلقائي" },
  { value: "excel", label: "مهمة إكسل", icon: FileText, description: "مهام تتطلب مهارات إكسل" },
  { value: "video", label: "رد بالفيديو", icon: Video, description: "تسجيل فيديو من المتقدم" },
  { value: "mcq", label: "أسئلة متعددة الخيارات", icon: CheckSquare, description: "أسئلة اختيار من متعدد" },
  { value: "short_answer", label: "إجابة قصيرة", icon: MessageSquare, description: "أسئلة نصية قصيرة" },
  { value: "long_answer", label: "إجابة طويلة", icon: FileText, description: "أسئلة نصية طويلة ومفصلة" },
  { value: "file_upload", label: "رفع ملف", icon: Upload, description: "رفع ملفات أو مستندات" },
]

interface SectionFormProps {
  assessmentId: string
  jobId: string
  initialData?: any
}

export default function SectionForm({ assessmentId, jobId, initialData }: SectionFormProps) {
  const router = useRouter()
  const { sections, addSection, updateSection } = useApp()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    sectionType: initialData?.sectionType || "mcq",
    timeLimitMinutes: initialData?.timeLimitMinutes || "",
    orderIndex: initialData?.orderIndex || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (initialData?.id) {
        updateSection(initialData.id, formData)
      } else {
        // Get max order_index
        const assessmentSections = sections.filter((s) => s.assessmentId === assessmentId)
        const nextOrder =
          assessmentSections.length > 0 ? Math.max(...assessmentSections.map((s) => s.orderIndex)) + 1 : 0

        addSection({
          ...formData,
          assessmentId,
          orderIndex: nextOrder,
        })
      }

      router.push(`/company/jobs/${jobId}/assessment`)
    } catch (err: any) {
      setError(err.message || "فشل حفظ القسم")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>معلومات القسم</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Label>نوع القسم *</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {sectionTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, sectionType: type.value })}
                    className={`p-4 rounded-lg border-2 text-right transition-all ${
                      formData.sectionType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    disabled={loading}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm mb-1">{type.label}</p>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">عنوان القسم *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: اختبار البرمجة بلغة JavaScript"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">وصف القسم</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="اكتب وصفاً للقسم..."
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeLimitMinutes">الوقت المحدد (بالدقائق)</Label>
            <Input
              id="timeLimitMinutes"
              type="number"
              value={formData.timeLimitMinutes}
              onChange={(e) => setFormData({ ...formData, timeLimitMinutes: e.target.value })}
              placeholder="30"
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "جاري الحفظ..." : initialData ? "تحديث القسم" : "إضافة القسم"}
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
