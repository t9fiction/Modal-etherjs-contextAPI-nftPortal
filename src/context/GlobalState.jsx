import { createContext, useEffect, useContext, useState } from "react";
import Web3Modal from "web3modal";
// import { abi } from '../artifacts/contracts/SHEIR.sol/SHEIR.json';
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import Swal from 'sweetalert2';
import { ethers } from 'ethers';

const contractAddress = '0x1Dd0D5cd7577E4C26B6F30CbC662D66a2F92A979'

const { ethereum } = window;

const CONTRACT_ABI = [{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mintNFTs","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"reserveNFTs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseTokenURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPRICE","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]
// const getChainID = async () => {
//     try {
//         // if (window.ethereum !== undefined) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         if (ethereum) {
//             const { chainId } = await provider.getNetwork()
//             console.log("ChainID", chainId);
//             if (chainId != '04') {
//                 Swal.fire("Please select Rinkeby Test Chain")
//             }
//             return chainId;
//         }
//     } catch (error) {
//         console.log("Wallet Not Connected", error)
//     }
// }

// const getContract = async () => {
//     try {
//         // if (window.ethereum !== undefined) {
//         if (ethereum) {
//             const provider = new ethers.providers.Web3Provider(ethereum);
//             const signer = provider.getSigner();
//             const contract = new ethers.Contract(contractAddress, abi, signer);
            
//             return contract;
//         }
//     } catch (error) {
//         console.log("Wallet Not Connected", error)
//     }
// }

const providerOptions = {
    /* See Provider Options Section */
    walletconnect: {
        display: {
            name: "Mobile"
        },
        package: WalletConnectProvider,
        options: {
            infuraId: "17342b0f3f344d2d96c2c89c5fddc959" // required
        }
    }
  };
  

const getModalConnect = async () => {
    const web3Modal = new Web3Modal({
        network: "rinkeby",
        providerOptions,
    });
    
    const instance = await web3Modal.connect();
    
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
    console.log("contract : ",contract)
    // const accounts = await web3.eth.getAccounts();
    
}

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {

    const [totalMinted, setTotalMinted] = useState(0);
    const [balance, setBalance] = useState();
    const [currentAccount, setCurrentAccount] = useState("");


    //functions
    const getCount = async () => {
        const contract = await getModalConnect();
        const count = await contract.totalSupply();
        console.log(parseInt(count));
        setTotalMinted(parseInt(count));
    };

    // const getMintedStatus = async () => {
    //     const result = await contract.totalSupply();
    //     console.log(result)
    //     if (tokenId < result) {
    //         setIsMinted(true);
    //     }
    // };

    async function getURI({ tokenId }) {
        const contract = await getModalConnect();
        const uri = await contract.tokenURI(tokenId);
        console.log("tokenID : ", tokenId)
        console.log("uri", uri.toString())
        Swal.fire(uri.toString());
    }

    const mintToken = async () => {
        const contract = await getModalConnect();
        // const connection = contract.connect(signer);
        // console.log("connection", connection)
        // const addr = connection.address;
        // console.log("addr", addr)
        const result = await contract.mintNFTs(1, {
            value: ethers.utils.parseEther('0.01')
        });
        await result.wait();
        // getMintedStatus();
        // getCount();
    }

    const getBalance = async () => {
        const [account] = await ethereum.request({ method: 'eth_requestAccounts' })
        setCurrentAccount(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accountBalance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(accountBalance));
        return accountBalance
    };

    // useEffect(() => {
    //     const initial = async () => {
    //         if (currentAccount) {
    //             // await getChainID();
    //             // await getBalance();
    //         }
    //         initial();
    //     }
    // }, [currentAccount]);

    // useEffect(() => {
    //     const initial = async () => {
    //         await getCount();
    //     }
    //     initial();
    // }, [mintToken]);

    return (
        <GlobalContext.Provider value={{
            totalMinted, getCount, balance, currentAccount, getBalance, mintToken, getURI, getModalConnect
        }} >
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalStore = () => useContext(GlobalContext);