import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import tokenCreation from "../contractsData/tokenCreation.json"





const SetTransactionSigner = () => {

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const marketplace = new ethers.Contract(marketPlaceAddress.address, marketplaceAbi.abi, signer)
  return marketplace
}



export const AddToken = ({dex,account}) => {
    const [token, settoken] = useState(null);


  const addCustomToken = async()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const Tokens = new ethers.Contract(token, tokenCreation.abi, signer)
  let supply = await Tokens.totalSupply()
  await Tokens.approve(dex.address,supply)
  await dex.addCustomToken(token);
  }
    
    return(
        <div className="display-board">
           <h4>Add Custom Token </h4>
         <div>
            <Form>
              <Row>
                <div style={{margin:"0 auto"}}>
                  <input
                    type="address"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter token Address'
                    onChange={(e) => settoken(e.target.value)}></input>
                </div>
              </Row>
            </Form>
          </div>
            <div className="btn" style={{marginTop:"10px"}} >
               <button type="button" onClick={addCustomToken} className="btn btn-primary sButton" >Add Tokens</button>
            </div>
            </div>
      
    )
}