import React from "react";
import "./Topbar.css";

const Topbar = ({ web3Handler, account }) => {
  return (
    <div className="topbar">
      <h1 className="topbar-title">MultiDex</h1>

      <div className="wallet-connection">
        {account ? (
          <button className="wallet-button connected">
            {account.slice(0, 5) + "..." + account.slice(38, 42)}
          </button>
        ) : (
          <button onClick={web3Handler} className="wallet-button">
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
