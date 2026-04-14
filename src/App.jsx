import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { pagesConfig } from './pages.config';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Admin from './pages/Admin.tsx';
import AdminLogin from './pages/AdminLogin';
import ProductDetail from './pages/ProductDetails';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

const { Pages, Layout, mainPage } = pagesConfig;
const publicPages = Object.entries(Pages).filter(([pageName]) => pageName !== 'Admin');
const publicPagesMap = Object.fromEntries(publicPages);
const mainPageKey = mainPage ?? Object.keys(publicPagesMap)[0];
const MainPage = mainPageKey ? publicPagesMap[mainPageKey] : () => null;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AdminEntryRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/adm/painel" replace />;
  }
  return <AdminLogin />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {publicPages.map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/produto/:slug" element={
        <LayoutWrapper currentPageName="ProductDetail">
          <ProductDetail />
        </LayoutWrapper>
      } />
      <Route path="/adm" element={<AdminEntryRoute />} />
      <Route path="/adm/login" element={<AdminLogin />} />
      <Route
        path="/adm/painel"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<Navigate to="/adm" replace />} />
      <Route path="/Admin" element={<Navigate to="/adm" replace />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <div className="relative w-full min-h-screen text-white antialiased">
        <div className="cinematic-bg fixed inset-0 -z-10" aria-hidden="true">
          <div className="cinematic-bg__blob cinematic-bg__blob--top" />
          <div className="cinematic-bg__blob cinematic-bg__blob--mid" />
          <div className="cinematic-bg__blob cinematic-bg__blob--bottom" />
          <div className="cinematic-bg__grain" />
          <div className="cinematic-bg__vignette" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <AppRoutes />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
