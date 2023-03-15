import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import tokenCreation from "../contractsData/tokenCreation.json"
import { ethers} from "ethers";

export const CreateToken = ({dex,account}) => {
    const [name, setname] = useState("");
    const [symbol, setsymbol] = useState("");
    const [supply, setsupply] = useState(null);
    const [owner, setowner] = useState(null);

   
   const CreateToken = async()=>{
    let Name = name.toString();
    let Symbol = symbol.toString();
    let Supply = supply.toString();
    let Owner = owner.toString();
    await (await dex.createToken(Name,Symbol,Supply,Owner)).wait();
    let tokenadd = await dex.Addedtokens();
    let addr = await dex.tokens(tokenadd);
    console.log(tokenadd,addr)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const Tokens = new ethers.Contract(addr,tokenCreation.abi, signer)
    console.log("token",Tokens)
    let supplly = await Tokens.totalSupply()
    await Tokens.approve(dex.address,supplly)
    setname("")
    setsymbol("")
    setsupply("")
    setowner("") 
    alert("Congrates You Create Token")
    window.location.reload(); 
  }


   
   
console.log(name,symbol,supply,owner);
    return(
        <div className="display-board">
          
       <h4>Create Token</h4>
            <div>
            <Form>
              <Row>
                <div style={{margin:"0 auto"}}>
                <div>
                  <input
                    type="text"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter Name'
                    onChange={(e) => setname(e.target.value)}></input>
                </div>
                <div style={{marginTop:"10px"}}>
                  <input
                    type="text"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter symbol'
                    onChange={(e) => setsymbol(e.target.value)}></input>
                </div>
                <div style={{marginTop:"10px"}}>
                  <input
                    type="number"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter Totalsupply'
                    onChange={(e) => setsupply(e.target.value)}></input>
                </div>
                <div style={{marginTop:"10px"}}>
                  <input
                    type="address"
                    required
                    step="any"
                    className='form-control'
                    placeholder='Enter owner Address'
                    onChange={(e) => setowner(e.target.value)}></input>
                </div>
                </div>
              </Row>
            </Form>
            </div>
            <div className="btn" style={{marginTop:"10px"}} >
                <button type="submit" onClick={CreateToken} className="btn btn-primary sButton" >Create Token</button>
            </div>
        </div>
    )
}