# BNB Vault
 BNB Vault: low gas transfers, smart savings, and easy card payments.

<img src="https://i.ibb.co/hZr30x4/New-Project-1.png">

## Fast Links:

- WALLET CODE: [CODE](./BNBvault/)

- PLAYSTORE LINK: [LINK](https://play.google.com/store/apps/details?id=com.altaga.bnbvault)

- VIDEO DEMO: [VIDEO](PENDING...)

### Mainnet Verified Contracts:

- [MULTI OWNER ACCOUNT ABSTRACTION ENTRYPOINT](https://bscscan.com/address/0x26c39F19f22B0f0f48725C4c1e5196aa5F9B7847#code)
- [MULTI OWNER ACCOUNT ABSTRACTION FACTORY](https://bscscan.com/address/0x0d29EBC0d84AF212762081e6c3f5993180f7C7cF#code)
- [BATCH TOKEN BALANCES](https://bscscan.com/address/0xE8E54474c7976a90E31f5FB17FB00e3B85dA4D1D#code)

# System Diagrams:

<img src="https://i.ibb.co/XXPCpKf/bnb-vault-drawio.png">

- Main Account: Within the schematics you can see that we have our main wallet, which is a Non Custodial Wallet, to which you will have to save its mnemonic at the time of its creation.

- Savings Account: This wallet, like the previous one, is a Non Custodial Wallet, which will save the savings on each transaction according to the chosen savings protocol.

- Card Account: Esa cuenta a diferencia de las dos anteriores es una Multi Owner Account Abstraction basada en [Alchemy MOAA SDK](https://github.com/alchemyplatform/light-account/blob/develop/src/MultiOwnerLightAccount.sol). Con esta cuenta podemos ejecutar pagos desde esta misma desde una cuenta en cloud y que el usuario mantenga el poder completo de sus assets.

# Screens:

BNB Vault is a blockchain wallet and platform that empowers undeserved communities through saving. Employing novel Blockchain technologies through BSC such as low gas payments and optimized savings. It also combines it with TradFi via seamless card payments.

## Wallet:

Our main screen is our Main Account, which is a traditional wallet to manage our assets. All balances and coins are in **Mainnet** and the code for this screen is as follows.

<img src="https://i.ibb.co/q5yM80B/vlcsnap-2024-08-21-19h07m40s146.png" width="32%">

In turn, this tab integrates the contract of [Batch Balances](./BNBvault/src/contracts/batchTokenBalances.js), which allows us to obtain all the balances of all the ERC20 Tokens in the BSC ecosystem from a single RPC Call this improve the RPC calls and UI for the users.

    const tokenBalances = new ethers.Contract(
        BatchTokenBalancesAddress,
        abiBatchTokenBalances,
        this.provider,
    );
    const [balanceTemp, tempBalances, tempDecimals] = await Promise.all([
        this.provider.getBalance(publicKey),
        tokenBalances.batchBalanceOf(publicKey, tokensArray),
        tokenBalances.batchDecimals(tokensArray),
    ]);

All technical implementations for this tab are included here.

- [CODE](./BNBvault/src/screens/main/tabs/tab1.js)
- [VERIFIED BATCH TOKEN BALANCES](https://bscscan.com/address/0xE8E54474c7976a90E31f5FB17FB00e3B85dA4D1D#code)

## Send:

This screen is important and allows us to make transfers from our wallet.

<img src="https://i.ibb.co/bJBjh2q/vlcsnap-2024-08-21-19h07m47s247.png" width="32%"> <img src="https://i.ibb.co/Qb05rYJ/vlcsnap-2024-08-21-19h59m24s184.png" width="32%">

It should be remembered that if the Savings account is active, one more transaction will be added to the final transfer to our savings account. All this is very easy to do with BSC. 

<img src="https://i.ibb.co/6RtVQVn/Screenshot-20240821-200038.png" width="32%">

All technical implementations for this tab are included here.

- [CODE](./BNBVault/src/screens/sendWallet/sendWallet.js)

## Receive:

With this screen, you can easily show your Wallet to receive funds, whether BNB or ERC20 Token.

<img src="https://i.ibb.co/pd3dXV5/vlcsnap-2024-08-21-19h07m53s613.png" width="32%">

All technical implementations for this tab are included here.
- [CODE](./BNBVault/src/screens/depositWallet/depositWallet.js) 

## Payment: 

In this tab we intend to make it the same as using a traditional POS, this allows us to enter the amount to be charged in USD and to be able to make the payment with one of our virtual cards. And this is the function code: 

<img src="https://i.ibb.co/cXMDvKs/Screenshot-2024-08-21-200457.png" width="32%"> <img src="https://i.ibb.co/Db3pCyv/vlcsnap-2024-08-21-20h05m14s360.png" width="32%"> <img src="https://i.ibb.co/LSpKZwc/vlcsnap-2024-08-21-20h05m53s120.png" width="32%">

Todos los pagos que se realizan en esta pantalla tienen que ser realizados con la tarjeta fisica, ya que es la que esta ligada a la Multi Owner Account Abstraction. Este proceso se realiza en [Card Tab](#cards)

All technical implementations for this tab are included here.
- [CODE](./BNBVault/src/screens/paymentWallet/paymentWallet.js)
- [WITHDRAW FROM CARD](./Cloud%20Function/cardTransaction/index.js)

## Savings:

The savings account is a Non Custodial Wallet which allows us to have savings based on protocols. We will explain these protocols a little later. However, on this screen you can withdraw the savings according to the defined date and the code on this screen is the next. 

<img src="https://i.ibb.co/pRn2m9Y/vlcsnap-2024-08-21-19h08m11s363.png" width="32%"> 

All technical implementations for this tab are included here.
- [CODE](./BNBVault/src/screens/main/tabs/tab2.js)

### Savings Protocol:

- Balanced Protocol, this protocol performs a weighted rounding according to the amount to be paid in the transaction, so that the larger the transaction, the greater the savings, in order not to affect the user. And this is the function code:

        export function balancedSavingToken(number, usd1, usd2) {
            const balance = number * usd1;
            let amount = 0;
            if (balance <= 1) {
                amount = 1;
            } else if (balance > 1 && balance <= 10) {
                amount = Math.ceil(balance);
            } else if (balance > 10 && balance <= 100) {
                const intBalance = parseInt(balance, 10);
                const value = parseInt(Math.round(intBalance).toString().slice(-2), 10);
                let unit = parseInt(Math.round(intBalance).toString().slice(-1), 10);
                let decimal = parseInt(Math.round(intBalance).toString().slice(-2, -1), 10);
                if (unit < 5) {
                unit = '5';
                decimal = decimal.toString();
                } else {
                unit = '0';
                decimal = (decimal + 1).toString();
                }
                amount = intBalance - value + parseInt(decimal + unit, 10);
            } else if (balance > 100) {
                const intBalance = parseInt(Math.floor(balance / 10), 10);
                amount = (intBalance + 1) * 10;
            }
            return new Decimal(amount).sub(new Decimal(balance)).div(usd2).toNumber();
        }

- Percentage protocol, unlike the previous protocol, this one aims to always save a percentage selected in the UI.

        export function percentageSaving(number, percentage) {
            return number * (percentage / 100);
        }

All technical implementations for this tab are included here.
- [CODE](./BNBVault/src/utils/utils.js)

## Cards:

Finally, in the cards section, we can create a virtual card, which will help us make payments without the need for our wallet directly with a physical card in any POS terminal with BNBVault. Es importante aclarar que al tener una Multi Owner Account Abstraction Wallet, de forma decentralizada el usuario sigue teniendo el control completo de su wallet. Y solo es posible realizar los pagos con tarjeta con el hash que este tiene al realizar un pago contactless. 

<img src="https://i.ibb.co/0ss4jrf/vlcsnap-2024-08-21-19h08m16s342.png" width="32%"> <img src="https://i.ibb.co/Qb05rYJ/vlcsnap-2024-08-21-19h59m24s184.png" width="32%">

All technical implementations for this tab are included here.
- [CODE](./BNBVault/src/screens/main/tabs/tab3.js)
- [ADD CARD](./Cloud%20Function/addCard/index.js)
- [MULTI OWNER ACCOUNT ABSTRACTION ENTRYPOINT](https://bscscan.com/address/0x26c39F19f22B0f0f48725C4c1e5196aa5F9B7847#code)
- [MULTI OWNER ACCOUNT ABSTRACTION FACTORY](https://bscscan.com/address/0x0d29EBC0d84AF212762081e6c3f5993180f7C7cF#code)