import React from 'react'
import Button from '@mui/material/Button';
import {GlobalStore} from '../context/GlobalState'

const Connect = () => {
    const { getModalConnect } = GlobalStore();
    console.log("getmodalconnect : ",getModalConnect)
  return (
    <div><Button onClick={()=>getModalConnect()}>Connect Wallet</Button></div>
  )
}

export default Connect