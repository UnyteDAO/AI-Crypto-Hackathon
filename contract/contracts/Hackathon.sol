// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "hardhat/console.sol";
import {Base64} from "./libraries/Base64.sol";

contract Hackathon is ERC1155URIStorage {
    // トークンのIDをカウンターとして使用
    uint256 private _currentTokenID = 0;

    // コントラクトのデプロイヤーをオーナーとして設定
    address public owner;

    constructor() ERC1155("UnyteToken") {
        owner = msg.sender;
    }

    // 画像データのipfsリンクを引数としてトークンを発行する関数
    function mint(
        address _owner,
        string memory _ipfsLink,
        string memory _taskId,
        string memory _type
    ) public {
        // オーナーのみが発行できるようにする
        require(msg.sender == owner, "Only owner can mint");

        // トークンのIDをインクリメントする
        _currentTokenID++;

        // トークンのmetadataを設定する
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"attributes":[{"display_type":"number","trait_type":"id","value":',
                        _taskId,
                        '}, {"trait_type":"Type","value":"',
                        _type,
                        '"}], "name":"test',
                        '","symbol":"test',
                        '","description":"NFTs attesting to their contribution in the DAOs recorded by Unyte. With Unyte, members can easily record proposals, contributions and praise comments using slash commands. We can also send ERC20 tokens, NFT or WL depending on what is being recorded. More info: https://unyte.team/","image": "',
                        _ipfsLink,
                        '","external_url": "https://beta.unyte.team/"}'
                    )
                )
            )
        );

        console.log("\n----- JSON -----");
        console.log(json);
        console.log("----------------\n");

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _mint(_owner, _currentTokenID, 1, "");
        _setURI(_currentTokenID, finalTokenUri);
    }

    // トークンを送ったときのイベント
    event Sent(address indexed to, uint256 indexed id, uint256 amount);

    // トークンのバッチでのミントを行う関数を以下に実装する
    function mintBatch(
        address[] memory _owners,
        string memory _ipfsLink,
        string memory _taskId,
        string memory _type
    ) public {
        // オーナーのみが発行できるようにする
        require(msg.sender == owner, "Only owner can mint");

        // lengthの数だけmintを繰り返す
        for (uint256 i = 0; i < _owners.length; i++) {
            mint(_owners[i], _ipfsLink, _taskId, _type);
        }
    }
}
