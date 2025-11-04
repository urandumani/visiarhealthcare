namespace VisiarHealthcare.DTOs;

public class AppointmentDto
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public int DoctorId { get; set; }
    public string DoctorName { get; set; }
}