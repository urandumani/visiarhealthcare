using System.ComponentModel.DataAnnotations;

namespace VisiarHealthcare.DTOs;

public class PatientLoginDto
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}