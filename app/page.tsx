"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Briefcase, Users, FileText, Award } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { PlatformLogo } from "@/components/platform-logo"

export default function HomePage() {
  const t = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 page-transition">
      {/* Header */}
      <header className="border-b glass sticky top-0 z-50 shadow-brand backdrop-blur-md animate-fade-in">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-slide-in">
            <PlatformLogo showTitle={false} size="xl" className="hover-lift" />
          </div>
          <div className="flex items-center gap-3 animate-slide-in-right">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" className="btn-enhanced">{t.common.login}</Button>
            </Link>
            <Link href="/register">
              <Button className="btn-enhanced">{t.common.register}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center section-spacing">
        <h2 className="text-5xl font-bold mb-6 text-balance gradient-text-animated animate-fade-in animate-delay-100 leading-[1.3] pb-2 arabic-text">
          {t.home.platformTitle}
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty animate-fade-in animate-delay-200">
          {t.home.description}
        </p>
        <div className="flex items-center justify-center gap-4 animate-fade-in animate-delay-300">
          <Link href="/register?role=company">
            <Button size="lg" className="text-lg btn-enhanced hover-lift shadow-brand">
              {t.home.forCompanies}
            </Button>
          </Link>
          <Link href="/register?role=jobseeker">
            <Button size="lg" variant="outline" className="text-lg bg-transparent btn-enhanced hover-lift border-glow">
              {t.home.forJobSeekers}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 section-spacing">
        <h3 className="text-3xl font-bold text-center mb-12 gradient-text animate-fade-in">{t.home.features}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center card-enhanced hover-lift animate-fade-in animate-delay-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-bold mb-2">{t.home.jobManagement}</h4>
            <p className="text-sm text-muted-foreground">{t.home.jobManagementDesc}</p>
          </Card>

          <Card className="p-6 text-center card-enhanced hover-lift animate-fade-in animate-delay-200">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '0.5s' }}>
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-bold mb-2">{t.home.multipleAssessments}</h4>
            <p className="text-sm text-muted-foreground">{t.home.multipleAssessmentsDesc}</p>
          </Card>

          <Card className="p-6 text-center card-enhanced hover-lift animate-fade-in animate-delay-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '1s' }}>
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-bold mb-2">{t.home.autoGrading}</h4>
            <p className="text-sm text-muted-foreground">{t.home.autoGradingDesc}</p>
          </Card>

          <Card className="p-6 text-center card-enhanced hover-lift animate-fade-in animate-delay-400">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '1.5s' }}>
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-bold mb-2">{t.home.cvBuilder}</h4>
            <p className="text-sm text-muted-foreground">{t.home.cvBuilderDesc}</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center section-spacing">
        <Card className="p-12 bg-gradient-to-l from-primary to-secondary text-primary-foreground shadow-brand-lg animate-scale-in border-glow hover-lift">
          <h3 className="text-3xl font-bold mb-4 animate-fade-in">{t.home.startJourney}</h3>
          <p className="text-lg mb-8 opacity-90 animate-fade-in animate-delay-100">{t.home.joinPlatform}</p>
          <Link href="/register" className="animate-fade-in animate-delay-200">
            <Button size="lg" variant="secondary" className="text-lg btn-enhanced hover-lift shadow-lime">
              {t.home.createFreeAccount}
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 glass animate-fade-in">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>{t.home.allRightsReserved}</p>
        </div>
      </footer>
    </div>
  )
}
