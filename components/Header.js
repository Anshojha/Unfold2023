import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useRef, useEffect, useState } from "react";
import Landing from "./Landing";
import Link from "next/link";

const Header = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const Web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await Web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const { chainId } = await web3Provider.getNetwork();
      // console.log(chainId)
      if (chainId !== 80001) {
        // window.alert("Change to Mumbai network")
        // throw new Error("Change to Mumbai network");
      }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (error) {
      console.error(error);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      return <button className="btn">Connected!</button>;
    } else {
      return <button className="btn" onClick={connectWallet}>Connect Wallet</button>;
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner().then(() => setWalletConnected(true)).catch((err)=>setWalletConnected(false))
      } catch (error) {
        setWalletConnected(false)
        console.log(error)
      }
  };

  useEffect(() => {
    if (!walletConnected) {
      Web3ModalRef.current = new Web3Modal({
        network: "maticmum",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div className="navbar">
      <div className="header">
      <img className="imgpoly" src="/Poly-Fund Logo.svg"/>
        <h1 className="head">
        <Link href="/">PolyFund</Link>
        </h1>
        <div className="button">
          <button className="btn">
            <Link href="raise">Raise Funds</Link>
          </button>
          <button className="btn">
            <Link href="donate">Donate funds</Link>
          </button>
          <button className="btn">
            <Link href="redeem">Redeem tokens</Link>
          </button>
          {/* <button className="btn">Connect Wallet</button> */}
      {renderButton()}
        </div>
      </div>
    </div>
  );
};

export default Header;
