import {buildModule} from "@nomicfoundation/hardhat-ignition/modules"
import { artifacts } from "hardhat";


const MyTokenModule =  buildModule("MyTokenModule", (m)=> {

    // const myNFT = m.contract("MyNFT");
    const mytoken =  m.contract("MyToken",["0x5FbDB2315678afecb367f032d93F642f64180aa3"]);
    saveFrontendFiles(mytoken, "MyToken");
    return{ mytoken};
})

export default  MyTokenModule

async function saveFrontendFiles(contract:any, name:string){
    const fs = require("fs");
    const contractdDir = `${__dirname}/../../../frontend/contractsData`;

    if (!fs.existsSync(contractdDir)){
        fs.mkdirSync(contractdDir);
    }
    // console.log(contract.address)
    fs.writeFileSync(`${contractdDir}/${name}-address.json`,JSON.stringify({address: `${await contract.address}`}, undefined, 2));

    const contractArtifact = artifacts.readArtifactSync(name);
    // console.log(contractArtifact)

    fs.writeFileSync(`${contractdDir}/${name}.json`,JSON.stringify(contractArtifact, null, 2));
}