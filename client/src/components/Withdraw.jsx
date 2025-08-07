import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import dexAddress from "../contractsData/mohsinsDex-address.json";
import dexAbi from "../contractsData/mohsinsDex.json";
import { WithdrawBox } from "./WithdrawBox";

export const Withdraw = ({ dex, account }) => {
  const [stakeAmount, setStakeAmount] = useState([]);

  const WithdrawStakingTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const dex = new ethers.Contract(dexAddress.address, dexAbi.abi, signer);

    let id = await dex?.stakingId();
    let items = [];

    for (let i = 1; i <= id; i++) {
      let stake = await dex?.staking(i);

      if (
        stake.staker?.toString()?.toLowerCase() ===
        account?.toString()?.toLowerCase()
      ) {
        let stakes = await dex.staking(i);

        items.push(stakes);
      }
    }
    setStakeAmount(items);
  };

  useEffect(() => {
    WithdrawStakingTokens();
  }, [account]);

  return (
    <div className="display-board">
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Withdraw Staking Tokens
      </h2>

      {stakeAmount?.length > 0 ? (
        <div className="stake-grid">
          {stakeAmount?.map((items, idxx) => (
            <div className="stake-card" key={idxx}>
              <WithdrawBox dex={dex} items={items} idxx={idxx} />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          You haven't staked any tokens yet.
        </p>
      )}
    </div>
  );
};

// import React, { useEffect, useState } from 'react';
// import { WithdrawBox } from './WithdrawBox';

// export const Withdraw = ({ dex, account }) => {
//   const [stakeAmount, setStakeAmount] = useState([]);

//   const WithdrawStakingTokens = async () => {
//     try {
//       if (!dex || !account) return;

//       const stakingId = await dex.stakingId();
//       const items = [];

//       for (let i = 1; i <= stakingId; i++) {
//         const stake = await dex.staking(i);

//         if (stake.staker?.toLowerCase() === account.toLowerCase()) {
//           items.push(stake);
//         }
//       }

//       setStakeAmount(items);
//     } catch (error) {
//       console.error("WithdrawStakingTokens error:", error);
//     }
//   };

//   useEffect(() => {
//     WithdrawStakingTokens();
//   }, [account, dex]);

//   if (!dex || !account) {
//     return (
//       <div className="display-board">
//         <h4>Please connect your wallet to withdraw your staking tokens.</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="display-board">
//       <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Withdraw Staking Tokens</h2>

//       {stakeAmount.length > 0 ? (
//         <div className="stake-grid">
//           {stakeAmount.map((items, idxx) => (
//             <div className="stake-card" key={idxx}>
//               <WithdrawBox dex={dex} items={items} idxx={idxx} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p style={{ textAlign: "center" }}>You haven't staked any tokens yet.</p>
//       )}
//     </div>
//   );
// };
