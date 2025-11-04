"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Users, Briefcase, FileText, LogOut } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useTranslation } from "@/lib/i18n/use-translation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { PlatformLogo } from "@/components/platform-logo"

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout } = useApp()
  const t = useTranslation()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navItems = [
    { href: "/admin/dashboard", label: t.nav.dashboard, icon: Shield },
    { href: "/admin/users", label: t.nav.users, icon: Users },
    { href: "/admin/companies", label: t.nav.companies, icon: Briefcase },
    { href: "/admin/jobs", label: t.nav.jobs, icon: FileText },
  ]

  return (
    <header className="border-b glass sticky top-0 z-50 shadow-brand backdrop-blur-md animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in">
            <PlatformLogo showTitle={true} size="md" className="hover-lift" />
            <div>
              <h1 className="text-xl font-bold gradient-text">{t.nav.adminDashboard}</h1>
              <p className="text-sm text-muted-foreground">{currentUser?.fullName}</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 animate-slide-in-right">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                  <Button variant={isActive ? "default" : "ghost"} size="sm" className="gap-2 btn-enhanced hover-lift">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 btn-enhanced hover-lift">
              <LogOut className="h-4 w-4" />
              {t.common.logout}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
