/* The above code is testing the TradeableCashflow contract. The contract is a wrapper for the
SuperToken contract. The SuperToken contract is a wrapper for the DAI token. The DAI token is a
ERC20 token. The TradeableCashflow contract allows users to send flows of DAI to the contract. The
contract then sends the flows to the owner of the contract. The contract also allows the owner to
change. When the owner changes, the flows change. */
const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, providers } = require("ethers");
require("dotenv");

/**
 * It deletes a cashflow from the DAIx contract.
 */
async function main() {

  const url = `${process.env.GOERLI_RPC_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
    customSubgraphQueriesEndpoint: "",
    dataMode: "WEB3_ONLY"
  });
  const signer = sf.createSigner({
    privateKey:
      process.env.DEPLOYER_PRIVATE_KEY,
    provider: customHttpProvider
  });

  const daix = await sf.loadSuperToken("fDAIx");

  const updateFlowOperation = daix.updateFlow({
    receiver: "ADDRESS", //tradeable cashflow address
    flowRate: "2000000000000000"
  });

  const txn = await updateFlowOperation.exec(signer);

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
  });/* Creating a flow from Alice to the TradeableCashflow contract. */
  /* Creating a flow from Alice to the TradeableCashflow contract. */
  