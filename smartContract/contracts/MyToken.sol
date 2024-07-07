// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract MyToken is ERC20, ERC721Holder {
    IERC721 nft;

    struct Token {
        address owner;
        uint256 stakeAt;
    }

    struct Items {
        uint256 tokenId;
        uint256 stake;
        address owner;
        uint256 price;
        IERC721 nft;
        uint256 itemId;
    }

    mapping(uint256 => Items) public items;
    mapping(uint256 => Token) public tokens;

    uint256 EMMISSION_RATE = (50 * 10 ** decimals()) / 1 days;

    event TokenLog(address ownerOf, uint256 stakeAt);
    event ItemsLog(
        uint256 tokenId,
        uint256 stake,
        address owner,
        uint256 price,
        IERC721 nft,
        uint256 itemId
    );

    constructor(address _nft) ERC20("MyToken", "MTK") {
        nft = IERC721(_nft);
    }

    function stake(uint256 _tokenId) external {
        nft.safeTransferFrom(msg.sender, address(this), _tokenId);
        tokens[_tokenId].owner = msg.sender;
        tokens[_tokenId].stakeAt = block.timestamp;
        emit TokenLog(msg.sender, block.timestamp);
    }

    function calculateToken(uint256 _tokenId) public view returns (uint256) {
        uint256 timeElapse = block.timestamp - tokens[_tokenId].stakeAt;
        return timeElapse * EMMISSION_RATE;
    }

    function unstake(uint256 _tokenId) external {
        require(msg.sender == tokens[_tokenId].owner, "Don't be a thief");
        _mint(msg.sender, calculateToken(_tokenId));
        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit TokenLog(msg.sender, _tokenId);
        delete tokens[_tokenId];
    }
}
