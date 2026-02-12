using Electra.Domain.Entities;
using Electra.Domain.Interfaces;
using Electra.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Electra.Infrastructure.Repositories;

public class AppointmentRepository : IAppointmentRepository
{
    private readonly AppDbContext _context;

    public AppointmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Appointment appointment)
    {
        await _context.Appointments.AddAsync(appointment);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Appointment>> GetAllAsync()
    {
        return await _context.Appointments
            .Include(a => a.Customer)
            .ToListAsync();
    }

    public async Task<bool> ExistsAsync(DateTime date, string schedule)
    {
        return await _context.Appointments
            .AnyAsync(a => a.Date.Date == date.Date && a.Schedule == schedule);
    }
}