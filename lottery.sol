//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract SimpleStorage {
    struct Events{
        uint id;
        address creator;
        string name;
        uint fee;
        string result_date;
        uint prize_pool;
        string winner;
    }
    
    Events[] public events;

    function get_event_all() external view returns (Events[] memory) {
        return events;
    }

    function create_event(uint id, string memory _name, uint _fee, string memory _result_date, uint _prize_pool) external {
        events.push(Events({
            id: id,
            creator: msg.sender,
            name: _name,
            fee: _fee,
            result_date: _result_date,
            prize_pool: _prize_pool,
            winner:""
        }));
    }

    struct Winner{
        string winner_address;
        uint ticket_number;
    }
    struct Participants{
        uint ticket;
        uint event_id;
        Events events;
        address participant;
        Winner winner;
        bool redeem;
    }

    Participants[] public participants;

    function get_participated_events_all() external view returns (Participants[] memory) {
        return participants;
    }

    function participate_event(uint _id, uint _ticket) external payable {
        for (uint i=0; i<events.length; i++){
            if(events[i].id == _id){
                participants.push(Participants({
                ticket:_ticket,
                event_id:_id,
                events: events[i],
                participant: msg.sender,
                winner:Winner({
                    winner_address:"",
                    ticket_number:0
                }),
                redeem: false
                }));
            }
        }
    }

    function send_profit(uint _id, string memory _address, uint event_profit) public  {
        for (uint i = 0; i < events.length; i++) {
            if (events[i].id == _id) {
                events[i].winner = _address;
                uint commission = (events[i].prize_pool * 5 ) / 100;
                if(event_profit>0){
                    address payable creator_payable = payable(events[i].creator);
                    creator_payable.transfer(event_profit);
                }
                // Addres of the wallet to handle the commission amounts
                address payable wallet_address = payable(address(0xF991dfE1f6A9640Cb161Ee6D09aA6AdfcCbd92c4));
                // To Find the commission for each event creation and it will be refunded; 
                wallet_address.transfer(commission);
            }
        }
    }

    function find_winners(uint _id, uint _ticket, address _participant, string memory _address, uint event_profit) external payable{
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i].event_id == _id && participants[i].participant == _participant) {
                participants[i].winner=Winner({
                    winner_address:_address,
                    ticket_number:_ticket
                });
            }
        }
        send_profit(_id, _address, event_profit);
    }

    function redeem(uint _ticket, address _to) external {
        for (uint i=0; i<participants.length; i++){
            if(participants[i].ticket == _ticket){
                participants[i].redeem= true;
                payable(_to).transfer(participants[i].events.prize_pool);
            }
        }
    }
    
    function get_balance() external view returns(uint) {
        return address(this).balance;
    }
}