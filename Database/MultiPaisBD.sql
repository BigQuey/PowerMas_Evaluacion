CREATE  DATABASE  MultiPais;
GO
use MultiPais;
GO

CREATE TABLE DocumentoIdentidad (
Id INT PRIMARY KEY IDENTITY(1,1),
Nombre VARCHAR(50) NOT NULL,
Abreviatura VARCHAR(10) NOT NULL,
Pais VARCHAR(50) NOT NULL,
Longitud INT NOT NULL,
SoloNumeros BIT NOT NULL,
Activo BIT NOT NULL
);
GO

CREATE TABLE Beneficiario (
Id INT PRIMARY KEY IDENTITY(1,1),
Nombres VARCHAR(100) NOT NULL,
Apellidos VARCHAR(100) NOT NULL,
DocumentoIdentidadId INT NOT NULL,
NumeroDocumento VARCHAR(20) NOT NULL,
FechaNacimiento DATE NOT NULL,
Sexo CHAR(1) NOT NULL,
CONSTRAINT FK_Beneficiario_Documento
	FOREIGN KEY (DocumentoIdentidadId) 
	REFERENCES DocumentoIdentidad(Id)
);
GO

--- PROCEDIMIENTOS ALMACENADOS

-- LISTAR DOCUMENTOS ACTIVOS
CREATE PROCEDURE sp_ListarDocumentosActivos
AS
BEGIN
    SELECT Id, Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo
    FROM DocumentoIdentidad
    WHERE Activo = 1
END
GO


-- LISTAR DOCUMENTOS

CREATE PROCEDURE sp_ListarDocumentos
AS
BEGIN
    SELECT * FROM DocumentoIdentidad WHERE Activo = 1;
END;
GO


-- LISTAR BENEFICIARIOS
CREATE PROCEDURE sp_ListarBeneficiarios
AS
BEGIN
    SELECT b.*, d.Abreviatura as TipoDocumento 
    FROM Beneficiario b
    INNER JOIN DocumentoIdentidad d ON b.DocumentoIdentidadId = d.Id;
END;
GO


-- CREAR BENEFICIARIO
CREATE PROCEDURE sp_RegistrarBeneficiario
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM Beneficiario WHERE DocumentoIdentidadId = @DocumentoIdentidadId AND NumeroDocumento = @NumeroDocumento)
    BEGIN
        ;THROW 50001, 'El número de documento ya existe para este tipo de documento.', 1;
    END


    INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
    VALUES (@Nombres, @Apellidos, @DocumentoIdentidadId, @NumeroDocumento, @FechaNacimiento, @Sexo);
END;
GO

-- ACTUALIZAR BENEFICIARIO
CREATE PROCEDURE sp_ActualizarBeneficiario
    @Id INT,
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    UPDATE Beneficiario
    SET Nombres = @Nombres,
        Apellidos = @Apellidos,
        DocumentoIdentidadId = @DocumentoIdentidadId,
        NumeroDocumento = @NumeroDocumento,
        FechaNacimiento = @FechaNacimiento,
        Sexo = @Sexo
    WHERE Id = @Id;
END;
GO


-- ELIMINAR BENEFICIARIO
CREATE PROCEDURE sp_EliminarBeneficiario
    @Id INT
AS
BEGIN
    DELETE FROM Beneficiario WHERE Id = @Id;
END;
GO