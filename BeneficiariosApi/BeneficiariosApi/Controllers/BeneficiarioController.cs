using BeneficiariosApi.Models;
using BeneficiariosApi.Repository;
using Microsoft.AspNetCore.Mvc;


namespace BeneficiariosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiarioController : ControllerBase
    {
        private readonly BeneficiarioRepository _repository;

        public BeneficiarioController(BeneficiarioRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Beneficiario/Documentos
        [HttpGet("Documentos")]
        public async Task<IActionResult> GetDocumentos()
        {
            var documentos = await _repository.ObtenerDocumentos();
            return Ok(documentos);
        }

        // GET: api/Beneficiario
        [HttpGet]
        public async Task<IActionResult> GetBeneficiarios()
        {
            var lista = await _repository.ObtenerTodos();
            return Ok(lista);
        }

        // POST: api/Beneficiario
        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Beneficiario beneficiario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _repository.Crear(beneficiario);
                return Ok(new { message = "Beneficiario registrado correctamente" });
            }
            catch (Microsoft.Data.SqlClient.SqlException ex) when (ex.Number == 50001)
            {
                return Conflict(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, "Error interno del servidor");
            }
        }

        // UPDATE: api/Beneficiario/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, [FromBody] Beneficiario beneficiario)
        {
            if (id != beneficiario.Id)
                return BadRequest("El ID de la URL no coincide con el del cuerpo");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repository.Actualizar(beneficiario);
            return Ok(new { message = "Beneficiario actualizado correctamente" });
        }

        // DELETE: api/Beneficiario/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            await _repository.Eliminar(id);
            return Ok(new { message = "Beneficiario eliminado correctamente" });
        }
    }
}
