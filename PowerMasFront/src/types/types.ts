
export interface DocumentoIdentidad {
  id: number;
  nombre: string;
  abreviatura: string;
  pais: string;
  longitud: number;
  soloNumeros: boolean;
  activo: boolean;
}

export interface Beneficiario {
  id?: number;
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: string;
  tipoDocumento?: string;
}