import Card from "../components/Card";
import { useEffect, useState, useRef } from "react";
import client from "../sanity";
import { POLYFUND_ADDRESS, ABI } from "../constants";
import toast from "react-hot-toast";
import Web3Modal from "web3modal";
import { ethers, Contract, providers, utils } from "ethers";

const donate = () => {
  const [raiseFunds, setRaiseFunds] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  // const [raised, setRaised] = useState(0);
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


  const clickHandler = async (wallet_address, amt) => {
    const donateFundToast = toast.loading("Donating Fund...");
    try {
      const signer = await getProviderOrSigner(true);
      const polyfundContract = new Contract(POLYFUND_ADDRESS, ABI, signer);
        const tx = await polyfundContract.fund(wallet_address, {value: ethers.utils.parseEther(amt)});
        await tx.wait()
        .then( () => toast.success("Fund Donated", { id: donateFundToast })) 
        .catch((err) => {
          toast.error("Fund not Donated", { id: donateFundToast });
        });
    } catch (error) {
      toast.error("Fund not Donated", { id: donateFundToast });

      console.error(error);
    }
  }
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

  useEffect(() => {
    const groq = `*[_type == "raise_funds"]`;
    client.fetch(groq).then((data) => {
      console.log(data);
      setRaiseFunds(data);

    });
  }, []);

  return (
    <div className="donate">
      <div className="title">
        <h1>DONATE FUNDS</h1>
        <p className="don-fun">
          fundraise and donate seamlessly! Set up and manage your fundraiser or
          donate to different causes from your mobile at anytime and from
          anywhere
        </p>
      </div>
      {raiseFunds?.map((fund, index) => {
        return (
          <Card
            key={index}
            wallet_address={fund.wallet_address}
            name={fund.name}
            description={fund.description}
            amount={fund.donation_amount}
            clickHandler={clickHandler}
          />
        );
      })}
    </div>
  );
};

export default donate;
