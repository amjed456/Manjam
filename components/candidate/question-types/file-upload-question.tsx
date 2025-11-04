"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"

interface FileUploadQuestionProps {
  question: any
  answer: any
  onChange: (data: any) => void
  submissionId: string
}

export default function FileUploadQuestion({ question, answer, onChange, submissionId }: FileUploadQuestionProps) {
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState(answer?.fileUrl ? "ملف مرفوع" : "")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // In a real app, upload to storage (Vercel Blob, Supabase Storage, etc.)
      // For now, we'll create a blob URL for preview
      const fileUrl = URL.createObjectURL(file)
      setFileName(file.name)
      onChange({ fileUrl, fileName: file.name })
    } catch (error) {
      console.error("Failed to upload file:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {!fileName ? (
        <label className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors block">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">{uploading ? "جاري الرفع..." : "اضغط لرفع ملف"}</p>
          <p className="text-sm text-muted-foreground">PDF, DOC, DOCX, XLS, XLSX (حتى 10MB)</p>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            disabled={uploading}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <File className="h-5 w-5 text-primary" />
            <span className="font-medium">{fileName}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFileName("")
              onChange({ fileUrl: null, fileName: null })
            }}
            className="btn-enhanced hover-lift"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
