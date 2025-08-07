import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";

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
      <h4 className="buy-token-title">Buy Token</h4>
      <div>
        <Form>
          <div style={{ margin: "0 auto" }}>
            <div>
              <input
                type="number"
                required
                step="any"
                className="form-control custom-input"
                placeholder="Enter token Number"
                onChange={(e) => settoken(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="number"
                required
                step="any"
                className="form-control custom-input"
                placeholder="Enter amount"
                onChange={(e) => setamount(e.target.value)}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="btn-wrapper" style={{ marginTop: "10px" }}>
        <button type="button" onClick={buyToken} className="black-button">
          Buy Token
        </button>
      </div>
    </div>
  );
};
