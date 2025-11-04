"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Briefcase, LayoutDashboard, FileText, LogOut } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useTranslation } from "@/lib/i18n/use-translation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { PlatformLogo } from "@/components/platform-logo"

export default function CompanyNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout } = useApp()
  const t = useTranslation()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navItems = [
    { href: "/company/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/company/jobs", label: t.nav.jobs, icon: Briefcase },
    { href: "/company/submissions", label: t.nav.submissions, icon: FileText },
  ]

  return (
    <header className="border-b glass sticky top-0 z-50 shadow-brand backdrop-blur-md animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8 animate-slide-in">
          <Link href="/company/dashboard" className="hover-lift">
            <PlatformLogo showTitle={false} size="xl" />
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.href} href={item.href} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                  <Button variant={isActive ? "default" : "ghost"} size="sm" className="gap-2 btn-enhanced hover-lift">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-3 animate-slide-in-right">
          <span className="text-sm text-muted-foreground hidden md:block">{currentUser?.fullName}</span>
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 btn-enhanced hover-lift">
            <LogOut className="h-4 w-4" />
            {t.common.logout}
          </Button>
        </div>
      </div>
    </header>
  )
}
