import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TruckForm from '../components/TruckForm';

interface Truck {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  fabricante: string;
  numeroChassis: string;
  capacidadeCarga: number;
}

const Trucks = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/caminhoes');
      setTrucks(response.data);
    } catch (error) {
      toast.error('Falha ao buscar caminhões');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza de que deseja excluir este caminhão?')) {
      try {
        await axios.delete(`http://localhost:8080/api/caminhoes/${id}`);
        toast.success('Caminhão excluído com sucesso');
        fetchTrucks();
      } catch (error) {
        toast.error('Falha ao excluir caminhão');
      }
    }
  };

  const handleEdit = (truck: Truck) => {
    setEditingTruck(truck);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Caminhões</h1>
        <button
          onClick={() => {
            setEditingTruck(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar caminhão</span>
        </button>
      </div>

      {showForm && (
        <TruckForm
          truck={editingTruck}
          onClose={() => {
            setShowForm(false);
            setEditingTruck(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingTruck(null);
            fetchTrucks();
          }}
        />
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fabricante</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de chassi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade de carga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trucks.map((truck) => (
              <tr key={truck.id}>
                <td className="px-6 py-4 whitespace-nowrap">{truck.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.placa}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.modelo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.cor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.fabricante}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.numeroChassis}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.capacidadeCarga}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(truck)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(truck.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Trucks;