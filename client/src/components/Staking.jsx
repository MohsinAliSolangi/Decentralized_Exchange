import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { ethers } from "ethers";
import Staking_image from "../assets/images/Staking.png";
import tokenCreation from "../contractsData/tokenCreation.json";

export const Staking = ({ dex, account }) => {
  const [Token, settoken] = useState(null);
  const [amount, setamount] = useState(null);
  const [endTime, setendTime] = useState(null);

  const staking = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const dextoken = await dex.tokens(Token);

    const Tokens = new ethers.Contract(dextoken, tokenCreation.abi, signer);

    await (await Tokens.approve(dex.address, amount)).wait();
    await dex.Staking(Token, amount, endTime);
    settoken("");
    setamount("");
    setendTime("");
    alert("congrates your tokens has been staked");
    window.location.reload();
  };

  return (
    <div className="staking-token-card">
      {/* Left Side: Image + Label */}
      <div className="staking-token-image-wrapper">
        <img
          src={Staking_image}
          alt="Staking Illustration"
          className="staking-token-image"
        />
        <span className="staking-token-label">Staking</span>
      </div>

      <div className="staking-token-form-wrapper">
        <Form>
          <div className="form-group">
            <input
              type="number"
              required
              step="any"
              className="form-control custom-input"
              placeholder="Enter token number"
              onChange={(e) => settoken(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              required
              step="any"
              className="form-control custom-input"
              placeholder="Enter token staking amount"
              onChange={(e) => setamount(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="number"
              required
              step="any"
              className="form-control custom-input"
              placeholder="Enter Time for Staking"
              onChange={(e) => setendTime(e.target.value)}
            />
          </div>

          <button type="button" onClick={staking} className="black-button">
            Staking
          </button>
        </Form>
      </div>
    </div>
  );
};
