// test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hackathon", function () {
  let Hackathon, hackathon, owner, addr1, addr2;

  beforeEach(async function () {
    // Hackathonコントラクトをデプロイする
    Hackathon = await ethers.getContractFactory("Hackathon");
    hackathon = await Hackathon.deploy();
    await hackathon.deployed();

    // テスト用のアカウントを取得する
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  // mint関数のテスト
  describe("mint", function () {
    it("Should mint a new token with the given ipfs link and task id", async function () {
      // mint関数を呼び出す
      await hackathon.connect(owner).mint(addr1.address, "ipfs://Qm...", "123","doing", "Unyte");

      // トークンの所有者がaddr1であることを確認する
      expect(await hackathon.balanceOf(addr1.address, 1)).to.equal(1);

      // トークンのURIが正しいことを確認する
      const uri = await hackathon.uri(1);

        // URIはBase64エンコードされているため、デコードする
        const decodedUri = Buffer.from(uri.split(",")[1], "base64").toString();
        expect(decodedUri).to.contain("ipfs://Qm...");
        expect(decodedUri).to.contain("123");
        expect(decodedUri).to.contain("doing");

    });

    it("Should revert if the caller is not the owner", async function () {
      // mint関数をaddr2から呼び出すとエラーになることを確認する
      await expect(
        hackathon.connect(addr2).mint(addr1.address, "ipfs://Qm...", "123","doing", "Unyte")
      ).to.be.revertedWith("Only owner can mint");
    });
  });

  // mintBatch関数のテスト
  describe("mintBatch", function () {
    it("Should mint a batch of tokens with the given ipfs links and task ids", async function () {
      // mintBatch関数を呼び出す
      await hackathon.connect(owner).mintBatch(
        [addr1.address, addr2.address],
        ["ipfs://Qm...", "ipfs://Qq..."],
        ["123", "456"],
        ["doing","done"],
        ["Unyte","Unyte"]
      );

      // トークンの所有者がaddr1とaddr2であることを確認する
      expect(await hackathon.balanceOf(addr1.address, 1)).to.equal(1);
      expect(await hackathon.balanceOf(addr2.address, 2)).to.equal(1);

      // トークンのURIが正しいことを確認する
      const uri1 = await hackathon.uri(1);
      const uri2 = await hackathon.uri(2);

      // URIはBase64エンコードされているため、デコードする
        const decodedUri1 = Buffer.from(uri1.split(",")[1], "base64").toString();
        const decodedUri2 = Buffer.from(uri2.split(",")[1], "base64").toString();
        expect(decodedUri1).to.contain("ipfs://Qm...");
        expect(decodedUri1).to.contain("123");
        expect(decodedUri1).to.contain("doing");
        expect(decodedUri1).to.contain("Unyte");
        expect(decodedUri2).to.contain("ipfs://Qq...");
        expect(decodedUri2).to.contain("456");
        expect(decodedUri2).to.contain("done");
        expect(decodedUri2).to.contain("Unyte");
    });

    it("Should revert if the caller is not the owner", async function () {
      // mintBatch関数をaddr2から呼び出すとエラーになることを確認する
      await expect(
        hackathon.connect(addr2).mintBatch(
          [addr1.address, addr2.address],
          ["ipfs://Qm...", "ipfs://Qm..."],
          ["123", "456"],
          ["doing","done"],
          ["Unyte","Unyte"]
        )
      ).to.be.revertedWith("Only owner can mint");
    });

    it("Should revert if the arrays have different lengths", async function () {
      // mintBatch関数に長さが異なる配列を渡すとエラーになることを確認する
      await expect(
        hackathon.connect(owner).mintBatch(
          [addr1.address],
          ["ipfs://Qm...", "ipfs://Qm..."],
          ["123", "456"],
          ["doing","done"],
          ["Unyte","Unyte"]
        )
      ).to.be.revertedWith("All arrays must have the same length");
    });
  });
});
