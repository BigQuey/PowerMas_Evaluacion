using BeneficiariosApi.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
namespace BeneficiariosApi.Repository
{
    public class BeneficiarioRepository
    {
        private readonly string _connectionString;

        public BeneficiarioRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Connection");
        }
        
        // Listar Documentos (usado para el dropdown)
        public async Task<IEnumerable<DocumentoIdentidad>> ObtenerDocumentos()
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryAsync<DocumentoIdentidad>(
                "sp_ListarDocumentos",
                commandType: CommandType.StoredProcedure
            );
        }

        // Listar Beneficiarios
        public async Task<IEnumerable<Beneficiario>> ObtenerTodos()
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryAsync<Beneficiario>(
                "sp_ListarBeneficiarios",
                commandType: CommandType.StoredProcedure
            );
        }

        // Crear Beneficiario
        public async Task Crear(Beneficiario beneficiario)
        {
            using var connection = new SqlConnection(_connectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@Nombres", beneficiario.Nombres);
            parameters.Add("@Apellidos", beneficiario.Apellidos);
            parameters.Add("@DocumentoIdentidadId", beneficiario.DocumentoIdentidadId);
            parameters.Add("@NumeroDocumento", beneficiario.NumeroDocumento);
            parameters.Add("@FechaNacimiento", beneficiario.FechaNacimiento);
            parameters.Add("@Sexo", beneficiario.Sexo);

            await connection.ExecuteAsync(
                "sp_RegistrarBeneficiario",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }
        // Editar Beneficiario 
        public async Task Actualizar(Beneficiario beneficiario)
        {
            using var connection = new SqlConnection(_connectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@Id", beneficiario.Id);
            parameters.Add("@Nombres", beneficiario.Nombres);
            parameters.Add("@Apellidos", beneficiario.Apellidos);
            parameters.Add("@DocumentoIdentidadId", beneficiario.DocumentoIdentidadId);
            parameters.Add("@NumeroDocumento", beneficiario.NumeroDocumento);
            parameters.Add("@FechaNacimiento", beneficiario.FechaNacimiento);
            parameters.Add("@Sexo", beneficiario.Sexo);

            await connection.ExecuteAsync("sp_ActualizarBeneficiario", parameters, commandType: CommandType.StoredProcedure);
        }


        // Eliminar Beneficiario
        public async Task Eliminar(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@Id", id);

            await connection.ExecuteAsync(
                "sp_EliminarBeneficiario",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
