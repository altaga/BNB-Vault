// Basic Imports
import React from 'react';
import {blockchain} from './constants';

const ContextModule = React.createContext();

// Context Provider Component

class ContextProvider extends React.Component {
  // define all the values you want to use in the context
  constructor(props) {
    super(props);
    this.state = {
      value: {
        // Main Wallet
        publicKey: null,
        balances: blockchain.tokens.map(() => 0),
        activeTokens: blockchain.tokens.map(() => true),
        // Savings
        publicKeySavings: null,
        balancesSavings: blockchain.tokens.map(() => 0),
        activeTokensSavings: blockchain.tokens.map(() => true),
        // State Flag of Savings
        savingsActive: false,
        periodSelected: 1,
        protocolSelected: 1,
        savingsDate: 0,
        percentage: 0,
        // Card
        publicKeyCard: null,
        balancesCard: blockchain.tokens.map(() => 0),
        activeTokensCard: blockchain.tokens.map(() => true),
        // Utils
        usdConversion: blockchain.tokens.map(() => 1),
        // Transaction Active
        isTransactionActive: false, // false
        transactionData: {
          walletSelector: 0,
          command: 'transfer',
          label: '',
          to: '',
          amount: '0.0',
          tokenSymbol: blockchain.tokens[0].symbol,
          maxFlag: false,
          withSavings: false,
        },
      },
    };
  }

  setValue = (value, then = () => {}) => {
    this.setState(
      {
        value: {
          ...this.state.value,
          ...value,
        },
      },
      () => then(),
    );
  };

  render() {
    const {children} = this.props;
    const {value} = this.state;
    // Fill this object with the methods you want to pass down to the context
    const {setValue} = this;

    return (
      <ContextModule.Provider
        // Provide all the methods and values defined above
        value={{
          value,
          setValue,
        }}>
        {children}
      </ContextModule.Provider>
    );
  }
}

// Dont Change anything below this line

export {ContextProvider};
export const ContextConsumer = ContextModule.Consumer;
export default ContextModule;
