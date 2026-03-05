import { useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const pageTitles: Record<string, { title: string; description: string }> = {
  approvals: { title: 'Approvals Queue', description: 'Human-in-loop review for scheduled actions' },
  projects: { title: 'Projects', description: 'Developer-centric automation and visibility' },
  content: { title: 'Content', description: 'End-to-end content automation and publishing' },
  finance: { title: 'Finance', description: 'Financial automation and reconciliation' },
  health: { title: 'Health', description: 'Personal health planning and workload balancing' },
  settings: { title: 'Settings', description: 'Configure global settings and preferences' },
  profile: { title: 'Profile', description: 'Manage account, integrations, and security' },
  'agent-trace': { title: 'Agent Trace & Debugger', description: 'Debug multi-agent interactions' },
  integrations: { title: 'CI & Integrations', description: 'Manage repo, CI connectors, webhook health' },
  calendar: { title: 'Content Calendar', description: 'Schedule and manage content' },
  new: { title: 'New Cronjob', description: 'Create a new scheduled automation' },
}

export function PlaceholderDashboard() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const last = segments.pop() ?? ''
  const parent = segments.pop()
  const config =
    pageTitles[last] ??
    (parent === 'cronjobs' && last
      ? { title: 'Cronjob details', description: 'View and edit cronjob configuration' }
      : { title: 'Dashboard', description: 'Coming soon' })

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
        <p className="mt-1 text-muted-foreground">{config.description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            This section is under development. Check back later for updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
            <p className="text-muted-foreground">
              Content will be available in a future release.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
