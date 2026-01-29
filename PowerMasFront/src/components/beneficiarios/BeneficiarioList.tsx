import { useEffect, useState } from 'react';
import { getBeneficiarios, deleteBeneficiario } from '../../services/api';
import type { Beneficiario } from '../../types/types';


interface Props {
  onEdit: (beneficiario: Beneficiario) => void;
}

export const BeneficiarioList = ({ onEdit }: Props) => {
    
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);

  // CARGAR DATOS
  const cargarDatos = async () => {
    try {
      const data = await getBeneficiarios();
      setBeneficiarios(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error cargando lista", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await cargarDatos();
    };
    fetchData();
  }, []);

  const handleEliminar = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este beneficiario?')) {
      try {
        await deleteBeneficiario(id);
        cargarDatos(); 
      } catch {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Listado</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Documento</th>
                    <th className="px-4 py-2 text-left">Sexo</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {beneficiarios.map(b => (
                    <tr key={b.id} className="border-b">
                        <td className="px-4 py-2">{b.nombres} {b.apellidos}</td>
                        <td className="px-4 py-2">{b.tipoDocumento}: {b.numeroDocumento}</td>
                        <td className="px-4 py-2">{b.sexo}</td>
                        <td className="px-4 py-2 flex gap-2">
                            <button 
                                onClick={() => onEdit(b)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => handleEliminar(b.id!)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};