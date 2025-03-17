#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {
  getPoolData,
  getMarketCap,
  getTokenHolders,
  getTopTraders,
  getTokenTradeData
} from 'agent-mint-io-sdk';

const program = new Command();

// Set up CLI metadata
program
  .name('agent-mint')
  .description('CLI framework for interacting with Solana blockchain data')
  .version('1.0.0');

// Helper function to prompt for mint address
async function promptForMintAddress(): Promise<string> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'mintAddress',
      message: 'Enter Solana token mint address:',
      validate: (input: string) => {
        if (input.trim().length === 0) {
          return 'Mint address is required';
        }
        return true;
      }
    }
  ]);
  return answers.mintAddress;
}

// Helper function to format JSON output
function formatOutput(data: any): void {
  console.log(chalk.cyan('Response:'));
  console.log(JSON.stringify(data, null, 2));
}

// Pool data command
program
  .command('pool')
  .description('Get pool data for a Solana token')
  .option('-m, --mint <address>', 'Solana token mint address')
  .action(async (options) => {
    try {
      const mintAddress = options.mint || await promptForMintAddress();
      console.log(chalk.yellow(`Fetching pool data for ${mintAddress}...`));
      
      const poolData = await getPoolData(mintAddress);
      
      console.log(chalk.green('Pool data fetched successfully!'));
      formatOutput(poolData);
    } catch (error) {
      console.error(chalk.red('Error fetching pool data:'), error instanceof Error ? error.message : 'Unknown error');
    }
  });

// Market cap command
program
  .command('market')
  .description('Get market cap data for a Solana token')
  .option('-m, --mint <address>', 'Solana token mint address')
  .action(async (options) => {
    try {
      const mintAddress = options.mint || await promptForMintAddress();
      console.log(chalk.yellow(`Fetching market cap data for ${mintAddress}...`));
      
      const marketCapData = await getMarketCap(mintAddress);
      
      console.log(chalk.green('Market cap data fetched successfully!'));
      formatOutput(marketCapData);
    } catch (error) {
      console.error(chalk.red('Error fetching market cap data:'), error instanceof Error ? error.message : 'Unknown error');
    }
  });

// Token holders command
program
  .command('holders')
  .description('Get token holders data for a Solana token')
  .option('-m, --mint <address>', 'Solana token mint address')
  .option('-l, --limit <number>', 'Maximum number of holders to return', '10')
  .action(async (options) => {
    try {
      const mintAddress = options.mint || await promptForMintAddress();
      const limit = parseInt(options.limit, 10);
      
      console.log(chalk.yellow(`Fetching top ${limit} token holders for ${mintAddress}...`));
      
      const holdersData = await getTokenHolders(mintAddress, limit);
      
      console.log(chalk.green('Token holders data fetched successfully!'));
      formatOutput(holdersData);
    } catch (error) {
      console.error(chalk.red('Error fetching token holders data:'), error instanceof Error ? error.message : 'Unknown error');
    }
  });

// Top traders command
program
  .command('traders')
  .description('Get top traders data for a Solana token')
  .option('-m, --mint <address>', 'Solana token mint address')
  .option('-l, --limit <number>', 'Maximum number of traders to return', '5')
  .action(async (options) => {
    try {
      const mintAddress = options.mint || await promptForMintAddress();
      const limit = parseInt(options.limit, 10);
      
      console.log(chalk.yellow(`Fetching top ${limit} traders for ${mintAddress}...`));
      
      const tradersData = await getTopTraders(mintAddress, limit);
      
      console.log(chalk.green('Top traders data fetched successfully!'));
      formatOutput(tradersData);
    } catch (error) {
      console.error(chalk.red('Error fetching top traders data:'), error instanceof Error ? error.message : 'Unknown error');
    }
  });

// Token trade data command
program
  .command('trade')
  .description('Get trade data for a Solana token')
  .option('-m, --mint <address>', 'Solana token mint address')
  .action(async (options) => {
    try {
      const mintAddress = options.mint || await promptForMintAddress();
      console.log(chalk.yellow(`Fetching trade data for ${mintAddress}...`));
      
      const tradeData = await getTokenTradeData(mintAddress);
      
      console.log(chalk.green('Trade data fetched successfully!'));
      formatOutput(tradeData);
    } catch (error) {
      console.error(chalk.red('Error fetching trade data:'), error instanceof Error ? error.message : 'Unknown error');
    }
  });

// Add help command and show help if no command is specified
program.addHelpCommand();
program.showHelpAfterError();

// Parse command line arguments
program.parse(process.argv); 