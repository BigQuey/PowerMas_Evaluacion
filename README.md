# Sistema de Gestión de Beneficiarios - PowerMas

Este proyecto es una solución Full Stack para la gestión de beneficiarios, desarrollada como parte del caso de evaluación técnica

## Tecnologías

* **Frontend:** React + TypeScript + TailwindCSS
* **Backend:** .NET 10 Web API
* **Base de Datos:** SQL Server

## Pre-requisitos

* Node.js (v20+)
* .NET SDK 8.0
* SQL Server (Local o Docker)

## Instrucciones de Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/BigQuey/powermas-evaluacion.git](https://github.com/BigQuey/powermas-evaluacion.git)
    ```

2.  **Base de Datos:**
    * Ejecutar el script ubicado en `/database/script_bd.sql` en SQL Server para crear la BD, tablas y procedimientos almacenados.
    * Asegurar que la cadena de conexión en `backend/appsettings.json` apunte a tu base de datos.

## Instrucciones de Ejecución [cite: 68]

### Backend
```bash
cd backend
dotnet run
# El servidor iniciará en http://localhost:5153