import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './features/dashboard/Dashboard';
import { OwnersPage } from './features/owners/OwnersPage';
import { AnimalsPage } from './features/animals/AnimalsPage';
import { ConsultationsPage } from './features/consultations/ConsultationsPage';
import { DocumentsPage } from './features/documents/DocumentsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout title="Dashboard">
              <Dashboard />
            </Layout>
          } />
          <Route path="/owners" element={
            <Layout title="Owners">
              <OwnersPage />
            </Layout>
          } />
          <Route path="/animals" element={
            <Layout title="Animals">
              <AnimalsPage />
            </Layout>
          } />
          <Route path="/consultations" element={
            <Layout title="Consultations">
              <ConsultationsPage />
            </Layout>
          } />
          <Route path="/documents" element={
            <Layout title="Documents">
              <DocumentsPage />
            </Layout>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
