import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import tokenCreation from "../contractsData/tokenCreation.json";
import { ethers } from "ethers";

export const AddToken = ({ dex, account }) => {
  const [token, settoken] = useState(null);

  const addCustomToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Tokens = new ethers.Contract(token, tokenCreation.abi, signer);
    let supply = await Tokens.totalSupply();
    await Tokens.approve(dex.address, supply);
    await dex.addCustomToken(token);
  };

  return (
    <div className="add-token-card">
      <h4 className="add-token-title">Add Custom Token</h4>
      <div>
        <Form>
          <div style={{ margin: "0 auto" }}>
            <input
              type="address"
              required
              step="any"
              className="form-control custom-input"
              placeholder="Enter token Address"
              onChange={(e) => settoken(e.target.value)}
            />
          </div>
        </Form>
      </div>
      <div className="btn-wrapper" style={{ marginTop: "10px" }}>
        <button type="button" onClick={addCustomToken} className="black-button">
          Add Tokens
        </button>
      </div>
    </div>
  );
};
