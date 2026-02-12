using Electra.Application.DTOs.Appointment;

namespace Electra.Application.Interfaces;

public interface IAppointmentService
{
    Task<AppointmentResponseDto> CreateAsync(CreateAppointmentDto dto);
    Task<List<AppointmentResponseDto>> GetAllAsync();
}