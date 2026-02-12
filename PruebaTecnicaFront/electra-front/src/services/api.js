const BASE_URL = "http://localhost:5150/api";

export const createCustomer = async (data) => {
  const response = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Error creating customer");
  return await response.json();
};

export const createAppointment = async (data) => {
  const response = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Error creating appointment");
  return await response.json();
};

export const getAppointments = async () => {
  const response = await fetch(`${BASE_URL}/appointments`);
  if (!response.ok) throw new Error("Error fetching appointments");
  return await response.json();
};

export const getCustomerByNic = async (nic) => {
  const response = await fetch(`${BASE_URL}/customers/${nic}`);
  if (!response.ok) throw new Error("Cliente no encontrado");
  return await response.json();
};
