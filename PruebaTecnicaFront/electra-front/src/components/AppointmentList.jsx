import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Historial de Citas</h2>
        <button onClick={loadAppointments} style={{ width: 'auto', padding: '8px 16px' }}>
          🔄 Actualizar
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>NIC</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <tr key={a.id}>
                  <td><strong>{a.nic}</strong></td>
                  <td>{a.date.split("T")[0]}</td>
                  <td>{a.schedule}</td>
                  <td>
                    <span className={`status ${a.status.toLowerCase()}`}>
                      {a.status === "Scheduled" ? "Programada" : a.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No hay citas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentList;