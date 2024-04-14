"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Web3 from "web3";

interface CustomWindow extends Window {
  contract: any;
  ethereum?: any;
  web3?: any;
}

declare const window: CustomWindow;

export default function Nav_bar() {
  const router = useRouter();
  const [account, setAccount] = useState("");

  const metamask_login = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        document.cookie = `account=${accounts[0]}`;
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please ensure that the metamask is installed on your browser.");
    }
  };

  const logout = () => {
    document.cookie =
      "account=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAccount("");
    router.push("/");
  };

  useEffect(() => {
    document.cookie.split("=")[1]
      ? setAccount(document.cookie.split("=")[1])
      : setAccount("");
  }, []);

  return (
    <nav className="bg-white text-black py-5 drop-shadow-md flex justify-between px-20">
      <Link href="/" className="font-bold">
        Lottery
      </Link>
      <div className="flex gap-8 font-medium">
        <button
          onClick={() => {
            account
              ? router.push("/create_events")
              : alert("Please connect to your metamask wallet");
          }}
        >
          Create Events
        </button>
        <button
          onClick={() => {
            account
              ? router.push("/created_events")
              : alert("Please connect to your metamask wallet");
          }}
        >
          Created Events
        </button>
        <button
          onClick={() => {
            account
              ? router.push("/participated_events")
              : alert("Please connect to your metamask wallet");
          }}
        >
          Participated Events
        </button>
        {account ? (
          <button onClick={logout}>Connected</button>
        ) : (
          <button onClick={metamask_login}>Connect</button>
        )}
      </div>
    </nav>
  );
}
