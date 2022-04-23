import { ethers } from "hardhat";

const main = async () => {
  // We get the contract to deploy
  const DomainContractFactory = await ethers.getContractFactory("Domains");
  const domain = await DomainContractFactory.deploy("matic");
  await domain.deployed();

  console.log("Contract deployed to:", domain.address);

  const txn = await domain.register("website", {
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const domainOwner = await domain.getAddress("website");
  console.log("Owner of domain:", domainOwner);

  const balance = await ethers.provider.getBalance(domain.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
