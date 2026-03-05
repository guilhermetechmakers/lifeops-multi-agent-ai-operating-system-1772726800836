import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/auth-context'
import { ProtectedRoute } from '@/components/protected-route'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { LandingPage } from '@/pages/landing'
import { LoginPage } from '@/pages/login'
import { SignupPage } from '@/pages/signup'
import { PasswordResetPage } from '@/pages/password-reset'
import { MasterDashboard } from '@/pages/dashboard/master-dashboard'
import { CronjobsDashboard } from '@/pages/dashboard/cronjobs-dashboard'
import { PlaceholderDashboard } from '@/pages/dashboard/placeholder-dashboard'
import { NotFoundPage } from '@/pages/not-found'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<MasterDashboard />} />
              <Route path="cronjobs" element={<CronjobsDashboard />} />
              <Route path="cronjobs/new" element={<PlaceholderDashboard />} />
              <Route path="cronjobs/:id" element={<PlaceholderDashboard />} />
              <Route path="approvals" element={<PlaceholderDashboard />} />
              <Route path="projects" element={<PlaceholderDashboard />} />
              <Route path="content" element={<PlaceholderDashboard />} />
              <Route path="finance" element={<PlaceholderDashboard />} />
              <Route path="health" element={<PlaceholderDashboard />} />
              <Route path="settings" element={<PlaceholderDashboard />} />
              <Route path="profile" element={<PlaceholderDashboard />} />
              <Route path="agent-trace" element={<PlaceholderDashboard />} />
              <Route path="integrations" element={<PlaceholderDashboard />} />
              <Route path="calendar" element={<PlaceholderDashboard />} />
            </Route>
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
