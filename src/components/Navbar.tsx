import { Link, useLocation } from 'react-router-dom';
import { Truck, Users, UserCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Truck className="h-8 w-8" />
            <span className="text-xl font-bold">Transportadora</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/')}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Painel</span>
            </Link>
            
            <Link
              to="/trucks"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/trucks')}`}
            >
              <Truck className="h-4 w-4" />
              <span>Caminhões</span>
            </Link>
            
            <Link
              to="/employees"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/employees')}`}
            >
              <Users className="h-4 w-4" />
              <span>Funcionários</span>
            </Link>
            
            <Link
              to="/users"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/users')}`}
            >
              <UserCircle className="h-4 w-4" />
              <span>Usuários</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;