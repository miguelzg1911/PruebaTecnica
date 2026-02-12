using Electra.Domain.Entities;

namespace Electra.Domain.Interfaces;

public interface ICustomerRepository
{
    Task<IEnumerable<Customer>> GetAllAsync();
    Task<Customer?> GetByNicAsync(string nic);
    Task AddAsync(Customer customer);
}