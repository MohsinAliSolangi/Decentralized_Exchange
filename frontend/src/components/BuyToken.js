import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap';

export const BuyToken = ({dex,account}) => {
    const [token, settoken] = useState(null);
    const [amount, setamount] = useState(null);


 const buyToken = async()=>{
  console.log(token,amount)
  await dex.BuyToken(token,amount,{value:amount});
  settoken("")
  setamount("")
  alert("congrates you Buy Tokens")
  window.location.reload();
 }
    return(
        <div className="display-board">

            <h4>Buy Token</h4>
            <div>
            <Form>
              <Row>
                <div style={{margin:"0 auto"}}>               
                <div>
                  <input
                    type="number"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter token Number'
                    onChange={(e) => settoken(e.target.value)}></input>
                </div>
                <div style={{marginTop:"10px"}}>
                  <input
                    type="number"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter amount'
                    onChange={(e) => setamount(e.target.value)}></input>
                </div>
                </div>

              </Row>
            </Form>
          </div>
            <div className="btn" style={{marginTop:"10px"}} >
                <button type="button" onClick={buyToken} className="btn btn-primary sButton" > Buy Token </button>
                            </div>
        </div>
    )
}