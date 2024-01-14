#!/usr/bin/env node

import { Arguments, Argv } from "yargs";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import {
  createCsamCoin,
  deleteCsamCoin,
  getCsamCoinsByLauncherId
} from "./api";
import { Options } from "./utils";
import { Program } from "clvm-lib";

interface CsamCoinCommandArguments {
  storeIds: string;
  amount?: number;
  options?: Options;
}

interface DeleteCsamCoinCommandArguments {
  coinId: string;
  options?: Options;
}

interface GetCsamCoinsCommandArguments {
  options?: Options;
}

const commands = {
  createCsamCoin: {
    command: "add",
    desc: "Creates a CSAM Coin on the blockchain to add your CSAM datastore to the federated database",
    builder: (yargs: Argv) =>
      yargs
        .option("amount", {
          describe: "Amount of mojos to lock up in the server coin",
          type: "number",
        })
        .option("storeIds", {
          describe: "list of storeIds to add to the federated CSAM database",
          type: "string",
          demandOption: true,
        })
        .option("fee", {
          describe: "Fee Override",
          type: "number",
        })
        .option("fullNodeHost", {
          describe: "Host for your Full Node",
          type: "string",
        })
        .option("fullNodePort", {
          describe: "Port for your Full Node",
          type: "number",
        })
        .option("certificateFolderPath", {
          describe: "Path to the certificate ssl folder",
          type: "string",
        }),
    handler: async (argv: Arguments<CsamCoinCommandArguments>) => {
      try {
        await createCsamCoin(
          [Program.fromText(argv.storeIds)],
          argv.amount,
          {
            feeOverride: argv.fee as number,
            fullNodeHost: argv.fullNodeHost as string,
            fullNodePort: argv.fullNodePort as number,
            certificateFolderPath: argv.certificateFolderPath as string,
          }
        );
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    },
  },
  deleteCsamCoin: {
    command: "delete",
    desc: "Remove a CSAM Coin from the federated CSAM database",
    builder: (yargs: Argv) =>
      yargs
        .option("coinId", {
          describe: "Coin ID",
          type: "string",
          demandOption: true,
        })
        .option("feeOverride", {
          describe: "Fee Override",
          type: "number",
        })
        .option("fullNodeHost", {
          describe: "Host for your Full Node",
          type: "string",
        })
        .option("fullNodePort", {
          describe: "Port for your Full Node",
          type: "number",
        })
        .option("certificateFolderPath", {
          describe: "Path to the certificate ssl folder",
          type: "string",
        }),
    handler: async (argv: Arguments<DeleteCsamCoinCommandArguments>) => {
      try {
        await deleteCsamCoin(argv.coinId, {
          feeOverride: argv.feeOverride as number,
          fullNodeHost: argv.fullNodeHost as string,
          fullNodePort: argv.fullNodePort as number,
          certificateFolderPath: argv.certificateFolderPath as string,
        });
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    },
  },
  getCsamCoinsByLauncherId: {
    command: "get_csam_coins",
    desc: "Gets all CSAM Coins from the federated database",
    builder: (yargs: Argv) =>
      yargs
        .option("fullNodeHost", {
          describe: "Host for your Full Node",
          type: "string",
        })
        .option("fullNodePort", {
          describe: "Port for your Full Node",
          type: "number",
        })
        .option("certificateFolderPath", {
          describe: "Path to the certificate ssl folder",
          type: "string",
        }),
    handler: async (argv: Arguments<GetCsamCoinsCommandArguments>) => {
      try {
        await getCsamCoinsByLauncherId({
          fullNodeHost: argv.fullNodeHost as string,
          fullNodePort: argv.fullNodePort as number,
          certificateFolderPath: argv.certificateFolderPath as string
        });
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    },
  },
};

async function run() {
  const argv = yargs(hideBin(process.argv))
    .command(commands.createCsamCoin)
    .command(commands.deleteCsamCoin)
    .command(commands.getCsamCoinsByLauncherId)
    .demandCommand(1, "You need at least one command before moving on")
    .help()
    .alias("h", "help")
    .parse();
}

run();
