namespace BeneficiariosApi.Models
{
    public class Beneficiario
    {
        public int Id { get; set; }
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public int DocumentoIdentidadId { get; set; }
        public string NumeroDocumento { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public string Sexo { get; set; } = null!;

        public String? TipoDocumento { get; set; } = null!;
    }
}
