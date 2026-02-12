import { useEffect, useState } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5150/api/customers");
      if (!response.ok) throw new Error("Error al obtener clientes");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.nic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-container">
        <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Escriba el NIC para filtrar resultados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px' }} 
          />
          <span style={{ position: 'absolute', left: '15px', top: '12px' }}>🔍</span>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>NIC</th>
              <th>Nombre Completo</th>
              <th>Citas</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.nic}</strong></td>
                  <td>{c.name}</td>
                  <td>
                    <span className="status scheduled">
                      {c.appointments?.length || 0} registradas
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;