import React from 'react'
import Button from '@mui/material/Button';
import {GlobalStore} from '../context/GlobalState'

const Connect = () => {
    const { getModalConnect } = GlobalStore();
    // console.log("getmodalconnect : ",getModalConnect)
    const handleConnect = async () =>{
      console.log("handleConnect : ", getModalConnect)
      await getModalConnect()
    }
  return (
    <div><Button onClick={()=>handleConnect()}>Connect Wallet</Button></div>
  )
}

export default Connect