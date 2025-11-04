using VisiarHealthcare.Data;

namespace VisiarHealthcare.Extensions;

using Microsoft.EntityFrameworkCore;

public static class MigrationManager
{
    public static WebApplication MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        try {
            Console.WriteLine("Applying migrations...");
            dbContext.Database.Migrate();
            Console.WriteLine("Migrations applied successfully.");
        }
        catch (Exception ex) {
            Console.WriteLine($"An error occurred while migrating the database: {ex.Message}");
        }

        return app;
    }
}
