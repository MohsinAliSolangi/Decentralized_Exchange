import React, { useEffect, useState } from "react";
import "./TransactionTable.css";
import TOKEN_LIST from "../constants/tokenList";
// import { WithdrawBox } from "./WithdrawBox";

const statusClass = {
  COMPLETED: "status-completed",
  PENDING: "status-pending",
  FAILED: "status-failed",
};



export const Withdraw = ({ dex, account }) => {
  const [stakeAmount, setStakeAmount] = useState([]);

  const WithdrawStakingTokens = async () => {
    try {
      if (!dex || !account) return;

      const stakingId = await dex.stakingId();
      const items = [];

      for (let i = 1; i <= stakingId; i++) {
        const stake = await dex.staking(i);

        if (stake.staker?.toString()?.toLowerCase() === account.toLowerCase()) {
          items.push({
            asset: stake.tokenSymbol || "Unknown",
            date: new Date(stake.timestamp * 1000).toLocaleString(),
            amount: stake.amount?.toString(),
            address: stake.staker,
            status: "COMPLETED",
          });
        }
      }

      setStakeAmount(items);
    } catch (error) {
      console.error("WithdrawStakingTokens error:", error);
    }
  };

  useEffect(() => {
    WithdrawStakingTokens();
  }, [account, dex]);

    useEffect(() => {
    document.title = "Withdraw Staking Tokens | Multidex";
  }, []);



  if (!dex || !account) {
    return (
      <div className="table-container p-4">
        <h4>Please connect your wallet to withdraw your staking tokens.</h4>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ASSET</th>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>ADDRESS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {stakeAmount.length > 0 ? (
            stakeAmount.map((tx, index) => {
              const token = TOKEN_LIST.find((t) => t.symbol === tx.asset);
              return (
                <tr key={index}>
                  <td className="asset-cell">
                    {token ? (
                      <img
                        src={token.logo}
                        alt={token.symbol}
                        className="icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "6px",
                          verticalAlign: "middle",
                        }}
                      />
                    ) : (
                      <span style={{ marginRight: "6px" }}></span>
                    )}
                    {tx.asset}
                  </td>
                  <td>{tx.date}</td>
                  <td>{tx.amount}</td>
                  <td>
                    {tx.address}
                    <a
                      href={`https://etherscan.io/address/${tx.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon"
                    >
                      🔗
                    </a>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${statusClass[tx.status]}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                You haven't staked any tokens yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
