import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import tokenCreation from "../contractsData/tokenCreation.json";
import { ethers } from "ethers";
import Add__Token from "../assets/images/Add_Token.png";

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
      <div className="add-token-image-wrapper">
        <img
          src={Add__Token}
          alt="Token Illustration"
          className="add-token-image"
        />
      </div>

      <div className="add-token-form-wrapper">
        <Form>
          <div className="form-group">
            <input
              type="address"
              required
              step="any"
              className="form-control"
              placeholder="Enter token Address"
              onChange={(e) => settoken(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={addCustomToken}
            className="black-button"
          >
            Add Tokens
          </button>
        </Form>
      </div>
    </div>
  );
};
