import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

function AppointmentsPage() {
  return (
    <div className="page">
      <h1>Gestión de Citas</h1>

      <div className="card">
        <AppointmentForm />
      </div>

      <div className="card">
        <AppointmentList />
      </div>
    </div>
  );
}

export default AppointmentsPage;
