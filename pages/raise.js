import Web3Modal from "web3modal";
import { ethers, Contract, providers, utils } from "ethers";
import { useRef, useState, useEffect } from "react";
import { POLYFUND_ADDRESS, ABI } from "../constants";
import toast from "react-hot-toast";
import client from "../sanity";

const Raise = () => {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [description, setDescription] = useState([]);
  const [donation, setDonation] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const Web3ModalRef = useRef();
  const getProviderOrSigner = async (needSigner = true) => {
    try {
      const provider = await Web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const { chainId } = await web3Provider.getNetwork();
      // console.log(chainId)
      if (chainId !== 80001) {
        window.alert("Change to Mumbai network");
        throw new Error("Change to Mumbai network");
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
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };
  const raiseFund = async () => {
    const raiseFundToast = toast.loading("Raising Fund...");
    try {
      const signer = await getProviderOrSigner(true);
      const polyfundContract = new Contract(POLYFUND_ADDRESS, ABI, signer);
      const _amount = ethers.utils.parseEther(donation);
      const tx = await polyfundContract.raise(_amount);
      await tx.wait().then((e) => {
        const doc = {
          _type: "raise_funds",
          name: name,
          description: description,
          donation_amount: donation,
          email: email,
          wallet_address: tx?.from,
        };
        client
          .create(doc)
          .then((res) => {
            toast.success("Fund Raised", { id: raiseFundToast });
          })
          .catch((err) => {
            toast.error("Fund not Raised", { id: raiseFundToast });
          });
      });
    } catch (error) {
      toast.error("Fund not raised", { id: raiseFundToast });
      console.error(error);
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
    <div className="raise">
      <div className="title">
        <h1>RAISE FUNDS</h1>
        <p>
          Start a fundraiser today and get the first donation from us!
          <br />
          We want to be the first to support you.
        </p>
      </div>
      <div className="form">
        <label htmlFor="name">Name: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
          placeholder="Enter the Name of Fund"
        />{" "}
        <br />
        <label htmlFor="email">Email ID: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
          placeholder="Enter the Email Id"
        />{" "}
        <br />
        <label htmlFor="description">Description: </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          type="text"
          placeholder="Enter the cause"
        />{" "}
        <br />
        <label htmlFor="donation">Donation: </label>
        <input
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
          name="donation"
          type="text"
          placeholder="Minimum amount of donation"
        />{" "}
        <br />
        <button className="submit-btn" onClick={raiseFund}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Raise;
