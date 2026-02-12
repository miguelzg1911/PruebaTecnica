using Electra.Domain.Entities;

namespace Electra.Domain.Interfaces;

public interface IAppointmentRepository
{
    Task AddAsync(Appointment appointment);
    Task<List<Appointment>> GetAllAsync();
    Task<bool> ExistsAsync(DateTime date, string schedule);

}