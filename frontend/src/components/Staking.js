import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'

export const Staking = () => {
    const[token, settoken]=useState(null);
    
    return(
        <div className="display-board">
            <h4>Staking Tokens</h4>
            <div>
            <Form>
              <Row>
                <div style={{margin:"0 auto"}}>
                  <input
                    type="number"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter token amount'
                    onChange={(e) => settoken(e.target.value)}></input>
                </div>
              </Row>
            </Form>
          </div>
            <div className="btn" >
                <button type="button" onClick={(e) => getState()} className="btn btn-primary sButton" > Staking</button>
                {/* <button type="button"  className="btn btn-primary sButton" >Add Funds</button> */}
            </div>
        </div>
    )
}