// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const main = async () => {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.ralready goneun('compile');

  // Grab wallet addresses
  const [owner, randomPerson] = await ethers.getSigners();

  // We get the contract to deploy
  const DomainContractFactory = await ethers.getContractFactory("Domains");
  const domain = await DomainContractFactory.deploy();

  await domain.deployed();

  console.log("Contract deployed to:", domain.address);
  console.log("Contract deployed by:", owner.address);

  const txn = await domain.register("website");
  await txn.wait();

  const domainOwner = await domain.getAddress("website");
  console.log("Owner of domain:", domainOwner);

  // This should error
  const badTxn = await domain
    .connect(randomPerson)
    .setRecord("website", "I don't own this record!");

  await badTxn.wait();
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
