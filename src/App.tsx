import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Trucks from './pages/Trucks';
import Employees from './pages/Employees';
import Users from './pages/Users';
import Login from './pages/Login';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuth = localStorage.getItem('auth') === 'true';
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  const isAuth = localStorage.getItem('auth') === 'true'; 

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Renderiza a Navbar somente se o usuário estiver autenticado */}
        {isAuth && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* Rota de Login */}
            <Route path="/login" element={<Login />} />

            {/* Rotas Protegidas */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/trucks/*"
              element={
                <RequireAuth>
                  <Trucks />
                </RequireAuth>
              }
            />
            <Route
              path="/employees/*"
              element={
                <RequireAuth>
                  <Employees />
                </RequireAuth>
              }
            />
            <Route
              path="/users/*"
              element={
                <RequireAuth>
                  <Users />
                </RequireAuth>
              }
            />

            {/* Rota Padrão */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;