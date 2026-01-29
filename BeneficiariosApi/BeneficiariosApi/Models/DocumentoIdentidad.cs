namespace BeneficiariosApi.Models
{
    public class DocumentoIdentidad
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Abreviatura { get; set; } = null!;
        public string Pais { get; set; } = null!;
        public int Longitud { get; set; }
        public bool SoloNumeros { get; set; }
        public bool Activo { get; set; }
    }
}
