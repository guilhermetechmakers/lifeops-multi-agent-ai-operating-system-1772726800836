import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, MoreHorizontal, Play, Pause, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const mockCronjobs = [
  { id: '1', name: 'Weekly content pipeline', schedule: '0 9 * * 1', status: 'enabled', lastRun: '2h ago' },
  { id: '2', name: 'PR triage', schedule: '0 8 * * 1-5', status: 'enabled', lastRun: '6h ago' },
  { id: '3', name: 'Monthly close', schedule: '0 9 1 * *', status: 'disabled', lastRun: '3d ago' },
  { id: '4', name: 'Health plan sync', schedule: '0 7 * * *', status: 'enabled', lastRun: '1d ago' },
]

export function CronjobsDashboard() {
  const [search, setSearch] = useState('')
  const [isLoading] = useState(false)

  const filtered = mockCronjobs.filter((j) =>
    j.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cronjobs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage scheduled automations
          </p>
        </div>
        <Link to="/dashboard/cronjobs/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create cronjob
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-2xl">{mockCronjobs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enabled</CardDescription>
            <CardTitle className="text-2xl text-success">
              {mockCronjobs.filter((j) => j.status === 'enabled').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Disabled</CardDescription>
            <CardTitle className="text-2xl text-muted-foreground">
              {mockCronjobs.filter((j) => j.status === 'disabled').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Cronjob list</CardTitle>
              <CardDescription>All scheduled automations</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Schedule</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Last run</th>
                    <th className="pb-3 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-border transition-colors hover:bg-secondary/30"
                    >
                      <td className="py-4">
                        <Link
                          to={`/dashboard/cronjobs/${job.id}`}
                          className="font-medium text-foreground hover:text-accent"
                        >
                          {job.name}
                        </Link>
                      </td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">
                        {job.schedule}
                      </td>
                      <td className="py-4">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            job.status === 'enabled' && 'bg-success/20 text-success',
                            job.status === 'disabled' && 'bg-muted text-muted-foreground'
                          )}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {job.lastRun}
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Run now
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              {job.status === 'enabled' ? 'Pause' : 'Resume'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-danger focus:text-danger">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filtered.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground">No cronjobs found</p>
              <Link to="/dashboard/cronjobs/new" className="mt-4">
                <Button>Create your first cronjob</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
