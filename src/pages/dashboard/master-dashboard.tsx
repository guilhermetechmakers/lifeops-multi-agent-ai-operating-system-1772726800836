import { Link } from 'react-router-dom'
import { Clock, CheckSquare, AlertCircle, Plus, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'

const activeCronjobs = [
  { id: '1', name: 'Weekly content pipeline', status: 'running', nextRun: '2h' },
  { id: '2', name: 'PR triage', status: 'scheduled', nextRun: '6h' },
  { id: '3', name: 'Monthly close', status: 'idle', nextRun: '3d' },
]

const alerts = [
  { id: '1', message: 'Anomaly detected in transaction #4521', severity: 'warning' },
  { id: '2', message: 'Content publish failed - retrying', severity: 'info' },
]

const chartData = [
  { name: 'Mon', runs: 12, success: 11 },
  { name: 'Tue', runs: 18, success: 17 },
  { name: 'Wed', runs: 15, success: 14 },
  { name: 'Thu', runs: 22, success: 21 },
  { name: 'Fri', runs: 20, success: 19 },
  { name: 'Sat', runs: 8, success: 8 },
  { name: 'Sun', runs: 5, success: 5 },
]

const quickActions = [
  { label: 'New Cronjob', to: '/dashboard/cronjobs/new', icon: Plus },
  { label: 'Approvals', to: '/dashboard/approvals', icon: CheckSquare },
]

export function MasterDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Master Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Global command center for your automations
        </p>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-4">
        {quickActions.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to}>
            <Button variant="secondary" className="gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Stats + Chart grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Run activity
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgb(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgb(var(--card))',
                      border: '1px solid rgb(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="runs"
                    stroke="rgb(var(--accent))"
                    fillOpacity={1}
                    fill="url(#colorRuns)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active alerts</p>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    'rounded-md border px-3 py-2 text-sm',
                    alert.severity === 'warning'
                      ? 'border-warning/50 bg-warning/5'
                      : 'border-border bg-secondary/50'
                  )}
                >
                  {alert.message}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active cronjobs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Active cronjobs
            </CardTitle>
            <CardDescription>Recently scheduled automations</CardDescription>
          </div>
          <Link to="/dashboard/cronjobs">
            <Button variant="secondary" size="sm">View all</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activeCronjobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-md border border-border px-4 py-3 transition-colors hover:bg-secondary/50"
              >
                <div>
                  <p className="font-medium">{job.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Next run: {job.nextRun} • {job.status}
                  </p>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    job.status === 'running' && 'bg-success/20 text-success',
                    job.status === 'scheduled' && 'bg-accent/20 text-accent',
                    job.status === 'idle' && 'bg-muted text-muted-foreground'
                  )}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
