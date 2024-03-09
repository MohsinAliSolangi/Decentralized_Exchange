import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import React, { useEffect, useState } from 'react';
import { BuyToken } from './components/BuyToken';
import { AddToken } from './components/AddToken';
import { Withdraw } from './components/Withdraw';
import { Staking } from './components/Staking';
import {CreateToken} from "./components/CreateToken"
import {SwapeToken} from "./components/SwapeToken"
import { ethers} from "ethers";
import dexAddress from "./contractsData/mohsinsDex-address.json"
import dexAbi from "./contractsData/mohsinsDex.json"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '5px solid #212121',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};


const { ethereum } = window;
function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [dex, setDex] = useState({})


  const connectWallet = async () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      try {
        // Check if the wallet is already connected
        if (!isMobile && !loading) {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: process.env.REACT_APP_CHAIN_ID, // Replace with your desired chain ID
              },
            ],
          });

          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          setAccount(accounts[0]);
          setLoading(true);
        } else if (isMobile) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          setLoading(true);
        }
      } catch (err) {
        setLoading(false);
        // toast.error(err.message);
        console.error(err.message);
      }
    } else {
      if (isMobile) {
        // Metamask app is not installed, redirect to installation page
        window.open(
          "https://metamask.app.link/dapp/https://staking-dapp-project.vercel.app/"
        );
        return;
      } else {
        // if no window.ethereum and no window.web3, then MetaMask or Trust Wallet is not installed
        alert(
          "MetaMask or Trust Wallet is not installed. Please consider installing one of them."
        );
        return;
      }
    }
  };

  const checkIsWalletConnected = async () => {
    try {
        
      window.ethereum.on("accountsChanged", async function (accounts) {
        setAccount(accounts[0]);
        setLoading(true);
      });
      window.ethereum.on("chainChanged", async (chainId) => {
        if (chainId != process.env.REACT_APP_CHAIN_ID) {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                // chainId: "0x5" //Goerli
                // chainId: "0x89", //PolygonMainnet
                // chainId: "0xaa36a7", //sepolia
                // chainId: "0x1", //Miannet
                chainId: process.env.REACT_APP_CHAIN_ID, //localHost TODO
                // chainId:"0x13881" //mumbai
                // chainId:"0x61"//bnb
              },
            ],
          });
        }
      });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
        setLoading(true);
      } else {
        console.log("No account Found");
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

// const loadContracts = async () => {
//   // Get deployed copies of contracts
//   const provider = new ethers.providers.Web3Provider(window.ethereum)
//   // Set signer
//   const signer = provider.getSigner();
//   const dex = new ethers.Contract(dexAddress.address, dexAbi.abi, signer)
//   setDex(dex)
//   setLoading(false)
// }


  useEffect(() => {
    checkIsWalletConnected();
  }, [])




  return (
    <div className="App">
      <Header web3Handler={connectWallet} account={account}/>
       <div className="container mrgnbtm" id="grid">
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <CreateToken dex={dex} account={account} />
                </div>
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <AddToken dex={dex} account={account}/>
         </div>
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <BuyToken dex={dex} account={account}/>
        </div>
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <Staking dex={dex} account={account}/>
        </div>
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <Withdraw checkIsWalletConnected={checkIsWalletConnected} dex={dex} account={account} />        
        </div>
        <div className="row-md-5" style={{ "paddingTop": 20 }}>
          <SwapeToken dex={dex} account={account}/>
        </div>


        
        {/* <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography sx={{
                fontWeight: '900'
              }} id="modal-modal-title" variant="h6" component="h2">
                Available Endpoints
              </Typography>
              <Typography sx={{
                fontWeight: 'bolder'
              }} id="modal-modal-description" >
                {endPs}
              </Typography>
            </Box>
          </Modal>
        </div> */}
        {/* <div>
          <Modal
            open={openActW}
            onClose={handleActWClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography sx={{
                fontWeight: 'bolder'
              }} id="modal-modal-title" variant="h6" component="h2">
                Available Endpoints
              </Typography>
              <Typography sx={{
                fontWeight: 'bolder'
              }} id="modal-modal-description" >
                {actRes}
              </Typography>
            </Box>
          </Modal>
        </div> */}
      </div>
    </div>

  );
}


export default App;
