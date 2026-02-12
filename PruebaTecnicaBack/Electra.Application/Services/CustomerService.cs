using Electra.Application.DTOs.Customer;
using Electra.Application.Interfaces;
using Electra.Domain.Entities;
using Electra.Domain.Interfaces;

namespace Electra.Application.Services;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repository;

    public CustomerService(ICustomerRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Customer>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Customer> CreateAsync(CreateCustomerDto dto)
    {
        var existing = await _repository.GetByNicAsync(dto.Nic);

        if (existing != null)
            throw new Exception("El cliente ya existe");

        var customer = new Customer
        {
            Nic = dto.Nic,
            Name = dto.Name
        };

        await _repository.AddAsync(customer);

        return customer;
    }
    
    public async Task<Customer?> GetByNicAsync(string nic)
    {
        return await _repository.GetByNicAsync(nic);
    }
}