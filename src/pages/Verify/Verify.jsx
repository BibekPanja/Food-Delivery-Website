import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log("Success:", success);
      console.log("Order ID:", orderId);

      const response = await axios.post(`${url}/api/order/verify`, {
        success: success,
        orderId: orderId,
      });

      console.log("Verify Response:", response.data);

      if (response.data.success) {
        // Payment successful
        navigate("/myorders");
      } else {
        // Payment failed
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification error:", error);

      navigate("/");
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
