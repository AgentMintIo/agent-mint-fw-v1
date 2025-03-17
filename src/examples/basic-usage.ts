/**
 * Basic usage example for agent-mint-sdk
 * 
 * This example demonstrates how to use the SDK programmatically
 * to fetch data about Solana tokens.
 */

import {
  getPoolData,
  getMarketCap,
  getTokenHolders,
  getTopTraders,
  getTokenTradeData
} from 'agent-mint-sdk';

// Example Solana token mint address (USDC)
const mintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

async function runExamples() {
  console.log('Agent Mint SDK - Basic Usage Examples');
  console.log('======================================');
  console.log(`Using mint address: ${mintAddress}`);
  console.log('');

  try {
    // Example 1: Get pool data
    console.log('Example 1: Get Pool Data');
    console.log('-----------------------');
    const poolData = await getPoolData(mintAddress);
    console.log('Pool found:', poolData.poolFound);
    if (poolData.pool) {
      console.log('DEX:', poolData.pool.dex.protocolName);
      console.log('Liquidity (USD):', poolData.pool.liquidity.quoteAmountUsd);
    }
    console.log('Price:', poolData.price);
    console.log('');

    // Example 2: Get market cap data
    console.log('Example 2: Get Market Cap Data');
    console.log('-----------------------------');
    const marketCapData = await getMarketCap(mintAddress);
    console.log('Token:', marketCapData.token.name, `(${marketCapData.token.symbol})`);
    console.log('Market Cap:', marketCapData.marketCap);
    console.log('Token Supply:', marketCapData.tokenSupply);
    console.log('');

    // Example 3: Get token holders data
    console.log('Example 3: Get Token Holders Data');
    console.log('-------------------------------');
    const holdersData = await getTokenHolders(mintAddress, 3);
    console.log('Total Holders:', holdersData.totalHolders);
    console.log('Top 3 Holders:');
    holdersData.topHolders.forEach((holder, index) => {
      console.log(`  ${index + 1}. Address: ${holder.address.substring(0, 8)}...`);
      console.log(`     Balance: ${holder.balance}`);
      console.log(`     Percentage: ${holder.percentage}`);
    });
    console.log('');

    // Example 4: Get top traders data
    console.log('Example 4: Get Top Traders Data');
    console.log('-----------------------------');
    const tradersData = await getTopTraders(mintAddress, 3);
    console.log('Trader Count:', tradersData.traderCount);
    console.log('Top 3 Traders:');
    tradersData.traders.forEach((trader, index) => {
      console.log(`  ${index + 1}. Address: ${trader.address.substring(0, 8)}...`);
      console.log(`     Volume: ${trader.volume}`);
      console.log(`     Volume USD: ${trader.volumeUsd}`);
    });
    console.log('');

    // Example 5: Get token trade data
    console.log('Example 5: Get Token Trade Data');
    console.log('-----------------------------');
    const tradeData = await getTokenTradeData(mintAddress);
    console.log('Trade Found:', tradeData.tradeFound);
    if (tradeData.trade) {
      console.log('Time:', tradeData.trade.time);
      console.log('Price:', tradeData.trade.price);
      console.log('Amount:', tradeData.trade.amount);
      console.log('Volume:', tradeData.trade.volume);
    }
    console.log('');

  } catch (error) {
    console.error('Error running examples:', error instanceof Error ? error.message : 'Unknown error');
  }
}

// Run the examples
runExamples().catch(console.error); 