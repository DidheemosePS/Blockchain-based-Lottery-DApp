"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import Web3 from "web3";

interface CustomWindow extends Window {
  contract: any;
  ethereum?: any;
  web3?: any;
}

declare const window: CustomWindow;

export default function Home() {
  const router = useRouter();
  const connect_contract = async () => {
    const ABI = [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_fee",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_result_date",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_prize_pool",
            type: "uint256",
          },
        ],
        name: "create_event",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_ticket",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_participant",
            type: "address",
          },
          {
            internalType: "string",
            name: "_address",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "event_profit",
            type: "uint256",
          },
        ],
        name: "find_winners",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_ticket",
            type: "uint256",
          },
        ],
        name: "participate_event",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_ticket",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
        ],
        name: "redeem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_address",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "event_profit",
            type: "uint256",
          },
        ],
        name: "send_profit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "events",
        outputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "result_date",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "prize_pool",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "winner",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "get_balance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "get_event_all",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "creator",
                type: "address",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "fee",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "result_date",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "prize_pool",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "winner",
                type: "string",
              },
            ],
            internalType: "struct SimpleStorage.Events[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "get_participated_events_all",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "ticket",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "event_id",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "creator",
                    type: "address",
                  },
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "uint256",
                    name: "fee",
                    type: "uint256",
                  },
                  {
                    internalType: "string",
                    name: "result_date",
                    type: "string",
                  },
                  {
                    internalType: "uint256",
                    name: "prize_pool",
                    type: "uint256",
                  },
                  {
                    internalType: "string",
                    name: "winner",
                    type: "string",
                  },
                ],
                internalType: "struct SimpleStorage.Events",
                name: "events",
                type: "tuple",
              },
              {
                internalType: "address",
                name: "participant",
                type: "address",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "winner_address",
                    type: "string",
                  },
                  {
                    internalType: "uint256",
                    name: "ticket_number",
                    type: "uint256",
                  },
                ],
                internalType: "struct SimpleStorage.Winner",
                name: "winner",
                type: "tuple",
              },
              {
                internalType: "bool",
                name: "redeem",
                type: "bool",
              },
            ],
            internalType: "struct SimpleStorage.Participants[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "participants",
        outputs: [
          {
            internalType: "uint256",
            name: "ticket",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "event_id",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "creator",
                type: "address",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "fee",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "result_date",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "prize_pool",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "winner",
                type: "string",
              },
            ],
            internalType: "struct SimpleStorage.Events",
            name: "events",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "participant",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "winner_address",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "ticket_number",
                type: "uint256",
              },
            ],
            internalType: "struct SimpleStorage.Winner",
            name: "winner",
            type: "tuple",
          },
          {
            internalType: "bool",
            name: "redeem",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const Address = "0x2551EaBc452BEad9509Ca6E6F56b89aC22B9774d";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
  };

  const handle_event_submit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (document.cookie.split("=")[1]) {
        const form_data = new FormData(event.currentTarget);
        const event_id = Math.floor(Math.random() * 100) + 1;
        const event_name = Object.fromEntries(form_data).event_name as string;
        const event_fee = parseInt(
          Object.fromEntries(form_data).event_fee as string
        );
        const event_date = Object.fromEntries(form_data).event_date as string;
        const event_prize = parseInt(
          Object.fromEntries(form_data).event_prize as string
        );

        // Call the event creation function

        await connect_contract();
        const tx = await window.contract.methods
          .create_event(
            event_id,
            event_name,
            event_fee,
            event_date,
            event_prize
          )
          .send({ from: document.cookie.split("=")[1] });
        tx.transactionHash
          ? alert("Event created successfully")
          : alert("Event creation failed");
        if (tx.transactionHash) {
          router.push("/created_events");
        }
      } else {
        alert("Please connect to your metamask wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col gap-3 bg-white text-black py-5">
      <p className="m-auto font-bold">Create Event</p>
      <form
        onSubmit={handle_event_submit}
        className="w-96 flex flex-col m-auto bg-slate-200 p-10 rounded-md"
      >
        <label className="text-xs font-bold mb-1">Event Name</label>
        <input
          type="text"
          name="event_name"
          required
          className="text-black mb-3 rounded border-2 border-sky-400 px-2 py-1 text-xs"
        />
        <label className="text-xs font-bold mb-1">Event Fee</label>
        <input
          type="number"
          name="event_fee"
          placeholder="1000000000000000000 = 1 ETH"
          required
          className="text-black mb-3 rounded border-2 border-sky-400 px-2 py-1 text-xs"
        />
        <label className="text-xs font-bold mb-1">Date of result</label>
        <input
          type="date"
          name="event_date"
          required
          className="text-black mb-3 rounded border-2 border-sky-400 px-2 py-1 text-xs"
        />
        <label className="text-xs font-bold mb-1">prize pool</label>
        <input
          type="number"
          name="event_prize"
          placeholder="1000000000000000000 = 1 ETH"
          required
          className="text-black mb-3 rounded border-2 border-sky-400 px-2 py-1 text-xs"
        />
        <button
          type="submit"
          className="px-2 py-[4px] mt-2 bg-gray-500 rounded"
        >
          Create Event
        </button>
      </form>
    </main>
  );
}
