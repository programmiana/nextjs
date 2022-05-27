import { useState, useEffect } from "react";
import Web3 from "web3";

export function useFetchContracts() {
    const [networkId, setNetworkId] = useState<number>();
    const [selectedAccount, setSelectedAccount] = useState<string>();
    // const [activeContract, setActiveContract] = useState<Contract>();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await web3.eth.net.getId();
        setNetworkId(response);
      };
  
      fetchData().catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await web3.eth.getAccounts();
  
        setSelectedAccount(response[0]);
      };
  
      fetchData().catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {}, [])
    //   if (!networkId) return;
    //   const fetchData = async () => {
    //     const contract = new web3.eth.Contract(
    //       ColorNFTBuild.abi as unknown as AbiItem,
    //       "0x153cd07cbf55f48ee39898968bc5de3b62e8c0a3"
    //     );
    //     setActiveContract(contract);
    //     const colorstr = colorHexToString("#FF00FF");
  
    //     const tx = await contract.methods
    //       .mint(colorStringToBytes(colorstr))
    //       .send({ from: selectedAccount })
    //       .once("receipt", (receipt) => {
    //         console.log("transaction receipt: ", receipt);
  
    //         console.log(tx);
    //       });
    //   };
  
    //   fetchData().catch((e) => console.log(e));
    // }, [networkId, selectedAccount]);
  
    // // useEffect(() => {
    // //   if (!activeContract) return;
    // //   console.log(activeContract);
  
    // //   const fetchData = async () => {
    // //     const tx = await activeContract.methods
    // //       .mint(2)
    // //       .then((bla) => console.log(bla));
  
    // //     console.log(tx);
    // //   };
  
    // //   fetchData().catch((e) => console.log(e));
    // // }, [activeContract]);
  
    // const mintToken = () => {
    //   // return activeContract.methods.totalSupply().call();
    // };
  
    return {
      web3,
      accounts: selectedAccount,
    //   toDoList: activeContract,
    //   networkId,
    //   mintToken,
    // };
  }
}