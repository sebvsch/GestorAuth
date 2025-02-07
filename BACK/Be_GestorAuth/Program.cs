using Microsoft.EntityFrameworkCore;
using Be_GestorAuth.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Be_GestorAuth.Custom;
using Be_GestorAuth.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
                       ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<GAContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddSingleton<Utilidades>();

var jwtKey = Environment.GetEnvironmentVariable("Jwt__Key")
             ?? builder.Configuration["Jwt:Key"];
var issuer = Environment.GetEnvironmentVariable("Jwt__Issuer")
             ?? builder.Configuration["Jwt:Issuer"];
var audience = Environment.GetEnvironmentVariable("Jwt__Audience")
               ?? builder.Configuration["Jwt:Audience"];

Console.WriteLine($"Jwt Key: {jwtKey}");
Console.WriteLine($"Jwt Issuer: {issuer}");
Console.WriteLine($"Jwt Audience: {audience}");


builder.Services.AddAuthentication(config =>
{
    config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(config =>
{
    config.RequireHttpsMetadata = false;
    config.SaveToken = true;
    config.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidIssuer = issuer,
        ValidAudience = audience,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("TipoUsuario", policy => policy.RequireClaim("TipoUsuario", "Administrador"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.WithOrigins("http://localhost:5173")
           .AllowAnyHeader()
           .AllowAnyMethod()
           .AllowCredentials();
    });
});

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(int.Parse(port));
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tu API v1");
    c.RoutePrefix = string.Empty;
});

app.UseCors("NuevaPolitica");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();