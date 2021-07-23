pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender ;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function enter() public payable{
        require(msg.value > 0.1 ether);
        players.push(msg.sender);
    }
    function getPLayers() public view returns (address[]) {
        return players;
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    function pickUpWinner() public restricted payable {
        uint index = random() % players.length ;
        players[index].transfer( address(this).balance );
        players = new address[](0);
    }
}
