import axios from 'axios';
import type { Beneficiario, DocumentoIdentidad } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5153/api'; 


// Listar documentos
export const getDocumentos = async (): Promise<DocumentoIdentidad[]> => {
  const response = await axios.get(`${API_URL}/Beneficiario/Documentos`);
  return response.data;
};

// crear beneficiario
export const createBeneficiario = async (data: Beneficiario) => {
  const response = await axios.post(`${API_URL}/Beneficiario`, data);
  return response.data;
};

// listar beneficiarios
export const getBeneficiarios = async (): Promise<Beneficiario[]> => {
  const response = await axios.get(`${API_URL}/Beneficiario`);
  return response.data;
};

// actualizar beneficiario
export const updateBeneficiario = async (id: number, data: Beneficiario) => {
  const response = await axios.put(`${API_URL}/Beneficiario/${id}`, data);
  return response.data;
};

// eliminar beneficiario
export const deleteBeneficiario = async (id: number) => {
  await axios.delete(`${API_URL}/Beneficiario/${id}`);
};