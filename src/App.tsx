import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { useAuth } from './hooks/useAuth';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const CSIDetail = React.lazy(() => import('./components/projects/CSIDetail'));
const Schedule = React.lazy(() => import('./pages/Schedule'));
const Invoices = React.lazy(() => import('./pages/Invoices'));
const Login = React.lazy(() => import('./pages/Login'));
const Transactions = React.lazy(() => import('./pages/Transactions'));
const Proposals = React.lazy(() => import('./pages/Proposals'));
const ProposalForm = React.lazy(() => import('./pages/ProposalForm'));

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route
                  index
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <Dashboard />
                    </React.Suspense>
                  }
                />
                <Route
                  path="projects"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <Projects />
                    </React.Suspense>
                  }
                />
                <Route
                  path="projects/:id"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <ProjectDetail />
                    </React.Suspense>
                  }
                />
                <Route
                  path="projects/:projectId/csi/:csiCode"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <CSIDetail />
                    </React.Suspense>
                  }
                />
                <Route
                  path="schedule"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <Schedule />
                    </React.Suspense>
                  }
                />
                <Route
                  path="invoices"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <Invoices />
                    </React.Suspense>
                  }
                />
                <Route
                  path="transactions"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <Transactions />
                    </React.Suspense>
                  }
                />
                <Route
                  path="proposals"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <Proposals />
                    </React.Suspense>
                  }
                />
                <Route
                  path="proposals/new"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <ProposalForm />
                    </React.Suspense>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}