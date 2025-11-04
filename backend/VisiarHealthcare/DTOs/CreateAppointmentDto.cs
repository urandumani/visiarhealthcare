namespace VisiarHealthcare.DTOs;

using System.ComponentModel.DataAnnotations;
using System;

public class CreateAppointmentDto
{
    [Required]
    public int DoctorId { get; set; }

    [Required]
    public DateOnly Date { get; set; }
}
