import React, { useState } from "react";
import { ethers } from "ethers";
import { Form, Row } from "react-bootstrap";
import tokenCreation from "../contractsData/tokenCreation.json";

export const SwapeToken = ({ dex, account }) => {
  const [token, settoken] = useState(null);
  const [addr, setaddr] = useState(null);
  const [amount, setAmount] = useState(null);

  const swapeTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Tokens = new ethers.Contract(addr, tokenCreation.abi, signer);
    await Tokens.approve(dex.address, amount);
    await dex.swapeToken(token, addr, amount);
    settoken("");
    setaddr("");
    setAmount("");
    alert("congrates you swape the Tokins");
    window.location.reload();
  };

  function show(val) {
    console.log("TOkenssssssss", val);
  }

  return (
    <div className="display-board">
      <h4>Swape Token</h4>

      <div>
        <Form>
          <Row>
            <div style={{ margin: "0 auto" }}>
              <div>
                <input
                  type="number"
                  required
                  step="any"
                  className="form-control"
                  placeholder="Enter token number"
                  onChange={(e) => settoken(e.target.value)}
                ></input>
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="address"
                  required
                  step="any"
                  className="form-control"
                  placeholder="Enter token address"
                  onChange={(e) => setaddr(e.target.value)}
                ></input>
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  required
                  step="any"
                  className="form-control"
                  placeholder="Enter token amount"
                  onChange={(e) => setAmount(e.target.value)}
                ></input>
              </div>
            </div>
          </Row>
        </Form>
      </div>
      <div className="btn" style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={swapeTokens}
          className="btn btn-primary sButton"
        >
          {" "}
          SwapeToken
        </button>
      </div>
    </div>
  );
};
