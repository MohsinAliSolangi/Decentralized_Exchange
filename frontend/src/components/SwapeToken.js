import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'

export const SwapeToken = () => {
    const[token, settoken]=useState(null);
    
    return(
        <div className="display-board">
            <h4>Swape Token</h4>
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
                    placeholder='Enter token amount'
                    onChange={(e) => settoken(e.target.value)}></input>
                </div>
                <div style={{marginTop:"10px"}}>
                  <input
                    type="number"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter token amount'
                    onChange={(e) => settoken(e.target.value)}></input>
                </div>
                </div>
              </Row>
            </Form>
          </div>
            <div className="btn" style={{marginTop:"20px"}} >
                <button type="button" onClick={(e) => getState()} className="btn btn-primary sButton" > SwapeToken</button>
                {/* <button type="button"  className="btn btn-primary sButton" >Add Funds</button> */}
            </div>
        </div>
    )
}