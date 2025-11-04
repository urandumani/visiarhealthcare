using System.ComponentModel.DataAnnotations;

namespace VisiarHealthcare.DTOs;

public class PatientRegisterDto
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}