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

    event Mint(address indexed to, string indexed documentId, string taskId);

    // 画像データのipfsリンクを引数としてトークンを発行する関数
    function mint(
        address _owner,
        string memory _ipfsLink,
        string memory _type,
        string memory _team,
        string memory _taskId,
        string memory _documentId
    ) public {
        // オーナーのみが発行できるようにする
        require(msg.sender == owner, "Only owner can mint");

        // トークンのIDをインクリメントする
        _currentTokenID++;

        // _typeによってNFT名を変更する(doingかdoneか)
        string memory name;
        string memory nftId;
        nftId = Strings.toString(_currentTokenID);
        if (keccak256(abi.encodePacked(_type)) == keccak256("doing")) {
            // abi.encodePackedで文字列を連結する
            name = string(
                abi.encodePacked("Assign NFT #", nftId, " Team-", _team)
            );
        } else if (keccak256(abi.encodePacked(_type)) == keccak256("done")) {
            name = string(
                abi.encodePacked("Complete NFT #", nftId, " Team-", _team)
            );
        }
        console.log("\n----- name -----");
        console.log(name);
        console.log(nftId);
        console.log("----------------\n");
        // トークンのmetadataを設定する
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"attributes":[{"display_type":"number","trait_type":"ID","value":',
                        nftId,
                        '},{"trait_type":"TaskID","value":"',
                        _taskId,
                        '"}, {"trait_type":"Team","value":"',
                        _team,
                        '"}, {"trait_type":"Type","value":"',
                        _type,
                        '"}], "name":"',
                        name,
                        '","symbol":"UNYTE',
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
        emit Mint(_owner, _documentId, _taskId);
    }

    // トークンのバッチでのミントを行う関数を以下に実装する
    function mintBatch(
        address[] memory _owners,
        string[] memory _ipfsLinks,
        string[] memory _types,
        string[] memory _teams,
        string[] memory _taskIds,
        string[] memory _documentIds
    ) public {
        // 全ての配列の長さが同じであることを確認する
        require(
            _owners.length == _ipfsLinks.length &&
                _owners.length == _taskIds.length &&
                _owners.length == _types.length,
            "All arrays must have the same length"
        );

        // オーナーのみが発行できるようにする
        require(msg.sender == owner, "Only owner can mint");

        // 配列の長さの数だけmintを繰り返す
        for (uint256 i = 0; i < _owners.length; i++) {
            mint(
                _owners[i],
                _ipfsLinks[i],
                _types[i],
                _teams[i],
                _taskIds[i],
                _documentIds[i]
            );
        }
    }
}
