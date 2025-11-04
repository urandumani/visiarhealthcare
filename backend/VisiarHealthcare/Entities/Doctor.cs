using System.ComponentModel.DataAnnotations;

namespace VisiarHealthcare.Entities;

public class Doctor
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}