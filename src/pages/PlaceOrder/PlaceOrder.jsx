import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  return (
    <div>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>

          <input type="email" placeholder="Email" required />

          <input type="text" placeholder="Street" required />

          <div className="multi-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
          </div>

          <div className="multi-fields">
            <input type="text" placeholder="Zip Code" required />
            <input type="text" placeholder="Country" required />
          </div>

          <input type="tel" placeholder="Phone" required />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p></p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p></p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b></b>
            </div>

            <button>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
