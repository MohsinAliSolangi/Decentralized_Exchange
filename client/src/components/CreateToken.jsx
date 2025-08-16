import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import tokenCreation from "../contractsData/tokenCreation.json";
import { ethers } from "ethers";
import Create_token_image from "../assets/images/Create_Token.png";

export const CreateToken = ({ dex, account }) => {
  const [name, setname] = useState("");
  const [symbol, setsymbol] = useState("");
  const [supply, setsupply] = useState(null);
  const [owner, setowner] = useState(null);

  const CreateToken = async () => {
    let Name = name.toString();
    let Symbol = symbol.toString();
    let Supply = supply.toString();
    let Owner = owner.toString();
    await (await dex.createToken(Name, Symbol, Supply, Owner)).wait();
    let tokenadd = await dex.Addedtokens();
    let addr = await dex.tokens(tokenadd);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Tokens = new ethers.Contract(addr, tokenCreation.abi, signer);

    let supplly = await Tokens.totalSupply();
    await Tokens.approve(dex.address, supplly);
    setname("");
    setsymbol("");
    setsupply("");
    setowner("");
    alert("Congrates You Create Token");
    window.location.reload();

  };

  useEffect(() => {
    document.title = "Create Token | Multidex";
  }, []);

  return (
    <div className="create-token-card-outer">
      <div className="create-token-image-wrapper">
        <img
          src={Create_token_image}
          alt="Create Token Illustration"
          className="create-token-image"
        />
      </div>

      <div className="create-token-form-wrapper">
        <Form>
          <div className="form-group-container">
            <div className="form-group">
              <input
                type="text"
                required
                className="form-control custom-input"
                placeholder="Enter Name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                required
                className="form-control custom-input"
                placeholder="Enter Symbol"
                onChange={(e) => setsymbol(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                required
                className="form-control custom-input"
                placeholder="Enter Total Supply"
                onChange={(e) => setsupply(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                required
                className="form-control custom-input"
                placeholder="Enter Owner Address"
                onChange={(e) => setowner(e.target.value)}
              />
            </div>
            <div className="btn-wrapper">
              <button
                type="submit"
                onClick={CreateToken}
                className="black-button"
              >
                Create Token
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
