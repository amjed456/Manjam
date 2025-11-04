"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface CVPreviewProps {
  data: any
}

export default function CVPreview({ data }: CVPreviewProps) {
  const handleDownloadPDF = () => {
    // Create a printable version
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const html = generateCVHTML(data)
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border-b">
        <Button onClick={handleDownloadPDF} className="w-full">
          <Download className="ml-2 h-4 w-4" />
          تحميل PDF
        </Button>
      </div>

      <div className="p-6 bg-white text-black" style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Personal Info */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
          <h1 className="text-3xl font-bold mb-2">{data.personal_info?.full_name || "الاسم"}</h1>
          <div className="text-sm space-y-1">
            {data.personal_info?.email && <p>{data.personal_info.email}</p>}
            {data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
            {data.personal_info?.address && <p>{data.personal_info.address}</p>}
          </div>
        </div>

        {/* Summary */}
        {data.personal_info?.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-400">نبذة مختصرة</h2>
            <p className="text-sm">{data.personal_info.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-400">الخبرات العملية</h2>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{exp.title}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.start_date} - {exp.current ? "حتى الآن" : exp.end_date}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">{exp.company}</p>
                {exp.description && <p className="text-sm">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-400">التعليم</h2>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">
                    {edu.degree} - {edu.field}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {edu.start_date} - {edu.end_date}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-400">المهارات</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span key={index} className="text-sm bg-gray-200 px-3 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-400">اللغات</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang: any, index: number) => (
                <div key={index} className="text-sm">
                  <span className="font-semibold">{lang.language}:</span> {lang.proficiency}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-400">الشهادات</h2>
            {data.certifications.map((cert: any, index: number) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold">{cert.name}</h3>
                <p className="text-sm text-gray-700">
                  {cert.issuer} - {cert.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function generateCVHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>${data.personal_info?.full_name || "السيرة الذاتية"}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          direction: rtl;
          text-align: right;
        }
        h1 { font-size: 32px; margin-bottom: 10px; text-align: center; }
        h2 { font-size: 20px; border-bottom: 2px solid #0136fe; padding-bottom: 5px; margin-top: 30px; margin-bottom: 15px; }
        h3 { font-size: 16px; margin-bottom: 5px; }
        .header { text-align: center; border-bottom: 3px solid #0136fe; padding-bottom: 20px; margin-bottom: 30px; }
        .contact { font-size: 14px; margin-top: 10px; }
        .section { margin-bottom: 25px; }
        .item { margin-bottom: 20px; }
        .date { float: left; color: #0136fe; font-size: 14px; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #eef5ff; padding: 5px 15px; border-radius: 5px; font-size: 14px; border: 1px solid #0136fe; }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.personal_info?.full_name || ""}</h1>
        <div class="contact">
          ${data.personal_info?.email ? `<p>${data.personal_info.email}</p>` : ""}
          ${data.personal_info?.phone ? `<p>${data.personal_info.phone}</p>` : ""}
          ${data.personal_info?.address ? `<p>${data.personal_info.address}</p>` : ""}
        </div>
      </div>

      ${
        data.personal_info?.summary
          ? `
        <div class="section">
          <h2>نبذة مختصرة</h2>
          <p>${data.personal_info.summary}</p>
        </div>
      `
          : ""
      }

      ${
        data.experience && data.experience.length > 0
          ? `
        <div class="section">
          <h2>الخبرات العملية</h2>
          ${data.experience
            .map(
              (exp: any) => `
            <div class="item">
              <span class="date">${exp.start_date} - ${exp.current ? "حتى الآن" : exp.end_date}</span>
              <h3>${exp.title}</h3>
              <p style="font-weight: 600; color: #555;">${exp.company}</p>
              ${exp.description ? `<p>${exp.description}</p>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        data.education && data.education.length > 0
          ? `
        <div class="section">
          <h2>التعليم</h2>
          ${data.education
            .map(
              (edu: any) => `
            <div class="item">
              <span class="date">${edu.start_date} - ${edu.end_date}</span>
              <h3>${edu.degree} - ${edu.field}</h3>
              <p style="color: #555;">${edu.institution}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        data.skills && data.skills.length > 0
          ? `
        <div class="section">
          <h2>المهارات</h2>
          <div class="skills">
            ${data.skills.map((skill: string) => `<span class="skill">${skill}</span>`).join("")}
          </div>
        </div>
      `
          : ""
      }

      ${
        data.languages && data.languages.length > 0
          ? `
        <div class="section">
          <h2>اللغات</h2>
          ${data.languages
            .map(
              (lang: any) => `
            <p><strong>${lang.language}:</strong> ${lang.proficiency}</p>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        data.certifications && data.certifications.length > 0
          ? `
        <div class="section">
          <h2>الشهادات</h2>
          ${data.certifications
            .map(
              (cert: any) => `
            <div class="item">
              <h3>${cert.name}</h3>
              <p style="color: #555;">${cert.issuer} - ${cert.date}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }
    </body>
    </html>
  `
}
