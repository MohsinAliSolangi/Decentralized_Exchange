import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Buy_Token from "../assets/images/Buy_Token.png";

export const BuyToken = ({ dex, account }) => {
  const [token, settoken] = useState(null);
  const [amount, setamount] = useState(null);

  const buyToken = async () => {
    await dex.BuyToken(token, amount, { value: amount });
    settoken("");
    setamount("");
    alert("congrates you Buy Tokens");
    window.location.reload();
  };
  return (
    <div className="buy-token-card">
      <div className="buy-token-image-wrapper">
        <img
          src={Buy_Token}
          alt="Buy Token Illustration"
          className="buy-token-image"
        />
        <span className="buy-token-label">Buy Token</span>
      </div>

      <div className="buy-token-form-wrapper">
        <Form>
          <div className="form-group">
            <input
              type="number"
              required
              step="any"
              className="form-control custom-input"
              placeholder="Enter token Number"
              onChange={(e) => settoken(e.target.value)}
            />
          </div>

          <div className="form-group"></div>

          <div className="form-group">
            <input
              type="number"
              required
              step="any"
              className="form-control custom-input"
              placeholder="Enter amount"
              onChange={(e) => setamount(e.target.value)}
            />
          </div>

          <button type="button" onClick={buyToken} className="black-button">
            Buy Token
          </button>
        </Form>
      </div>
    </div>
  );
};
