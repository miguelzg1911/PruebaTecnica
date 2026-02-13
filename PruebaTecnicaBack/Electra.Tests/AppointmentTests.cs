namespace Electra.Tests;

public class AppointmentTests
{
    [Fact]
    public void ValidarAgendamiento_DatosCompletos_RetornaExito()
    {
        // Arrange
        var nicTest = "10203040";
        var fechaSeleccionada = DateTime.Now.AddDays(2);
        var jornada = "AM";

        // Act 
        bool esValido = !string.IsNullOrEmpty(nicTest) 
                        && fechaSeleccionada > DateTime.Now 
                        && (jornada == "AM" || jornada == "PM");

        // Assert
        Assert.True(esValido, "El agendamiento debería ser válido con datos correctos.");
    }
    
    
    [Fact]
    public void ValidarAgendamiento_SinNIC_RetornaFalso()
    {
        // Arrange
        var nicTest = ""; 
        var fechaSeleccionada = DateTime.Now.AddDays(1);
        var jornada = "PM";

        // Act
        bool esValido = !string.IsNullOrEmpty(nicTest) 
                        && fechaSeleccionada > DateTime.Now 
                        && (jornada == "AM" || jornada == "PM");

        // Assert: Verificamos que el resultado sea falso
        Assert.False(esValido, "El agendamiento no debería ser válido si el NIC está vacío.");
    }
    

    [Fact]
    public void ValidarAgendamiento_FechaPasada_RetornaFalso()
    {
        // Arrange: Preparamos una fecha de hace dos días
        var nicTest = "10203040";
        var fechaPasada = DateTime.Now.AddDays(-2); 
        var jornada = "AM";

        // Act
        bool esValido = !string.IsNullOrEmpty(nicTest) 
                        && fechaPasada > DateTime.Now 
                        && (jornada == "AM" || jornada == "PM");

        // Assert
        Assert.False(esValido, "El agendamiento no debería ser válido para fechas en el pasado.");
    }
}
