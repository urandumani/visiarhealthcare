using Microsoft.EntityFrameworkCore;
using VisiarHealthcare.Data;
using VisiarHealthcare.DTOs;
using VisiarHealthcare.Entities;

namespace VisiarHealthcare.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

[Route("api/auth")]
[ApiController]
public class AuthenticationController(ApplicationDbContext context, IConfiguration configuration) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(PatientRegisterDto dto)
    {
        var existingPatient = await context.Patients.FirstOrDefaultAsync(p => p.Email == dto.Email);
        if (existingPatient != null)
        {
            return BadRequest("Patient already exists");
        }
        
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var patient = new Patient
        {
            Name = dto.Name,
            Email = dto.Email,
            Password = passwordHash
        };

        context.Patients.Add(patient);
        await context.SaveChangesAsync();

        return Ok(new AuthResponseDto { Email = patient.Email });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(PatientLoginDto model)
    {
        var patient = await context.Patients.SingleOrDefaultAsync(p => p.Email == model.Email);

        if (patient == null || !BCrypt.Net.BCrypt.Verify(model.Password, patient.Password))
        {
            return Unauthorized("Invalid credentials");
        }

        var token = GenerateJwtToken(patient);
        return Ok(new AuthResponseDto { Email = patient.Email, Token = token });
    }
    
    private string GenerateJwtToken(Patient patient)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(ClaimTypes.NameIdentifier, patient.Id.ToString()),
                new Claim(ClaimTypes.Email, patient.Email)
            ]),
            Expires = DateTime.UtcNow.AddDays(10),
            Issuer = configuration["Jwt:Issuer"],
            Audience = configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
