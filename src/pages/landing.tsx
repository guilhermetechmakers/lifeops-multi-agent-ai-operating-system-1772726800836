import { Link } from 'react-router-dom'
import { Zap, Shield, GitBranch, BarChart3, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Zap,
    title: 'Multi-Agent Orchestration',
    description:
      'Coordinated GPT-powered agents that automate projects, content, finances, and health with traceable messaging and scoped memory.',
  },
  {
    icon: Shield,
    title: 'Explainable & Auditable',
    description:
      'Every action is schema-validated, permissioned, logged, reversible, and exportable for compliance. User constraints > safety > deadlines > ROI.',
  },
  {
    icon: GitBranch,
    title: 'Cronjobs as First-Class',
    description:
      'Rich scheduling, triggers, constraints, safety rails, retry policies, and run artifacts. Human-in-loop approvals for controlled autonomy.',
  },
  {
    icon: BarChart3,
    title: 'Domain Dashboards',
    description:
      'Projects, Content, Finance, Health—all under one OS. Developer-grade integrations with GitHub, Stripe, Plaid, QuickBooks, and more.',
  },
]

const integrations = [
  'GitHub',
  'Stripe',
  'Plaid',
  'QuickBooks',
  'Xero',
  'Google Calendar',
  'OpenAI',
  'SendGrid',
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,209,193,0.15)_0%,_transparent_50%)]" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <span className="text-xl font-bold text-foreground">LifeOps</span>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Get started</Button>
            </Link>
          </div>
        </nav>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your AI operating system for{' '}
              <span className="gradient-text">life & work</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Automate projects, content, finances, and health through coordinated
              multi-agent orchestration. Explainable, auditable, reversible.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="group">
                  Start free trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features - Bento-style grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          How LifeOps works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Agents and cronjobs work together to automate your workflows with full
          governance and control.
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={cn(
                  'group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-accent/30',
                  i === 0 && 'sm:col-span-2 sm:row-span-2 flex flex-col justify-center'
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Integrations strip */}
      <section className="border-y border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Integrates with
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {integrations.map((name) => (
              <span
                key={name}
                className="text-lg font-medium text-foreground/70 transition-colors hover:text-accent"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ready to automate?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Multi-tier subscription, marketplace, and usage billing. Start with a
            free tier and scale as you grow.
          </p>
          <Link to="/signup" className="mt-8 inline-block">
            <Button size="lg">Get started for free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="font-semibold text-foreground">LifeOps</span>
            <div className="flex gap-8">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                to="/docs"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Docs
              </Link>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} LifeOps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
