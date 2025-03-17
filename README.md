# Agent Mint Framework

A command-line interface (CLI) framework for interacting with Solana blockchain data using the `agent-mint-io-sdk`. This tool provides easy access to Solana token information like pool data, market cap, token holders, and trading history.

## Features

- **User-friendly CLI**: Interactive command-line interface with colorful output
- **Multiple Data Endpoints**: Access to various Solana blockchain data points:
  - Pool data and liquidity information
  - Market cap statistics
  - Token holder distribution
  - Top traders analytics
  - Recent trade data
- **Flexible Usage**: Use as a CLI tool or integrate into your Node.js applications
- **TypeScript Support**: Full TypeScript definitions for type safety

## Installation

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Global Installation

```bash
# Install globally to use the CLI commands from anywhere
npm install -g agent-mint-fw

# Verify installation
agent-mint --version
```

### Local Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/agent-mint-fw.git

# Navigate to the project directory
cd agent-mint-fw

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### CLI Commands

The framework provides several commands to access different types of Solana token data:

#### Pool Data

```bash
# Interactive mode (will prompt for mint address)
agent-mint pool

# With mint address specified
agent-mint pool --mint <SOLANA_TOKEN_MINT_ADDRESS>
```

#### Market Cap

```bash
# Interactive mode
agent-mint market

# With mint address specified
agent-mint market --mint <SOLANA_TOKEN_MINT_ADDRESS>
```

#### Token Holders

```bash
# Interactive mode
agent-mint holders

# With mint address and custom limit
agent-mint holders --mint <SOLANA_TOKEN_MINT_ADDRESS> --limit 20
```

#### Top Traders

```bash
# Interactive mode
agent-mint traders

# With mint address and custom limit
agent-mint traders --mint <SOLANA_TOKEN_MINT_ADDRESS> --limit 10
```

#### Token Trade Data

```bash
# Interactive mode
agent-mint trade

# With mint address specified
agent-mint trade --mint <SOLANA_TOKEN_MINT_ADDRESS>
```

### Using npm Scripts

If you've installed the project locally, you can use npm scripts to run the commands:

```bash
# Pool data
npm run pool

# Market cap
npm run market

# Token holders
npm run holders

# Top traders
npm run traders

# Token trade data
npm run trade

# Example script showing programmatic usage
npm run example
```

### Passing Arguments with npm Scripts

```bash
npm run pool -- -m <SOLANA_TOKEN_MINT_ADDRESS>
npm run holders -- -m <SOLANA_TOKEN_MINT_ADDRESS> -l 15
```

## Programmatic Usage

You can also use the SDK programmatically in your Node.js applications:

```typescript
import {
  getPoolData,
  getMarketCap,
  getTokenHolders,
  getTopTraders,
  getTokenTradeData
} from 'agent-mint-io-sdk';

// Example: Get pool data for a Solana token
async function fetchPoolData(mintAddress) {
  try {
    const poolData = await getPoolData(mintAddress);
    console.log('Pool data:', poolData);
  } catch (error) {
    console.error('Error fetching pool data:', error);
  }
}

// Example: Get market cap data
async function fetchMarketCap(mintAddress) {
  try {
    const marketCapData = await getMarketCap(mintAddress);
    console.log('Market cap:', marketCapData.marketCap);
    console.log('Token supply:', marketCapData.tokenSupply);
  } catch (error) {
    console.error('Error fetching market cap data:', error);
  }
}

// Example usage
const mintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC
fetchPoolData(mintAddress);
fetchMarketCap(mintAddress);
```

A complete example is available in the `src/examples/basic-usage.ts` file.

## Example Mint Addresses

Here are some example Solana token mint addresses you can use for testing:

- **USDC**: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- **Solana (Wrapped SOL)**: `So11111111111111111111111111111111111111112`
- **Raydium**: `4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R`

## Development

### Building the Project

```bash
npm run build
```

### Adding New Commands

To add a new command:

1. Add the command implementation in `src/index.ts`
2. Add any necessary types or interfaces
3. Add a corresponding npm script in `package.json`
4. Rebuild and test the new command

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 