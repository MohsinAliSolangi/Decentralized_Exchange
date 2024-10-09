# Mohsin's Decentralized Exchange (DEX)

**Mohsin's Decentralized Exchange (DEX)** is a decentralized platform built to create, trade, stake, and swap tokens. This DEX allows users to create custom tokens, buy and stake tokens, and participate in token swaps in a decentralized manner. The smart contracts are deployed on a blockchain network, ensuring transparency and security.

---

## Features

### Token Management

- **Create Token**: Allows users to create a new token by specifying the token's name, symbol, total supply, and owner address.
- **Add Custom Token**: Users can add any existing token to the platform by entering the token address.
  
### Token Transactions

- **Buy Token**: Users can buy tokens by entering the token number and the amount they wish to purchase.

### Staking & Withdrawals

- **Staking Tokens**: Users can stake their tokens by specifying the token number, staking amount, and the duration for staking.
- **Withdraw Staking Tokens**: If the user has tokens staked, they can withdraw them. If no tokens are staked, the system will display a message: "You Don't Stake Yet."

### Token Swapping

- **Swap Token**: Users can swap one token for another by specifying the token number, the token address, and the amount they want to swap.

---

## DApp Instructions

This repository is divided into two parts: **Client** and **Smart Contract**.

### Prerequisites

- **MetaMask**: Install MetaMask to connect to the blockchain network.
- **Node.js** and **npm** installed.

---

## Smart Contract Setup

1. Navigate to the smart contract directory:
   ```bash
   cd smart-contract
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile and deploy the smart contracts to your preferred blockchain network:
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

4. Copy the deployed contract address and ABI files for further use in the client-side DApp.

---

## Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the DApp:

   - Update the **contract addresses** and **ABI files** in the `src/contractData` folder.
   - Ensure the correct network is set in the client configuration.

4. Run the DApp locally:
   ```bash
   npm run dev
   ```

   The DApp will be available at `http://localhost:3000`.

---

## How to Use

1. **Create Token**: Navigate to the "Create Token" section and enter the token details (name, symbol, total supply, and owner address).
2. **Add Custom Token**: Add an existing token by providing the token address.
3. **Buy Token**: Purchase tokens by entering the token number and the amount you want to buy.
4. **Stake Tokens**: Stake tokens by specifying the token number, staking amount, and the duration for staking.
5. **Withdraw Staking**: Withdraw your staked tokens if applicable.
6. **Swap Tokens**: Perform a token swap by providing the token number, token address, and the token amount.

---

## Technologies Used

- **Solidity**: Smart contracts for token management and staking.
- **React**: Frontend framework for building the DApp interface.
- **Web3.js / Ethers.js**: To interact with the Ethereum blockchain from the client.
- **Hardhat**: Ethereum development environment for compiling and deploying smart contracts.

---

## 🚀 Contact

For any questions, feedback, or inquiries, feel free to reach out to **Mohsin Ali Solangi**. You can connect via the following platforms:

- 🌐 **Linktree**: [Mohsin Ali Solangi](https://linktr.ee/mohsinalisolangi)
- 🔗 **LinkedIn**: [Mohsin Ali Solangi](https://www.linkedin.com/in/mohsinalisolangi/)

Looking forward to hearing from you! 😄
```
