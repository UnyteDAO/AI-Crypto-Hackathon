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
        string memory _taskId,
        string memory _documentId
    ) public {
        // オーナーのみが発行できるようにする
        require(msg.sender == owner, "Only owner can mint");

        // トークンのIDをインクリメントする
        _currentTokenID++;

        _mint(_owner, _currentTokenID, 1, "");
        _setURI(_currentTokenID, _ipfsLink);
        emit Mint(_owner, _documentId, _taskId);
    }

    // トークンのバッチでのミントを行う関数を以下に実装する
    function mintBatch(
        address[] memory _owners,
        string[] memory _ipfsLinks,
        string[] memory _taskIds,
        string[] memory _documentIds
    ) public {
        // 全ての配列の長さが同じであることを確認する
        require(
            _owners.length == _ipfsLinks.length &&
                _owners.length == _taskIds.length,
            "All arrays must have the same length"
        );

        // オーナーのみが発行できるようにする
        require(msg.sender == owner, "Only owner can mint");

        // 配列の長さの数だけmintを繰り返す
        for (uint256 i = 0; i < _owners.length; i++) {
            mint(_owners[i], _ipfsLinks[i], _taskIds[i], _documentIds[i]);
        }
    }
}
