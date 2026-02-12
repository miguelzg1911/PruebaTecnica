using Electra.Application.DTOs.Customer;
using Electra.Domain.Entities;

namespace Electra.Application.Interfaces;

public interface ICustomerService
{
    Task<IEnumerable<Customer>> GetAllAsync();

    Task<Customer> CreateAsync(CreateCustomerDto dto);
    
    Task<Customer?> GetByNicAsync(string nic);
}