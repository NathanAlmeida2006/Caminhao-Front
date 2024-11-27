import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeFormProps {
  employee?: any;
  onClose: () => void;
  onSuccess: () => void;
}

interface EmployeeFormData {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  cargo: string;
  email: string;
  telefone: string;
  dataCadastro: string;
}

const EmployeeForm = ({ employee, onClose, onSuccess }: EmployeeFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
    defaultValues: employee ? {
      ...employee,
      dataNascimento: employee.dataNascimento ? format(new Date(employee.dataNascimento), 'yyyy-MM-dd') : '',
      dataCadastro: employee.dataCadastro ? format(new Date(employee.dataCadastro), 'yyyy-MM-dd') : ''
    } : {
      dataCadastro: format(new Date(), 'yyyy-MM-dd')
    }
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (employee) {
        await axios.put(`http://localhost:8080/api/funcionarios/${employee.id}`, data);
        toast.success('Funcionário atualizado com sucesso');
      } else {
        await axios.post('http://localhost:8080/api/funcionarios', data);
        toast.success('Funcionário criado com sucesso');
      }
      onSuccess();
    } catch (error) {
      toast.error('Falha ao salvar funcionário');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{employee ? 'Editar funcionário' : 'Adicionar novo funcionário'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              {...register('nome', { required: 'Nome é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              {...register('cpf', { required: 'CPF é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">RG</label>
            <input
              {...register('rg', { required: 'RG é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.rg && <p className="mt-1 text-sm text-red-600">{errors.rg.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
            <input
              type="date"
              {...register('dataNascimento', { required: 'Data de nascimento é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.dataNascimento && <p className="mt-1 text-sm text-red-600">{errors.dataNascimento.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <input
              {...register('cargo', { required: 'Cargo é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.cargo && <p className="mt-1 text-sm text-red-600">{errors.cargo.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              {...register('telefone', { required: 'Celular é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.telefone && <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>}
          </div>

          <input type="hidden" {...register('dataCadastro')} />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {employee ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;