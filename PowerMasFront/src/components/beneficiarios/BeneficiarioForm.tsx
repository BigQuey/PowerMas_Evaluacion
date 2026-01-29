import { useState, useEffect } from 'react';
import type { DocumentoIdentidad, Beneficiario } from '../../types/types'; // Ajusta la ruta ../../types si moviste carpetas
import { useBeneficiarioForm } from '../../hooks/useBeneficiarioForm';
import { getDocumentos } from '../../services/api';
import { InputGroup } from '../ui/InputGroup';
import { SelectGroup } from '../ui/SelectGroup';


interface Props {
  onSuccess: () => void;
  beneficiarioAEditar: Beneficiario | null;
  onCancel: () => void;
}

export const BeneficiarioForm = ({ onSuccess, beneficiarioAEditar, onCancel }: Props) => {
  const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);

  useEffect(() => {
    getDocumentos().then(setDocumentos);
  }, []);

  // Usamos nuestro Hook personalizado
  const { formData, handleChange, submit, errors, generalError, selectedDoc } = 
    useBeneficiarioForm(documentos, beneficiarioAEditar, onSuccess);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {beneficiarioAEditar ? 'Editar Beneficiario' : 'Nuevo Beneficiario'}
      </h2>

      {generalError && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded border border-red-200">
          {generalError}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputGroup 
            label="Nombres" name="nombres" 
            value={formData.nombres} onChange={handleChange} error={errors.nombres} 
          />
          <InputGroup 
            label="Apellidos" name="apellidos" 
            value={formData.apellidos} onChange={handleChange} error={errors.apellidos} 
          />
        </div>

        <SelectGroup
          label="Tipo de Documento"
          name="documentoIdentidadId"
          value={formData.documentoIdentidadId}
          onChange={handleChange}
          error={errors.documentoIdentidadId}
          options={documentos.map(d => ({ id: d.id, label: `${d.abreviatura} - ${d.nombre}` }))}
        />

        <InputGroup
          label={`Número ${selectedDoc ? `(${selectedDoc.longitud} car.)` : ''}`}
          name="numeroDocumento"
          value={formData.numeroDocumento}
          onChange={handleChange}
          error={errors.numeroDocumento}
          disabled={!selectedDoc}
          maxLength={selectedDoc?.longitud}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputGroup 
            label="Fecha Nacimiento" name="fechaNacimiento" type="date"
            value={formData.fechaNacimiento} onChange={handleChange} error={errors.fechaNacimiento} 
          />
          <SelectGroup
            label="Sexo" name="sexo" value={formData.sexo} onChange={handleChange}
            options={[{ id: 'M', label: 'Masculino' }, { id: 'F', label: 'Femenino' }]}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold transition-colors">
            {beneficiarioAEditar ? 'Actualizar' : 'Registrar'}
          </button>
          {beneficiarioAEditar && (
            <button type="button" onClick={onCancel} className="px-4 bg-gray-400 text-white rounded hover:bg-gray-500 font-bold transition-colors">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};