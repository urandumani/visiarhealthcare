using Microsoft.EntityFrameworkCore;
using VisiarHealthcare.Entities;

namespace VisiarHealthcare.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
} 