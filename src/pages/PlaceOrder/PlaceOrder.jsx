import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Calculate cart subtotal
  const getCartTotal = () => {
    let total = 0;

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });

    return total;
  };

  // Place order and redirect to payment
  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (getCartTotal() === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getCartTotal() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        alert(response.data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Server error. Please try again.");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getCartTotal === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              type="text"
              placeholder="First Name"
              required
            />

            <input
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email"
            required
          />

          <input
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Street"
            required
          />

          <div className="multi-fields">
            <input
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
              required
            />

            <input
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
              required
            />
          </div>

          <div className="multi-fields">
            <input
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              type="text"
              placeholder="Zip Code"
              required
            />

            <input
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              required
            />
          </div>

          <input
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            type="tel"
            placeholder="Phone"
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getCartTotal()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getCartTotal() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${getCartTotal() === 0 ? 0 : getCartTotal() + 2}</b>
            </div>

            <button
              type="submit"
              disabled={getCartTotal() === 0}
              className="payment-btn"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
