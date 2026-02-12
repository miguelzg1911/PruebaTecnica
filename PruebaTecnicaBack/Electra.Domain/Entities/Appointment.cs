namespace Electra.Domain.Entities;

public class Appointment
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Schedule { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;

    public int CustomerId { get; set; }
    public Customer? Customer { get; set; }
}