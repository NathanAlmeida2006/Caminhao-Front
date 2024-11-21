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
      toast.error('Failed to fetch trucks');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this truck?')) {
      try {
        await axios.delete(`http://localhost:8080/api/caminhoes/${id}`);
        toast.success('Truck deleted successfully');
        fetchTrucks();
      } catch (error) {
        toast.error('Failed to delete truck');
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
        <h1 className="text-3xl font-bold text-gray-900">Trucks</h1>
        <button
          onClick={() => {
            setEditingTruck(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Truck</span>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trucks.map((truck) => (
              <tr key={truck.id}>
                <td className="px-6 py-4 whitespace-nowrap">{truck.placa}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.modelo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.cor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{truck.fabricante}</td>
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