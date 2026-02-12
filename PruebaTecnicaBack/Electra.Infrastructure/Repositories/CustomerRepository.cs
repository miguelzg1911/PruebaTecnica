using Electra.Domain.Entities;
using Electra.Domain.Interfaces;
using Electra.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Electra.Infrastructure.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly AppDbContext _context;

    public CustomerRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Customer>> GetAllAsync()
    {
        return await _context.Customers
            .Include(c => c.Appointments)
            .ToListAsync();
    }

    public async Task<Customer?> GetByNicAsync(string nic)
    {
        return await _context.Customers
            .FirstOrDefaultAsync(c => c.Nic == nic);
    }

    public async Task AddAsync(Customer customer)
    {
        await _context.Customers.AddAsync(customer);
        await _context.SaveChangesAsync();
    }
}