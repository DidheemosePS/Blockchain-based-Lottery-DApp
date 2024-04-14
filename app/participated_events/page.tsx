"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Web3 from "web3";

interface CustomWindow extends Window {
  contract: any;
  ethereum?: any;
  web3?: any;
}

declare const window: CustomWindow;

export default function Home() {
  const router = useRouter();
  const [participated_events, setParticipanted_events] = useState([]);

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

  const [redeem_input_value, setRedeem_input_value] = useState("");
  const handle_redeem_input = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRedeem_input_value(event.target.value);
  };

  const redeem = async (ticket: any, participant: any) => {
    try {
      if (document.cookie.split("=")[1]) {
        const tx = await window.contract.methods
          .redeem(ticket, redeem_input_value)
          .send({ from: document.cookie.split("=")[1] });
        tx.transactionHash
          ? alert("Successfully redeemed the prize pool")
          : alert("Failed to redeem the prize pool");
        location.reload();
      } else {
        alert("Please connect to your metamask wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const get_participated_events_all = async () => {
        await connect_contract();
        const all_events = await window.contract.methods
          .get_participated_events_all()
          .call();
        const filter_participated_events = all_events.filter(
          (event: any) => event.participant == document.cookie.split("=")[1]
        );
        setParticipanted_events(filter_participated_events);
      };
      get_participated_events_all();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main className="bg-white text-black px-20 py-5 grid grid-cols-3 gap-3">
      {participated_events.length === 0 && <p>There is no ongoing events</p>}
      {participated_events?.map((event: any) => (
        <div key={event.ticket} className="bg-slate-200 py-5 px-10 rounded-md">
          <p className="font-bold">Ticket No:</p>
          <p className="text-ellipsis overflow-hidden">
            {event.ticket.toString()}
          </p>
          <p className="font-bold">Created:</p>
          <p className="text-ellipsis overflow-hidden">{event[2].creator}</p>
          <p className="font-bold">Event Name:</p>
          <p className="text-ellipsis overflow-hidden">{event[2].name}</p>
          <p className="font-bold">Participation Fee:</p>
          <p className="text-ellipsis overflow-hidden">
            {Web3.utils.fromWei(event[2].fee, "ether")}
          </p>
          <p className="font-bold">Prize Distribution:</p>
          <p className="text-ellipsis overflow-hidden">
            {event[2].result_date}
          </p>
          <p className="font-bold">Prize Pool:</p>
          <p className="text-ellipsis overflow-hidden">
            {Web3.utils.fromWei(event[2].prize_pool, "ether")}
          </p>
          {event.winner.winner_address && (
            <>
              <p className="font-bold">Winner ticket No:</p>
              <p>{event.winner.ticket_number.toString()}</p>
              <p className="font-bold">Winner:</p>
              <p className="text-ellipsis overflow-hidden">
                {event.winner.winner_address}
              </p>
            </>
          )}
          {event.winner.winner_address == document.cookie.split("=")[1] &&
            event.winner.ticket_number.toString() == event.ticket.toString() &&
            !event.redeem && (
              <>
                <input
                  onChange={handle_redeem_input}
                  type="text"
                  placeholder="Enter the your wallet address"
                  required
                  className="w-full text-black mb-3 rounded border-2 border-sky-400 px-2 mt-2 placeholder:text-sm"
                />
                <button
                  onClick={() => redeem(event.ticket, event.participant)}
                  className="w-max px-2 py-[4px] bg-gray-500 rounded text-sm font-bold"
                >
                  Redeem
                </button>
              </>
            )}
          {event.winner.ticket_number.toString() == event.ticket.toString() &&
            event.redeem && (
              <p className="w-max px-2 py-[4px] mt-2 bg-gray-500 rounded text-sm font-bold">
                Redeemed
              </p>
            )}
        </div>
      ))}
    </main>
  );
}
