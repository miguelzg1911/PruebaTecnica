import { useState } from "react";
import { createAppointment, getCustomerByNic } from "../services/api";

function AppointmentForm() {
  const [nic, setNic] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [schedule, setSchedule] = useState("AM");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar cliente cuando el usuario termina de escribir el NIC
  const handleBlurNic = async () => {
    if (!nic) {
      setCustomerName("");
      return;
    }
    
    try {
      const customer = await getCustomerByNic(nic);
      setCustomerName(customer.name);
      setMessage(null);
    } catch (error) {
      setCustomerName("");
      setMessage({ type: "error", text: "El NIC ingresado no existe en nuestro sistema." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!customerName) {
      setMessage({ type: "error", text: "Por favor, valide un NIC existente antes de continuar." });
      setLoading(false);
      return;
    }

    try {
      await createAppointment({ nic, date, schedule });
      setMessage({ type: "success", text: "¡Cita agendada con éxito! El técnico ha sido asignado." });
      setNic("");
      setCustomerName("");
      setDate("");
      setSchedule("AM");
    } catch (error) {
      setMessage({ type: "error", text: "No se pudo crear la cita. Verifique si ya existe una para esa fecha." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      {message && (
        <div className={`message ${message.type}`}>
          {message.type === "success" ? "✅ " : "❌ "}
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="nic">NIC del Cliente</label>
        <input
          id="nic"
          type="text"
          placeholder="Ingrese el NIC (ej. 12345)"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          onBlur={handleBlurNic}
          required
        />
        {customerName && (
          <div className="customer-badge">
            <span>👤</span>
            <span>Cliente: <strong>{customerName}</strong></span>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="date">Fecha de Visita</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="schedule">Jornada Preferida</label>
        <select
          id="schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        >
          <option value="AM">Mañana (AM)</option>
          <option value="PM">Tarde (PM)</option>
        </select>
      </div>

      <button type="submit" disabled={loading || !customerName}>
        {loading ? "Procesando..." : "Confirmar Cita Técnica"}
      </button>
    </form>
  );
}

export default AppointmentForm;