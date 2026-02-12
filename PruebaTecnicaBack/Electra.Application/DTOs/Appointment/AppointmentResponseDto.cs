namespace Electra.Application.DTOs.Appointment;

public class AppointmentResponseDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Schedule { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Nic { get; set; } = string.Empty;
}