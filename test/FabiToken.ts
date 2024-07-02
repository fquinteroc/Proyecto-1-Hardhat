import { expect } from "chai";
import { ethers } from "hardhat";
import { FabiToken } from "../typechain-types";

describe("FabiToken Contract", function () {
  const setup = async () => {
    const [owner] = await ethers.getSigners();
    const FabiTokenFactory = await ethers.getContractFactory("FabiToken");
    const deployed = (await FabiTokenFactory.deploy(owner.address)) as FabiToken;
    return {
      owner,
      deployed,
    };
  };

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      const { owner, deployed } = await setup();
      expect(await deployed.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", () => {
    it("Mints a new token and assigns it to the specified address", async () => {
      const { owner, deployed } = await setup();
      const recipient = owner.address;
      const tokenId = 1;

      await deployed.safeMint(recipient, tokenId);

      expect(await deployed.ownerOf(tokenId)).to.equal(recipient);
    });

    it("Only owner can mint tokens", async () => {
      const { deployed } = await setup();
      const [_, nonOwner] = await ethers.getSigners();
      const recipient = nonOwner.address;
      const tokenId = 2;

      await expect(deployed.connect(nonOwner).safeMint(recipient, tokenId)).to.be.reverted;
    });
  });
});
