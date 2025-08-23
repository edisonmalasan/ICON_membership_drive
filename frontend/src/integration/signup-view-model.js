import { useState } from "react";
import axios from "axios";

export function useSignupViewModel() {
  const [form, setForm] = useState({
    name: "",
    idNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setForm((prev) => ({ ...prev, [id]: value }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post("https://your-api.com/signup", form);
      setResponseMessage("Account created successfully!");
      console.log("API response:", response.data);
    } catch (error) {
      setResponseMessage("Error creating account");
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
