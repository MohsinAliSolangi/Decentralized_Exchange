import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { ethers } from "ethers";
import tokenCreation from "../contractsData/tokenCreation.json"

export const Staking = ({ dex, account }) => {
  const [Token, settoken] = useState(null);
  const [amount, setamount] = useState(null);
  const [endTime, setendTime] = useState(null)

  const staking = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const dextoken = await dex.tokens(Token)
    console.log("dextoken",dextoken)
    const Tokens = new ethers.Contract(dextoken, tokenCreation.abi, signer)
    console.log(Tokens,dex.address)
    await (await Tokens.approve(dex.address,amount)).wait();
    await dex.Staking(Token, amount, endTime);
    settoken("")
    setamount("")
    setendTime("")
    alert("congrates your tokens has been staked")
    window.location.reload();
  }


  return (
    <div className="display-board">
      <h4>Staking Tokens</h4>
      <div>
        <Form>
          <Row>
            <div style={{ margin: "0 auto" }}>
              <div >
                <input
                  type="number"
                  required
                  step="any"
                  className='form-control'
                  placeholder='Enter token number'
                  onChange={(e) => settoken(e.target.value)}></input>
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  required
                  step="any"
                  className='form-control'
                  placeholder='Enter token staking amount'
                  onChange={(e) => setamount(e.target.value)}></input>
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  required
                  step="any"
                  className='form-control'
                  placeholder='Enter Time for Staking'
                  onChange={(e) => setendTime(e.target.value)}></input>
              </div>
            </div>
          </Row>
        </Form>
      </div>
      <div className="btn" style={{ marginTop: "10px" }} >
        <button type="button" onClick={staking} className="btn btn-primary sButton" > Staking</button>
      </div>
    </div>
  )
}