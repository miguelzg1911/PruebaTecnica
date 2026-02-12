using Electra.Application.DTOs.Customer;
using Electra.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Electra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _service;

    public CustomersController(ICustomerService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _service.GetAllAsync();
        return Ok(customers);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCustomerDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return Ok(result);
    }
    
    [HttpGet("{nic}")]
    public async Task<IActionResult> GetByNic(string nic)
    {
        var customer = await _service.GetByNicAsync(nic);
        if (customer == null) return NotFound(new { message = "Cliente no encontrado" });
        return Ok(customer);
    }
}