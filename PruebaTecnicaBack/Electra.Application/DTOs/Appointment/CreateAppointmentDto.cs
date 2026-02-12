namespace Electra.Application.DTOs.Appointment;

public class CreateAppointmentDto
{
    public string Nic { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Schedule { get; set; } = null!;
}