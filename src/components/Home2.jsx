import React from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState, useEffect } from 'react';
import { ethers, providers } from "ethers";


const Homee = () => {
    const [web3Modal, setWeb3Modal] = useState(null)
    const [address, setAddress] = useState("")
    
    useEffect(() => {
        // initiate web3modal
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "17342b0f3f344d2d96c2c89c5fddc959",
                }
            },
        };

        const newWeb3Modal = new Web3Modal({
            cacheProvider: false, // very important
            network: "rinkeby",
            providerOptions,
        });

        setWeb3Modal(newWeb3Modal)
    }, [])

    async function connectWallet() {
        const provider = await web3Modal.connect();
        const ethersProvider = new providers.Web3Provider(provider)
        const userAddress = await ethersProvider.getSigner().getAddress()
        setAddress(userAddress)
    }

    return(
    <div>
        <button onClick={() => connectWallet()}>Connect wallet</button>
        <p>{address}</p>
    </div>
    )
}

export default Homee