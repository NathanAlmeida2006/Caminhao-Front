import { Truck, Users, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-gray-900">Painel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/trucks"
          className="bg-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div className="h-48 w-full overflow-hidden">
            <img 
              src="https://imgur.com/YnE4LCw.png"
              alt="Frota de caminhões"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">Caminhões</h2>
                <p className="text-2xl text-gray-900">Gerencie sua frota</p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/employees"
          className="bg-green-500 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div className="h-48 w-full overflow-hidden">
            <img 
              src="https://imgur.com/vxLRcmP.png"
              alt="Equipe de funcionários"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">Funcionários</h2>
                <p className="text-2xl text-gray-900">Gerencie sua equipe</p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/users"
          className="bg-purple-500 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div className="h-48 w-full overflow-hidden">
            <img 
              src="https://imgur.com/QTLQxfZ.png"
              alt="Gestão de usuários"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <UserCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">Usuários</h2>
                <p className="text-2xl text-gray-900">Gerencie o acesso ao sistema</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;