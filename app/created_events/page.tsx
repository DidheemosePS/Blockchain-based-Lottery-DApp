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

export default function Created_Events() {
  const router = useRouter();
  const [created_events, setCreated_events] = useState([]);

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

  const handle_participate = async (id: number, fee: number) => {
    try {
      if (document.cookie.split("=")[1]) {
        const ticket = Math.floor(Math.random() * 100) + 1;
        const tx = await window.contract.methods
          .participate_event(id, ticket)
          .send({ from: document.cookie.split("=")[1], value: fee });
        tx.transactionHash
          ? alert("Thank you for participating")
          : alert("Failed to participate");
      } else {
        alert("Please connect to your metamask wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const find_event_winners = async (id: number) => {
    try {
      if (document.cookie.split("=")[1]) {
        await connect_contract();
        const all_events = await window.contract.methods
          .get_participated_events_all()
          .call();
        const participatants = all_events.filter((event: any) => {
          return event.event_id == id;
        });
        if (participatants.length <= 0) {
          alert("There is not participants in this event");
        } else {
          const event_fee = parseFloat(
            Web3.utils.fromWei(participatants[0].events.fee, "ether") as any
          );
          const prize_pool = parseFloat(
            Web3.utils.fromWei(
              participatants[0].events.prize_pool,
              "ether"
            ) as any
          );
          const commission = (prize_pool * 5) / 100;
          const find_cost = event_fee * participatants.length;
          const to_pay = prize_pool + commission;
          const event_profit = find_cost - prize_pool - commission;
          if (find_cost < to_pay) {
            if (
              confirm(
                "The total amount collected is less than the prize pool, So you will need to pay the balance amount including commission"
              )
            ) {
              const winner =
                participatants[
                  Math.floor(Math.random() * participatants.length)
                ];
              const value = to_pay - find_cost;
              const value_to_wei = Web3.utils.toWei(
                Number(value.toFixed(3)),
                "ether"
              );
              const tx = await window.contract.methods
                .find_winners(
                  id,
                  winner.ticket,
                  winner.participant,
                  winner.participant,
                  Web3.utils.toWei(Math.max(event_profit, 0), "ether")
                )
                .send({
                  from: document.cookie.split("=")[1],
                  value: value_to_wei,
                });
            }
          } else {
            const winner =
              participatants[Math.floor(Math.random() * participatants.length)];
            const tx = await window.contract.methods
              .find_winners(
                id,
                winner.ticket,
                winner.participant,
                winner.participant,
                Web3.utils.toWei(Math.max(event_profit, 0), "ether")
              )
              .send({ from: document.cookie.split("=")[1], value: 0 });
          }
        }
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
      const get_created_events_all = async () => {
        await connect_contract();
        const all_events = await window.contract.methods.get_event_all().call();
        const filter_created_events = all_events.filter(
          (event: any) => event.creator == document.cookie.split("=")[1]
        );
        setCreated_events(filter_created_events);
      };
      get_created_events_all();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main className="bg-white text-black px-20 py-5 grid grid-cols-3 gap-3">
      {created_events.length === 0 && <p>There is no ongoing events</p>}
      {created_events?.map((event: any) => (
        <div key={event.id} className="bg-slate-200 py-5 px-10 rounded-md">
          <p className="font-bold">Created:</p>
          <p className="text-ellipsis overflow-hidden">{event.creator}</p>
          <p className="font-bold">Event Name:</p>
          <p>{event.name}</p>
          <p className="font-bold">Participation Fee:</p>
          <p>{Web3.utils.fromWei(event.fee, "ether")}</p>
          <p className="font-bold">Prize Distribution:</p>
          <p>{event.result_date}</p>
          <p className="font-bold">Prize Pool:</p>
          <p>{Web3.utils.fromWei(event.prize_pool, "ether")}</p>
          {!event.winner ? (
            <div className="flex gap-2">
              <button
                className="px-2 py-[4px] mt-2 bg-gray-500 rounded text-sm font-bold"
                onClick={() => handle_participate(event.id, event.fee)}
              >
                Join
              </button>
              <button
                className="px-2 py-[4px] mt-2 bg-gray-500 rounded text-sm font-bold"
                onClick={() => find_event_winners(event.id)}
              >
                Find Winner
              </button>
            </div>
          ) : (
            <>
              <p className="font-bold">Winner:</p>
              <p className="text-ellipsis overflow-hidden">{event.winner}</p>
            </>
          )}
        </div>
      ))}
    </main>
  );
}
