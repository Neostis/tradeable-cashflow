/**
 * This function creates a flow on the Superfluid protocol
 */
const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, providers } = require("ethers");
require("dotenv");

async function main() {



  const url = `${process.env.GOERLI_RPC_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

/* Creating a framework object that is used to interact with the Superfluid protocol. */
  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
    customSubgraphQueriesEndpoint: "",
    dataMode: "WEB3_ONLY"
  });


/* Creating a signer object that is used to sign transactions. */
  const signer = sf.createSigner({
    privateKey: process.env.DEPLOYER_PRIVATE_KEY,
    provider: customHttpProvider
  });


  const daix = await sf.loadSuperToken("fDAIx");

  const createFlowOperation = sf.cfaV1.createFlow({
      receiver: "0xed8351226F11E8350c7D5D1789e37354Ec0f077C", //tradeable cashflow address
      flowRate: "100000000000",
      superToken: daix.address,
  });

  const txn = await createFlowOperation.exec(signer);

  const receipt = await txn.wait();

  console.log(receipt);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

