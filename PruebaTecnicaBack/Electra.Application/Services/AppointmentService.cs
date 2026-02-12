using Electra.Domain.Entities;
using Electra.Domain.Interfaces;
using Electra.Application.DTOs.Appointment;
using Electra.Application.Interfaces;

namespace Electra.Application.Services;

public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _appointmentRepo;
    private readonly ICustomerRepository _customerRepo;

    public AppointmentService(IAppointmentRepository appointmentRepo, ICustomerRepository customerRepo)
    {
        _appointmentRepo = appointmentRepo;
        _customerRepo = customerRepo;
    }

    public async Task<AppointmentResponseDto> CreateAsync(CreateAppointmentDto dto)
    {
        var customer = await _customerRepo.GetByNicAsync(dto.Nic);

        if (customer == null)
            throw new Exception("Customer not found");

        var exists = await _appointmentRepo.ExistsAsync(dto.Date, dto.Schedule);

        if (exists)
            throw new Exception("Appointment already exists for this date and schedule");
        
        var appointment = new Appointment
        {
            Date = dto.Date,
            Schedule = dto.Schedule,
            Status = "Scheduled",
            CustomerId = customer.Id
        };

        await _appointmentRepo.AddAsync(appointment);

        return new AppointmentResponseDto
        {
            Id = appointment.Id,
            Date = appointment.Date,
            Schedule = appointment.Schedule,
            Status = appointment.Status,
            Nic = customer.Nic
        };
    }

    public async Task<List<AppointmentResponseDto>> GetAllAsync()
    {
        var appointments = await _appointmentRepo.GetAllAsync();

        return appointments.Select(a => new AppointmentResponseDto
        {
            Id = a.Id,
            Date = a.Date,
            Schedule = a.Schedule,
            Status = a.Status,
            Nic = a.Customer?.Nic ?? ""
        }).ToList();
    }
}