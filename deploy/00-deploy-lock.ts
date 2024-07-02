import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config.ts";
import verify from "../helper-functions";

const deployFabiToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args: any[] = [
    deployer, // initialOwner
  ];

  log("------------------------------------");
  log("Deploying FabiToken \n");

  const FabiToken: DeployResult = await deploy("FabiToken", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  await verify(FabiToken.address, args);

};

export default deployFabiToken;
deployFabiToken.tags = ["all", "FabiToken"];
