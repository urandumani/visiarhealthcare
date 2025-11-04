using VisiarHealthcare.Data;
using VisiarHealthcare.DTOs;
using VisiarHealthcare.Entities;

namespace VisiarHealthcare.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AppointmentsController(ApplicationDbContext context) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetMyAppointments()
    {
        var patientId = GetPatientId();
    
        // Query the database and immediately project into the DTO shape
        var appointments = await context.Appointments
            .Where(a => a.PatientId == patientId)
            .Include(a => a.Doctor)
            .OrderBy(a => a.Date)
            .Select(a => new AppointmentDto
            {
                Id = a.Id,
                Date = a.Date,
                DoctorId = a.DoctorId,
                DoctorName = a.Doctor.Name
            })
            .ToListAsync();

        return Ok(appointments);
    }

    [HttpPost]
    public async Task<ActionResult<Appointment>> BookAppointment(CreateAppointmentDto bookingRequest)
    {
        var patientId = GetPatientId();

        if (bookingRequest.Date < DateOnly.FromDateTime(DateTime.UtcNow)) 
        {
            return BadRequest("Cannot book an appointment in the past.");
        }

        var conflictExists = await context.Appointments.AnyAsync(a =>
            a.DoctorId == bookingRequest.DoctorId &&
            a.Date == bookingRequest.Date 
        );

        if (conflictExists)
        {
            return Conflict("The selected date is already  booked for this doctor.");
        }

        var appointment = new Appointment
        {
            DoctorId = bookingRequest.DoctorId,
            PatientId = patientId,
            Date = bookingRequest.Date,
        };
        
        context.Appointments.Add(appointment);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMyAppointments), new { id = appointment.Id }, appointment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> CancelAppointment(int id)
    {
        var patientId = GetPatientId();
        var appointment = await context.Appointments.FirstOrDefaultAsync(a => a.Id == id && a.PatientId == patientId);

        if (appointment == null)
        {
            return NotFound("Appointment not found or does not belong to logged-in patient");
        }
        
        context.Appointments.Remove(appointment); 
        await context.SaveChangesAsync();

        return NoContent();
    }
    
    private int GetPatientId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim);
    }
}
