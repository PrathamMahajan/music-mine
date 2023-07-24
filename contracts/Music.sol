// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Music{
    address public Artist;
    mapping(address => bool) private Fans;
    mapping(address => bool) private didPromote;
    uint public ArtistRating = 0;

    constructor() {
        Artist = msg.sender;
    }

    function becomeFan() public payable {
        //Checking if the fan is not the artist himself 
        require(msg.sender!=Artist);
        require(msg.value > .01 ether);
        Fans[msg.sender] = true;
    }

    function promoteArtist() public payable {
        //checking whether the person has already promoted
        require(msg.sender!=Artist);
        require(Fans[msg.sender]);
        require(!didPromote[msg.sender]);
        didPromote[msg.sender] = true;
        ArtistRating++;
        // sending 10% reward back to the fan who has promoted the Artist
        uint rewardAmount = address(this).balance/10;
        payable(msg.sender).transfer(rewardAmount);
    }

    function withdraw() public payable {
        require(msg.sender==Artist);
        payable(Artist).transfer(address(this).balance);
    }
}