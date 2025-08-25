import { useState } from "react";
import axios from "axios";

export function usePaymentViewModel() {
  const [form, setForm] = useState({
    user: "",// user id? like 2233259?
    amount: "",
    paymentMethod: "",
    transactionId:"",
    remarks:"Membership fee payment"
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setForm((prev) => ({ ...prev, [id]: value }));
  // };

  const handleSubmit = async (paymentData) => {
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/v2/payments", paymentData);
      setResponseMessage("Payment successful!");
      console.log("API response:", response.data);
      localStorage.setItem('transactionId', response.data._id);
    } catch (error) {
      setResponseMessage("Error payment");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    responseMessage,
    // handleChange,
    handleSubmit,
  };
}
