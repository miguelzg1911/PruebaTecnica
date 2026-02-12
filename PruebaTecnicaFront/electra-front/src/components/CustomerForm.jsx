import { useState } from "react";
import { createCustomer } from "../services/api";

function CustomerForm() {
  const [nic, setNic] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await createCustomer({ nic, name });
      setMessage({ type: "success", text: "Cliente registrado exitosamente en Electra." });
      setNic("");
      setName("");
    } catch (error) {
      setMessage({ type: "error", text: "Error al registrar: El NIC ya podría existir." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className={`message ${message.type}`}>
          {message.type === "success" ? "✅ " : "❌ "}
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="customer-nic">NIC (Número de Identificación del Cliente)</label>
        <input
          id="customer-nic"
          type="text"
          placeholder="Ej: 102938"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customer-name">Nombre Completo</label>
        <input
          id="customer-name"
          type="text"
          placeholder="Ej: Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrar Cliente"}
      </button>
    </form>
  );
}

export default CustomerForm;