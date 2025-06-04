/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - proyekWS
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyekWS` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `proyekWS`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin` */

insert  into `admin`(`id_admin`,`username`,`password`,`is_deleted`,`createdAt`,`updatedAt`) values 
(1,'rafael','$2b$10$SIU854kEy6DBCtcTZiv6N.BUpS6HNN3p2/vblpNwP5I7W/AEC/WYy',0,'2025-05-28 15:01:08','2025-05-28 15:01:08');

/*Table structure for table `asset` */

DROP TABLE IF EXISTS `asset`;

CREATE TABLE `asset` (
  `id_asset` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double DEFAULT NULL,
  `description` text DEFAULT NULL,
  `symbol` varchar(50) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `asset` */

insert  into `asset`(`id_asset`,`name`,`price`,`description`,`symbol`,`is_deleted`,`createdAt`,`updatedAt`) values 
('aave','Aave',266.43,'Aave is a decentralized money market protocol where users can lend and borrow cryptocurrency across 20 different assets as collateral. The protocol has a native token called AAVE, which is also a governance token that lets the community decide the direction of the protocol in a collective manner. Lenders can earn interest by providing liquidity to the market, while borrowers can borrow by collateralizing their cryptoassets to take out loans from the liquidity pools.\r\n\r\n','aave',0,'2025-05-28 15:17:14','2025-05-28 15:17:14'),
('aptos','Aptos',5.28,'Aptos is a new, independent high-performance PoS Layer 1 project focused on delivering the safest and most scalable Layer 1 blockchain in the world. The Aptos blockchain leverages the Move programming language and the Move VM for application development, which are created and optimized for blockchain use cases.The team is comprised of the original creators, researchers, designers, and builders of Diem, the blockchain that was first built to serve this purpose. Aptos raised $200m from a16z, Multicoin, Binance and others. Aptos launched Devnet in mid March, incentivized testnet in late May and targets Q3 for mainnet launch. ','apt',0,'2025-05-28 15:18:05','2025-05-28 15:18:05'),
('avalanche-2','Avalanche',23.11,'Avalanche is a high throughput smart contract blockchain platform. Validators secure the network through a proof-of-stake consensus protocol. It is said to be fast, low cost, and environmental friendly.','avax',0,'2025-05-28 15:14:43','2025-05-28 15:14:43'),
('binance-bridged-usdt-bnb-smart-chain','Binance Bridged USDT (BNB Smart Chain)',1.001,NULL,'bsc-usd',0,'2025-05-28 15:16:20','2025-05-28 15:16:20'),
('binancecoin','BNB',683.16,NULL,'bnb',0,'2025-05-28 15:13:34','2025-05-28 15:13:34'),
('bitcoin','Bitcoin',107612,'Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the SHA-256 hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as Litecoin, Peercoin, Primecoin, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by Ethereum which led to the development of other amazing projects such as EOS, Tron, and even crypto-collectibles such as CryptoKitties.','btc',0,'2025-05-28 15:13:10','2025-05-28 15:13:10'),
('bitcoin-cash','Bitcoin Cash',408.32,'Bitcoin Cash is a hard fork of Bitcoin with a protocol upgrade to fix on-chain capacity. Bitcoin Cash intends to be a Bitcoin without Segregated Witness (SegWit) as soft fork, where upgrades of the protocol are done mainly through hard forks and without changing the original economic rules of the Bitcoin.\r\n\r\nBitcoin Cash (BCH) is released on 1st August 2017 as an upgraded version of the original Bitcoin Core software. The main upgrade is the increase in the block size limit from 1MB to 8MB. This effectively allows miners on the BCH chain to process up to 8 times more payments per second in comparison to Bitcoin. This makes for faster, cheaper transactions and a much smoother user experience.\r\n\r\nWhy was Bitcoin Cash Created?\r\n\r\nThe main objective of Bitcoin Cash is to to bring back the essential qualities of money inherent in the original Bitcoin software. Over the years, these qualities were filtered out of Bitcoin Core and progress was stifled by various people, organizations, and companies involved in Bitcoin protocol development. The result is that Bitcoin Core is currently unusable as money due to increasingly high fees per transactions and transfer times taking hours to complete. This is all because of the 1MB limitation of Bitcoin Core’s block size, causing it unable to accommodate to large number of transactions.\r\n\r\nEssentially Bitcoin Cash is a community-activated upgrade (otherwise known as a hard fork) of Bitcoin that increased the block size to 8MB, solving the scaling issues that plague Bitcoin Core today.\r\n\r\nNov 16th 2018: A hashwar resulted in a split between Bitcoin SV and Bitcoin ABC','bch',0,'2025-05-28 15:15:30','2025-05-28 15:15:30'),
('bitget-token','Bitget Token',5.23,NULL,'bgb',0,'2025-05-28 15:16:14','2025-05-28 15:16:14'),
('bittensor','Bittensor',435.56,'Bittensor is an open-source protocol that powers a decentralized, blockchain-based machine learning network. Machine learning models train collaboratively and are rewarded in TAO according to the informational value they offer the collective. TAO also grants external access, allowing users to extract information from the network while tuning its activities to their needs.\r\n\r\nUltimately, BitTensors vision is to create a pure market for artificial intelligence, an incentivized arena in which consumers and producers of this valuable commodity can interact in a trustless, open and transparent context.\r\n\r\nBittensor enables:\r\n\r\n-A novel, optimized strategy for the development and distribution of artificial intelligence technology by leveraging the possibilities of a distributed ledger. Specifically, its facilitation of open access/ownership, decentralized governance, and the ability to harness globally-distributed resources of computing power and innovation within an incentivized framework.\r\n\r\n-An open-source repository of machine intelligence, accessible to anyone, anywhere, thus creating the conditions for open and permission-less innovation on a global internet scale.\r\n\r\n-Distribution of rewards and network ownership to users in direct proportion to the value they have added.','tao',0,'2025-05-28 15:17:46','2025-05-28 15:17:46'),
('blackrock-usd-institutional-digital-liquidity-fund','BlackRock USD Institutional Digital Liquidity Fund',1,NULL,'buidl',0,'2025-05-28 15:18:33','2025-05-28 15:18:33'),
('cardano','Cardano',0.748415,NULL,'ada',0,'2025-05-28 15:13:57','2025-05-28 15:13:57'),
('chainlink','Chainlink',15.61,'Chainlink is a framework for building Decentralized Oracle Networks (DONs) that bring real-world data onto blockchain networks, enabling the creation of hybrid smart contracts. These DONs provide decentralized services such as Price Feeds, Proof of Reserve, Verifiable Randomness, Keepers, and the ability to connect to any web API. \r\n\r\nIt aims to ensure that the external information (pricing, weather data, event outcomes, etc.) and off-chain computations (randomness, transaction automation, fair ordering, etc.) fed to on-chain smart contracts are reliable and tamper-proof.https://www.instagram.com/chainlinklabs','link',0,'2025-05-28 15:14:37','2025-05-28 15:14:37'),
('coinbase-wrapped-btc','Coinbase Wrapped BTC',107817,'Coinbase Wrapped BTC (\"cbBTC\") is a token that is backed 1:1 by native Bitcoin (BTC) held by Coinbase, meaning that for all cbBTC in circulation, there is an equivalent amount of BTC held in a secure custody solution (including cold storage) provided by Coinbase. Wrapped assets, like cbBTC, are transferable tokens that are redeemable for the underlying asset. Coinbase customers can unwrap cbBTC and redeem a corresponding amount of the underlying BTC simply by depositing the cbBTC into their Coinbase accounts. cbBTC is built to be seamlessly compatible with DeFi applications, giving customers the option to tap into DeFi and unlock financial utility. cbBTC removes a key point of friction by allowing customers to use Bitcoin they already hold in new ways onchain. cbBTC is built to be seamlessly compatible with DeFi applications, so users can now tap into novel DeFi use cases like providing their Bitcoin as liquidity to DeFi protocols, using it as collateral to borrow other crypto assets, or spending it as a payment method. Wrapped assets like cbBTC are a mature concept in the crypto world, helping to bring more liquid assets onchain and facilitate an expansive financial ecosystem.\r\n','cbbtc',0,'2025-05-28 15:16:43','2025-05-28 15:16:43'),
('crypto-com-chain','Cronos',0.097356,NULL,'cro',0,'2025-05-28 15:18:39','2025-05-28 15:18:39'),
('dai','Dai',1,'MakerDAO has launched Multi-collateral DAI (MCD). This token refers to the new DAI that is collaterized by multiple assets.\r\n','dai',0,'2025-05-28 15:17:52','2025-05-28 15:17:52'),
('dogecoin','Dogecoin',0.219547,NULL,'doge',0,'2025-05-28 15:13:51','2025-05-28 15:13:51'),
('ethena-usde','Ethena USDe',1.002,NULL,'usde',0,'2025-05-28 15:16:37','2025-05-28 15:16:37'),
('ethereum','Ethereum',2635.64,'Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes tokens, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more.\r\n\r\nOn Ethereum, all transactions and smart contract executions require a small fee to be paid. This fee is called Gas. In technical terms, Gas refers to the unit of measure on the amount of computational effort required to execute an operation or a smart contract. The more complex the execution operation is, the more gas is required to fulfill that operation. Gas fees are paid entirely in Ether (ETH), which is the native coin of the blockchain. The price of gas can fluctuate from time to time depending on the network demand.','eth',0,'2025-05-28 15:13:16','2025-05-28 15:13:16'),
('ethereum-classic','Ethereum Classic',18.36,NULL,'etc',0,'2025-05-28 15:18:50','2025-05-28 15:18:50'),
('hedera-hashgraph','Hedera',0.183271,'Hedera is a decentralized public network where developers can build secure, fair applications with near real-time consensus. The platform is owned and governed by a council of global innovators including Avery Dennison, Boeing, Deutsche Telekom, DLA Piper, FIS (WorldPay), Google, IBM, LG Electronics, Magalu, Nomura, Swirlds, Tata Communications, University College London (UCL), Wipro, and Zain Group. \r\n\r\nThe Hedera Consensus Service (HCS) acts as a trust layer for any application or permissioned network and allows for the creation of an immutable and verifiable log of messages. Application messages are submitted to the Hedera network for consensus, given a trusted timestamp, and fairly ordered. Use HCS to track assets across a supply chain, create auditable logs of events in an advertising platform, or even use it as a decentralized ordering service.\r\n\r\n','hbar',0,'2025-05-28 15:15:36','2025-05-28 15:15:36'),
('hyperliquid','Hyperliquid',33.84,NULL,'hype',0,'2025-05-28 15:14:25','2025-05-28 15:14:25'),
('internet-computer','Internet Computer',5.3,NULL,'icp',0,'2025-05-28 15:18:44','2025-05-28 15:18:44'),
('jito-staked-sol','Jito Staked SOL',205.32,NULL,'jitosol',0,'2025-05-28 15:18:22','2025-05-28 15:18:22'),
('leo-token','LEO Token',9.07,NULL,'leo',0,'2025-05-28 15:15:04','2025-05-28 15:15:04'),
('litecoin','Litecoin',95.2,NULL,'ltc',0,'2025-05-28 15:15:47','2025-05-28 15:15:47'),
('mantle','mantle',1000,NULL,'mantle',0,'2025-05-28 22:22:44','2025-05-28 15:27:43'),
('monero','Monero',351.11,NULL,'xmr',0,'2025-05-28 15:16:09','2025-05-28 15:16:09'),
('near','NEAR Protocol',2.8,'NEAR Protocol is the blockchain for AI. A high-performance, AI-native platform built to power the next generation of decentralized applications and intelligent agents. It provides the infrastructure AI needs to transact, operate, and interact across Web2 and Web3. NEAR combines three core elements: User-Owned AI, which ensures agents act in users’ best interests; Intents and Chain Abstraction, which eliminate blockchain complexity for seamless, goal-driven transactions across chains; and a sharded blockchain architecture that delivers the scalability, speed, and low-cost execution needed for real-world AI and Web3 use. This integrated stack makes NEAR the foundation for building secure, user-owned, AI-native applications at internet scale.','near',0,'2025-05-28 15:17:58','2025-05-28 15:17:58'),
('okb','OKB',51.95,NULL,'okb',0,'2025-05-28 15:18:16','2025-05-28 15:18:16'),
('ondo-finance','Ondo',0.929241,NULL,'ondo',0,'2025-05-28 15:18:27','2025-05-28 15:18:27'),
('pepe','Pepe',0.00001373,NULL,'pepe',0,'2025-05-28 15:16:26','2025-05-28 15:16:26'),
('pi-network','Pi Network',0.735918,NULL,'pi',0,'2025-05-28 15:16:31','2025-05-28 15:16:31'),
('polkadot','Polkadot',4.52,NULL,'dot',0,'2025-05-28 15:15:58','2025-05-28 15:15:58'),
('ripple','XRP',2.28,'Ripple is the catchall name for the cryptocurrency platform, the transactional protocol for which is actually XRP, in the same fashion as Ethereum is the name for the platform that facilitates trades in Ether. Like other cryptocurrencies, Ripple is built atop the idea of a distributed ledger network which requires various parties to participate in validating transactions, rather than any singular centralized authority. That facilitates transactions all over the world, and transfer fees are far cheaper than the likes of bitcoin. Unlike other cryptocurrencies, XRP transfers are effectively immediate, requiring no typical confirmation time.\r\n\r\nRipple was originally founded by a single company, Ripple Labs, and continues to be backed by it, rather than the larger network of developers that continue bitcoin’s development. It also doesn’t have a fluctuating amount of its currency in existence. Where bitcoin has a continually growing pool with an eventual maximum, and Ethereum theoretically has no limit, Ripple was created with all of its 100 billion XRP tokens right out of the gate. That number is maintained with no mining and most of the tokens are owned and held by Ripple Labs itself — around 60 billion at the latest count.\r\n\r\nEven at the recently reduced value of around half a dollar per XRP, that means Ripple Labs is currently sitting on around $20 billion worth of the cryptocurrency (note: Ripple’s price crashed hard recently, and may be worth far less than $60 billion by time you read this). It holds 55 billion XRP in an escrow account, which allows it to sell up to a billion per month if it so chooses in order to fund new projects and acquisitions. Selling such an amount would likely have a drastic effect on the cryptocurrency’s value, and isn’t something Ripple Labs plans to do anytime soon.\r\n\r\nIn actuality, Ripple Labs is looking to leverage the technology behind XRP to allow for faster banking transactions around the world. While Bitcoin and other cryptocurrencies are built on the idea of separating financial transactions from the financial organizations of traditional currencies, Ripple is almost the opposite in every sense.\r\n\r\nXRP by Ripple price can be found on this page alongside the market capitalization and additional stats.\r\n\r\n','xrp',0,'2025-05-28 15:13:29','2025-05-28 15:13:29'),
('shiba-inu','Shiba Inu',0.00001414,'Shiba Inu (SHIB) is a meme token which began as a fun currency and has now transformed into a decentralized ecosystem. During the initial launch, 50% of the supply was allocated into Vitalik Buterin\'s ethereum wallet. \r\n\r\nAs a result of that, Vitalik proceeded to donate 10% of his SHIB holdings to a COVID-19 relief effort in India and the remaining 40% is burnt forever. That donation was worth about $1 billion at that time, which makes it one of the largest donation ever in the world.\r\n\r\nWhat is the Shiba Inu community working on right now? The Shiba Inu team launched a decentralized exchange called Shibaswap with 2 new tokens, LEASH and BONE. LEASH is a scarce supply token that is used to offer incentives on Shibaswap. BONE is the governance token for holders to vote on proposals on Doggy DAO.','shib',0,'2025-05-28 15:15:10','2025-05-28 15:15:10'),
('solana','Solana',170.74,NULL,'sol',0,'2025-05-28 15:13:40','2025-05-28 15:13:40'),
('staked-ether','Lido Staked Ether',2629.13,NULL,'steth',0,'2025-05-28 15:14:08','2025-05-28 15:14:08'),
('stellar','Stellar',0.283599,'The Stellar network is an open source, distributed, and community owned network used to facilitate cross-asset transfers of value. Stellar aims to help facilitate cross-asset transfer of value at a fraction of a penny while aiming to be an open financial system that gives people of all income levels access to low-cost financial services. Stellar can handle exchanges between fiat-based currencies and between cryptocurrencies. Stellar.org, the organization that supports Stellar, is centralized like XRP and meant to handle cross platform transactions and micro transactions like XRP. However, unlike Ripple, Stellar.org is non-profit and their platform itself is open source and decentralized. \r\n\r\nStellar was founded by Jed McCaleb in 2014. Jed McCaleb is also the founder of Mt. Gox and co-founder of Ripple, launched the network system Stellar with former lawyer Joyce Kim. Stellar is also a payment technology that aims to connect financial institutions and drastically reduce the cost and time required for cross-border transfers. In fact, both payment networks used the same protocol initially.\r\n\r\nDistributed Exchange\r\nThrough the use of its intermediary currency Lumens (XLM), a user can send any currency that they own to anyone else in a different currency.\r\n\r\nFor instance, if Joe wanted to send USD to Mary using her EUR, an offer is submitted to the distributed exchange selling USD for EUR. This submitted offer forms is known as an order book. The network will use the order book to find the best exchange rate for the transaction in-order to minimize the fee paid by a user.\r\n\r\nThis multi-currency transaction is possible because of \"Anchors\". Anchors are trusted entities that hold people’s deposits and can issue credit. In essence, Anchors serves as the bridge between different currencies and the Stellar network.\r\n\r\nLumens (XLM)\r\nLumens are the native asset (digital currency) that exist on the Stellar network that helps to facilitate multi-currency transactions and prevent spams. For multi-currency transactions, XLM is the digital intermediary that allows for such a transaction to occur at a low cost.\r\n\r\nIn-order to prevent DoS attacks (aka spams) that would inevitably occur on the Stellar network, a small fee of 0.00001 XLM is associated with every transaction that occurs on the network. This fee is small enough so it does not significantly affect the cost of transaction, but large enough so it dissuades bad actors from spamming the network. \r\n\r\nPrior to Protocol 12, Stellar had a built-in inflation mechanism conceived to allow account holders to collectively direct inflation-generated lumens toward projects built on Stellar.\r\n\r\nAs the network evolved and grew, it became increasingly clear that inflation wasn’t working as intended — account holders either didn’t set their inflation destination or joined inflation pools to claim the inflation themselves, and the operational costs associated with inflation payments continued to rise — and so a protocol change to disable inflation was proposed, implemented, voted on by validators, and ultimately adopted as part of a network upgrade.\r\n\r\nThe inflation operation is now deprecated.\r\nhttps://developers.stellar.org/docs/glossary/inflation/\r\n','xlm',0,'2025-05-28 15:14:52','2025-05-28 15:14:52'),
('sui','Sui',3.59,NULL,'sui',0,'2025-05-28 15:14:19','2025-05-28 15:14:19'),
('tether','Tether',1,'Tether (USDT) is a cryptocurrency with a value meant to mirror the value of the U.S. dollar. The idea was to create a stable cryptocurrency that can be used like digital dollars. Coins that serve this purpose of being a stable dollar substitute are called “stable coins.” Tether is the most popular stable coin and even acts as a dollar replacement on many popular exchanges! According to their site, Tether converts cash into digital currency, to anchor or “tether” the value of the coin to the price of national currencies like the US dollar, the Euro, and the Yen. Like other cryptos it uses blockchain. Unlike other cryptos, it is [according to the official Tether site] “100% backed by USD” (USD is held in reserve). The primary use of Tether is that it offers some stability to the otherwise volatile crypto space and offers liquidity to exchanges who can’t deal in dollars and with banks (for example to the sometimes controversial but leading exchange Bitfinex).\r\n\r\nThe digital coins are issued by a company called Tether Limited that is governed by the laws of the British Virgin Islands, according to the legal part of its website. It is incorporated in Hong Kong. It has emerged that Jan Ludovicus van der Velde is the CEO of cryptocurrency exchange Bitfinex, which has been accused of being involved in the price manipulation of bitcoin, as well as tether. Many people trading on exchanges, including Bitfinex, will use tether to buy other cryptocurrencies like bitcoin. Tether Limited argues that using this method to buy virtual currencies allows users to move fiat in and out of an exchange more quickly and cheaply. Also, exchanges typically have rocky relationships with banks, and using Tether is a way to circumvent that.\r\n\r\nUSDT is fairly simple to use. Once on exchanges like Poloniex or Bittrex, it can be used to purchase Bitcoin and other cryptocurrencies. It can be easily transferred from an exchange to any Omni Layer enabled wallet. Tether has no transaction fees, although external wallets and exchanges may charge one. In order to convert USDT to USD and vise versa through the Tether.to Platform, users must pay a small fee. Buying and selling Tether for Bitcoin can be done through a variety of exchanges like the ones mentioned previously or through the Tether.to platform, which also allows the conversion between USD to and from your bank account.\r\n\r\n','usdt',0,'2025-05-28 15:13:23','2025-05-28 15:13:23'),
('the-open-network','Toncoin',3.46,'TON (The Open Network) is a general-purpose blockchain that allows developers to build decentralized apps and tokens.','ton',0,'2025-05-28 15:14:58','2025-05-28 15:14:58'),
('tokenize-xchange','Tokenize Xchange',38.94,NULL,'tkx',0,'2025-05-28 15:18:10','2025-05-28 15:18:10'),
('tron','TRON',0.275123,NULL,'trx',0,'2025-05-28 15:14:03','2025-05-28 15:14:03'),
('uniswap','Uniswap',6.68,'UNI is the governance token for Uniswap, an Automated Market Marker DEX on the Ethereum blockchain. The UNI token allows token holders to participate in the governance of the protocol. Key decisions such as usage of the treasury or future upgrades can be decided through a governance vote.','uni',0,'2025-05-28 15:17:20','2025-05-28 15:17:20'),
('usd-coin','USDC',0.999773,NULL,'usdc',0,'2025-05-28 15:13:46','2025-05-28 15:13:46'),
('usds','USDS',0.999815,NULL,'usds',0,'2025-05-28 15:15:52','2025-05-28 15:15:52'),
('weth','WETH',2642.96,NULL,'weth',0,'2025-05-28 15:15:41','2025-05-28 15:15:41'),
('whitebit','WhiteBIT Coin',31.59,'What is WhiteBIT Token?\r\n\r\nWBT is a utility token of the largest European cryptocurrency exchange, WhiteBIT. The platform was established in 2018 and has already become one of the leading crypto exchanges with 3+ mln users worldwide. WhiteBIT’s goal is to contribute to the mass adoption and popularization of blockchain technologies by implementing the most effective trading and staking tools on the most convenient terms. The most popular and efficient trading orders for spot and margin trading, up to 20x leverage for margin and perpetual Bitcoin futures trading, unique passive income tools, a referral program, and the lowest trading fees on the market are only part of the functionality available on WhiteBIT. Discover the full potential of the platform at the link: https://whitebit.com/.\r\n\r\nWBT is a full-fledged product of the whole WhiteBIT ecosystem that is integrated into all WhiteBIT services, making it easier for the users to interact on the platform. WBT is a solid base for dozens of blockchain startups, new projects, and fruitful trading. Moreover, WhiteBIT Token is a reliable asset that can be used for staking on its native platform, which provides numerous perks to its holders and owners. \r\n\r\nKey advantages:\r\n\r\nincreased referral interest rate (up to 50%);\r\ndecreased trading fees; \r\nfree daily ERC-20/ETH withdrawals;\r\nfree daily AML checks; \r\nintegration with the current and future products of WhiteBIT and much more.\r\n\r\nWBT tokenomics\r\n\r\nThe token supply is limited to 400 000 000 WBT, with no new tokens to be created in the future. 200M of this amount is treasury tokens that are backing the total amount and will be unlocked within the next three months after the launch. \r\n\r\nTrading competitions, airdrops, bounties, beneficial holding programs, and access to the token from other exchange platforms are part of activities associated with the WBT cryptocurrency available on WhiteBIT. \r\n','wbt',0,'2025-05-28 15:17:08','2025-05-28 15:17:08'),
('wrapped-bitcoin','Wrapped Bitcoin',107615,NULL,'wbtc',0,'2025-05-28 15:14:14','2025-05-28 15:14:14'),
('wrapped-eeth','Wrapped eETH',2818.76,NULL,'weeth',0,'2025-05-28 15:16:03','2025-05-28 15:16:03'),
('wrapped-steth','Wrapped stETH',3188.76,NULL,'wsteth',0,'2025-05-28 15:14:31','2025-05-28 15:14:31');

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `id_asset` varchar(50) DEFAULT NULL,
  `TYPE` enum('market','limit') DEFAULT NULL,
  `side` enum('buy','sell') DEFAULT NULL,
  `price` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `filled_amount` double DEFAULT 0,
  `total` double DEFAULT NULL,
  `STATUS` enum('open','partial','filled','cancelled') DEFAULT 'open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `orders` */

insert  into `orders`(`id`,`user_id`,`id_asset`,`TYPE`,`side`,`price`,`amount`,`filled_amount`,`total`,`STATUS`,`created_at`) values 
(1,4,'mantle','market','buy',0.737458,2.71201885,0,2,'filled','2025-05-27 15:22:51'),
(2,5,'mantle','limit','buy',1000,10,10,10000,'filled','2025-05-28 22:24:03'),
(3,5,'mantle','limit','buy',1000,2,2,2000,'filled','2025-05-28 22:25:52'),
(4,6,'mantle','market','buy',1000,11,0,11000,'filled','2025-05-28 22:27:40'),
(5,6,'mantle','market','buy',1000,1,0,1000,'partial','2025-05-28 22:28:17'),
(6,6,'mantle','market','sell',1000,10,0,10000,'filled','2025-05-28 22:30:05'),
(7,6,'mantle','market','sell',1000,2,0,2000,'partial','2025-05-28 22:30:38');

/*Table structure for table `payment_method` */

DROP TABLE IF EXISTS `payment_method`;

CREATE TABLE `payment_method` (
  `id_payment` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_payment`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `payment_method` */

insert  into `payment_method`(`id_payment`,`name`) values 
(1,'Gopay'),
(2,'Dana'),
(3,'Bank Transfer');

/*Table structure for table `portofolio` */

DROP TABLE IF EXISTS `portofolio`;

CREATE TABLE `portofolio` (
  `id_portofolio` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_asset` varchar(255) DEFAULT NULL,
  `avg_price` double DEFAULT NULL,
  `jumlah` double DEFAULT NULL,
  PRIMARY KEY (`id_portofolio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `portofolio` */

insert  into `portofolio`(`id_portofolio`,`id_user`,`id_asset`,`avg_price`,`jumlah`) values 
(1,6,'mantle',375.46091125,20),
(2,5,'mantle',1000,12);

/*Table structure for table `transaksi` */

DROP TABLE IF EXISTS `transaksi`;

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_asset` varchar(255) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `status` enum('Buy','Sell') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_transaksi`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `transaksi` */

insert  into `transaksi`(`id_transaksi`,`id_user`,`id_asset`,`jumlah`,`harga`,`status`,`createdAt`,`updatedAt`) values 
(1,5,'bitcoin',5,520540,'Buy','2025-05-13 16:32:33','2025-05-13 16:32:33'),
(2,4,'mantle',2,1.52874,'Buy','2025-05-15 07:12:35','2025-05-15 07:12:35'),
(3,4,'mantle',2147483647,76437000000,'Buy','2025-05-15 07:13:10','2025-05-15 07:13:10');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `saldo` decimal(11,0) DEFAULT NULL,
  `asset_slot` int(11) DEFAULT NULL,
  `subscription` enum('Free','Pro') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user` */

insert  into `user`(`id_user`,`username`,`password`,`email`,`name`,`saldo`,`asset_slot`,`subscription`,`createdAt`,`updatedAt`) values 
(1,'Kevin','12345678','kevin.c23@mhs.istts.ac.id','KEVIN',0,5,'Free','2025-05-12 09:44:53','2025-05-12 09:44:53'),
(3,'rsl','$2b$10$zA1zbRRWo6b7Ltk2fnrPJ.kndfJnYO3bdI4UVk9XY3ewk5u0i3j.y','rasl@gmail.com','RASOLL',0,5,'Free','2025-05-13 07:36:09','2025-05-13 07:36:09'),
(4,'rslaBaru','$2b$10$U/xaZZ3jd.mGQfVcYas8p.d/QgQWhFPWIhCXXv4LTEIDwH6R3bvWy','rasl33@gmail.com','RASOLL',1009999,5,'Free','2025-05-13 07:58:34','2025-05-28 15:13:19'),
(5,'Kace','$2b$10$G8kanKvFCiUb1nj1bpts8.qKB1PYTejwxp.zYN5NrZ6A5iw2B4r8S','Kevin.c24@mhs.istts.ac.id','KEVIN',100000,5,'Free','2025-05-13 12:26:57','2025-05-28 15:30:36'),
(6,'Rafael','$2b$10$9EZf.i2mMVeLNdYRGlTzze8d/vGfeeTYOHVekGAg9UeJBsm5ao1Vu','rafael@gmail.com','L',100000,5,'Free','2025-05-28 15:00:37','2025-05-28 15:30:40');

/*Table structure for table `watchlist` */

DROP TABLE IF EXISTS `watchlist`;

CREATE TABLE `watchlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) NOT NULL,
  `id_asset` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_watch` (`id_user`,`id_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `watchlist` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
