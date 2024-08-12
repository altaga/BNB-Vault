import {Image} from 'react-native';
import BNB from '../assets/logos/bnb.png';
import ETH from '../assets/logos/eth.png';
import BUSD from '../assets/logos/busd.png';
import WBNB from '../assets/logos/bnb.png';
import USDC from '../assets/logos/usdc.png';

const w = 50;
const h = 50;

export const refreshRate = 1000 * 60;

export const iconsBlockchain = {
  bnb: <Image source={BNB} style={{width: w, height: h, borderRadius: 10}} />,
  eth: <Image source={ETH} style={{width: w, height: h, borderRadius: 10}} />,
  busd: <Image source={BUSD} style={{width: w, height: h, borderRadius: 10}} />,
  wbnb: <Image source={WBNB} style={{width: w, height: h, borderRadius: 10}} />,
  usdc: <Image source={USDC} style={{width: w, height: h, borderRadius: 10}} />,
};

export const blockchain = {
  network: 'Binance Smart Chain',
  token: 'BNB',
  blockExplorer: 'https://bscscan.com/',
  rpc: 'https://binance.llamarpc.com/',
  iconSymbol: 'bnb',
  decimals: 18,
  tokens: [
    // Updated April/19/2024
    {
      name: 'Binance Coin',
      symbol: 'BNB',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      icon: iconsBlockchain.bnb,
      coingecko: 'binancecoin',
    },
    {
      name: 'Wrapped BNB',
      symbol: 'WBNB',
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      decimals: 18,
      icon: iconsBlockchain.wbnb,
      coingecko: 'wbnb',
    },
    {
      name: 'Binance USD',
      symbol: 'BUSD',
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      decimals: 18,
      icon: iconsBlockchain.busd,
      coingecko: 'binance-peg-busd',
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      decimals: 18,
      icon: iconsBlockchain.usdc,
      coingecko: 'usd-coin',
    },
    {
      name: 'Ethereum Peg',
      symbol: 'ETH',
      address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      decimals: 18,
      icon: iconsBlockchain.eth,
      coingecko: 'ethereum',
    },
  ],
};

export const EntryPoint = '0x26c39F19f22B0f0f48725C4c1e5196aa5F9B7847';
export const MultiOwnerAccountAbstractionFactory =
  '0x0d29EBC0d84AF212762081e6c3f5993180f7C7cF';
export const BatchTokenBalancesAddress =
  '0xE8E54474c7976a90E31f5FB17FB00e3B85dA4D1D';

// Cloud Account Credentials
export const CloudAccountController =
  '0x72b9EB24BFf9897faD10B3100D35CEE8eDF8E43b';
export const CloudPublicKeyEncryption = `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAtflt9yF4G1bPqTHtOch47UW9hkSi4u2EZDHYLLSKhGMwvHjajTM+
wcgxV8dlaTh1av/2dWb1EE3UMK0KF3CB3TZ4t/p+aQGhyfsGtBbXZuwZAd8CotTn
BLRckt6s3jPqDNR3XR9KbfXzFObNafXYzP9vCGQPdJQzuTSdx5mWcPpK147QfQbR
K0gmiDABYJMMUos8qaiKVQmSAwyg6Lce8x+mWvFAZD0PvaTNwYqcY6maIztT6h/W
mfQHzt9Z0nwQ7gv31KCw0Tlh7n7rMnDbr70+QVd8e3qMEgDYnx7Jm4BzHjr56IvC
g5atj1oLBlgH6N/9aUIlP5gkw89O3hYJ0QIDAQAB
-----END RSA PUBLIC KEY-----
`;
