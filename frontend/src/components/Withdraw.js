import React from 'react'

export const Withdraw = () => {
    
    return(
        <div className="display-board">

            <h4> Withdraw Staking Tokens</h4>
            <div className="btn" >
                <button type="button" onClick={(e) => getFunds()} className="btn btn-primary sButton" >Withdraw </button>
                {/* <button type="button"  className="btn btn-primary sButton" >Create Pool</button> */}
            </div>
        </div>
    )
}