namespace VisiarHealthcare.Entities;

public class Appointment
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;
}