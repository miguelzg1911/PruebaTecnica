import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

function CustomersPage() {
  return (
    <div className="page">
      <h1>Gestión de Clientes</h1>
      
      <div className="card">
        <h2>Registrar Nuevo Cliente</h2>
        <CustomerForm />
      </div>

      <div className="card">
        <h2>Directorio de Clientes</h2>
        <CustomerList />
      </div>
    </div>
  );
}

export default CustomersPage;