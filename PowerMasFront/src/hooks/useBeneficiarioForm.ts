import { useState, useEffect, useMemo } from "react";
import { AxiosError } from "axios";
import type { Beneficiario, DocumentoIdentidad } from "../types/types";
import { createBeneficiario, updateBeneficiario } from "../services/api";

interface ErrorResponse {
  message: string;
}
// Estado inicial
const INITIAL_STATE: Beneficiario = {
  nombres: "",
  apellidos: "",
  documentoIdentidadId: 0,
  numeroDocumento: "",
  fechaNacimiento: "",
  sexo: "",
};

export const useBeneficiarioForm = (
  documentos: DocumentoIdentidad[],
  beneficiarioAEditar: Beneficiario | null,
  onSuccess: () => void,
) => {

  const [formData, setFormData] = useState<Beneficiario>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [lastBeneficiarioId, setLastBeneficiarioId] = useState<
    number | undefined
  >(undefined);

  // eslint-disable react-hooks/exhaustive-deps
  useEffect(() => {
    const currentId = beneficiarioAEditar?.id;
    if (currentId !== lastBeneficiarioId) {
      if (beneficiarioAEditar) {
        setFormData({
          ...beneficiarioAEditar,
          fechaNacimiento: beneficiarioAEditar.fechaNacimiento
            ? beneficiarioAEditar.fechaNacimiento.split("T")[0]
            : "",
        });
        setErrors({});
      } else {
        setFormData(INITIAL_STATE);
        setErrors({});
      }
      setLastBeneficiarioId(currentId);
    }
  }, [beneficiarioAEditar, lastBeneficiarioId]);

  const selectedDoc = useMemo(() => {
    return documentos.find(
      (d) => d.id === Number(formData.documentoIdentidadId),
    );
  }, [formData.documentoIdentidadId, documentos]);

  // Cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const finalValue = name === "documentoIdentidadId" ? Number(value) : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validaciones
  const validar = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validacion de nombres y apellidos
    if (!formData.nombres.trim()) newErrors.nombres = "Nombre requerido";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Apellido requerido";

    // Validacion de documento
    if (!selectedDoc) {
      newErrors.documentoIdentidadId = "Seleccione documento";
    } else {
      if (formData.numeroDocumento.length !== selectedDoc.longitud) {
        newErrors.numeroDocumento = `Debe tener ${selectedDoc.longitud} caracteres`;
      }
      if (selectedDoc.soloNumeros && !/^\d+$/.test(formData.numeroDocumento)) {
        newErrors.numeroDocumento = "Solo números";
      }
    }
    // Validacion para el campo sexo
    if (!formData.sexo) {
        newErrors.sexo = 'Seleccione el sexo';
    }


   if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida.';
    } else {
      const fechaNac = new Date(formData.fechaNacimiento);
      const hoy = new Date();
      
      // Eliminar la hora para comparar solo fechas puras
      hoy.setHours(0, 0, 0, 0);

      // validacion de fecha futura 
      if (fechaNac > hoy) {
        newErrors.fechaNacimiento = 'La fecha no puede ser futura.';
      }
      
      // Validación de coherencia de edad
      const fechaMinima = new Date();
      fechaMinima.setFullYear(hoy.getFullYear() - 120);
      if (fechaNac < fechaMinima) {
        newErrors.fechaNacimiento = 'Fecha inválida (demasiado antigua).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT del formulario
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    // Validaciones
    if (!validar()) return;

    try {
      // Condicional para editar o crear
      if (beneficiarioAEditar?.id) {
        await updateBeneficiario(beneficiarioAEditar.id, formData);
      } else {
        await createBeneficiario(formData);
        setFormData(INITIAL_STATE);
      }
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data as ErrorResponse;
        if (error.response?.status === 409) {
          setGeneralError(data?.message || "El documento ya existe");
        } else {
          setGeneralError("Error de servidor");
        }
      } else {
        setGeneralError("Error desconocido");
      }
    }
  };

  return { formData, handleChange, submit, errors, generalError, selectedDoc };
};
