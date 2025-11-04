using Microsoft.AspNetCore.Authorization;
using VisiarHealthcare.Data;
using VisiarHealthcare.Entities;

namespace VisiarHealthcare.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class DoctorsController(ApplicationDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
    {
        return await context.Doctors.ToListAsync();
    }
}
