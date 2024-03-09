import axios from "axios";
import {instanceID}  from "../App.js";

export async function getEndpoints() {

    const response = await axios.get('/api/contract/definitions');
    return await response;
}

export async function activateWallet() {

    const response = await axios.post('/api/contract/activate', {    "caID": "NFTContract",
    "caWallet": {
        "getWallet": 1
    }
    });
    return await response;
}

export async function mintToken(instID) {
    console.log(instID)
    let inst = instID
    const response = await axios.post('api/contract/instance/'+ instID + '/endpoint/mint', {
        "unTokenName": "GMBL"
    });
    return await response;
}

export async function createPool() {
    // console.log(instID)
    // let inst = instID
    let instID="19126af8-1730-42e7-a6ae-1fbc542100fb";
    // http://localhost:9080/api/contract/instance/8d2298b3-d19d-434f-8cb7-d9a6dc85915b/endpoint/create
    const response = await axios.post('api/contract/instance/'+ instID + '/endpoint/create', {
        "cpAmountA":1000,
        "cpAmountB":2000,
        "cpCoinB":
            {"unAssetClass":
                [
                    {"unCurrencySymbol":"c0247ff5765786f9946a597ffda070068ba91881ccc777cc13d0822e"},
                    {"unTokenName":"B"}
                ]
            },
        "cpCoinA":{"unAssetClass":
            [
                {"unCurrencySymbol":"c0247ff5765786f9946a597ffda070068ba91881ccc777cc13d0822e"},
                {"unTokenName":"A"}
            ]
        }
    });
    return  response;
}

export async function getStatus() {
    let instID1="19126af8-1730-42e7-a6ae-1fbc542100fb";
    let instID="4dc46eb8-fd37-472c-9f03-551bb27c0879";
    const response = await axios.get('api/contract/instance/'+ instID1 + '/status');
    return  response;
}

export async function getPool() {
    let instID="19126af8-1730-42e7-a6ae-1fbc542100fb";
    const response = await axios.post('api/contract/instance/'+ instID + '/endpoint/pools', []
    );
    return  response;
}

export async function addFund() {
    let instID="19126af8-1730-42e7-a6ae-1fbc542100fb";
    const response = await axios.post('api/contract/instance/'+ instID + '/endpoint/add',{
        "apAmountB":800,
        "apCoinA":
            {"unAssetClass":[{"unCurrencySymbol":"c0247ff5765786f9946a597ffda070068ba91881ccc777cc13d0822e"},
                {"unTokenName":"A"}
            ]},
        "apAmountA":400,
        "apCoinB":{
            "unAssetClass":[{"unCurrencySymbol":"c0247ff5765786f9946a597ffda070068ba91881ccc777cc13d0822e"},
                {"unTokenName":"B"
            }]
    }}
    );
    return  response;
}

export async function getFund() {
    let instID="19126af8-1730-42e7-a6ae-1fbc542100fb";
    const response = await axios.post('api/contract/instance/'+ instID + '/endpoint/funds',[]);
    return  response;
}