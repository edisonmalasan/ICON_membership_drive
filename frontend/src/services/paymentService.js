import api from "../api/axios";

export const getPayments = async (filter = {}) => {
  const res = await api.get("/payments", { params: { filter } });
  return res.data;
};

export const getPaymentById = async (id) => {
  const res = await api.get(`/payments/${id}`);
  return res.data;
};

export const updatePaymentStatus = async (id, status) => {
  const res = await api.put(`/payments/${id}`, { status });
  return res.data;
};


