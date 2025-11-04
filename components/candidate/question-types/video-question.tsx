"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Square, Play, RotateCcw, CheckCircle, AlertCircle } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"

interface VideoQuestionProps {
  question: any
  answer: any
  onChange: (data: any) => void
  submissionId: string
}

export default function VideoQuestion({ question, answer, onChange, submissionId }: VideoQuestionProps) {
  const t = useTranslation()
  const [recording, setRecording] = useState(false)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState("")
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const videoPreviewRef = useRef<HTMLVideoElement>(null)
  const videoPlaybackRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  // Initialize with existing answer
  useEffect(() => {
    if (answer?.videoUrl) {
      setPreviewUrl(answer.videoUrl)
    }
  }, [answer])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const startRecording = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }, 
        audio: true 
      })
      
      streamRef.current = stream

      // Show preview
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream
        videoPreviewRef.current.play()
      }

      const options = { mimeType: "video/webm;codecs=vp8,opus" }
      const mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorderRef.current = mediaRecorder

      chunksRef.current = []
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        setVideoBlob(blob)
        setPreviewUrl(url)
        setRecordingTime(0)
        
        // Store video URL in answer
        onChange({ videoUrl: url })
      }

      mediaRecorder.start(1000) // Collect data every second
      setRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error: any) {
      console.error("Failed to start recording:", error)
      setError(error.message || "فشل الوصول إلى الكاميرا والميكروفون. يرجى التحقق من الأذونات.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      // Stop stream tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }

      // Stop preview
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = null
      }
    }
  }

  const reRecord = () => {
    setVideoBlob(null)
    setPreviewUrl(null)
    setRecordingTime(0)
    setError("")
    onChange({ videoUrl: null })
    
    // Cleanup old blob URL
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
          <p className="text-sm text-danger">{error}</p>
        </div>
      )}

      {!previewUrl && !recording ? (
        <Card className="border-2 border-dashed">
          <CardContent className="p-12 text-center">
            <Video className="h-16 w-16 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-lg font-semibold mb-2">{t.assessments.videoQuestion || "سجل إجابتك بالفيديو"}</h3>
            <p className="text-muted-foreground mb-6">
              {t.assessments.videoQuestionDesc || "سيتم تسجيل فيديو لإجابتك. يمكنك إعادة التسجيل قبل الإرسال."}
            </p>
            <Button onClick={startRecording} size="lg" className="btn-enhanced hover-lift shadow-brand">
              <Play className="ml-2 h-5 w-5" />
              {t.assessments.startRecording || "بدء التسجيل"}
            </Button>
          </CardContent>
        </Card>
      ) : recording ? (
        <Card className="border-primary">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={videoPreviewRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full rounded-lg bg-black"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
                <div className="absolute top-4 right-4 bg-danger/90 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <Square className="h-4 w-4 animate-pulse" />
                  <span className="font-mono font-bold">{formatTime(recordingTime)}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={stopRecording} variant="destructive" size="lg" className="btn-enhanced">
                  <Square className="ml-2 h-5 w-5" />
                  {t.assessments.stopRecording || "إيقاف التسجيل"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : previewUrl ? (
        <Card className="border-success">
          <CardContent className="p-6 space-y-4">
            <div className="relative">
              <video
                ref={videoPlaybackRef}
                src={previewUrl}
                controls
                className="w-full rounded-lg bg-black"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
              <div className="absolute top-4 right-4 bg-success/90 text-white px-3 py-1 rounded-full flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>{t.assessments.recorded || "تم التسجيل"}</span>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={reRecord}
                variant="outline"
                className="btn-enhanced hover-lift"
              >
                <RotateCcw className="ml-2 h-4 w-4" />
                {t.assessments.reRecord || "إعادة التسجيل"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {t.assessments.videoSaved || "تم حفظ الفيديو. يمكنك إعادة التسجيل أو المتابعة."}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
