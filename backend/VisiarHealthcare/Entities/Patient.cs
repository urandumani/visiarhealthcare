using System.ComponentModel.DataAnnotations;

namespace VisiarHealthcare.Entities;

public class Patient
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}