# eth-berlin-2024 - Betty

Betty is a curated privacy-preserving platform for auctions. Monetize successful deals while fostering inclusion and rightful hosting

On-chain identity encryption becomes the bedrock for many use cases. Initially, solving the racism case in housing in Germany is a big deal. Next, there are many opportunities:

## Test it!

First, clone the repository: ``` https://github.com/grmkris/eth-berlin-2024.git ```

Second, go to 'my-app' and install the necessary dependencies ```pnpm install```

Finally run the application with: ```pnpm dev ```

### The problem [Bet & Bed] solves
Berlin (and Germany in general) have a massive problem of racism in housing. 1/3 of experiences seems to end in racist experiences for immigrants looking for a house in the country. 

That’s the reason behind Bet & Bed, a solution that allows for blind auctions curated by on-chain activity to determine a better match with the house owner / host. Bet&Bed allows for a fairer distribution leveraging anonymity and allowing users to be judged by their actual persona, not the colour of their skin. With Bet & Bed we ensure collaboration using a more neutral system that can be helpful for this pain, or many others such as curated entrances to events, job descriptions, etc. 

Blind auctions are completely anonymous and the actual price of the spot is determined by the community bidding for it. The only one who is available to see the bids is the host and has to make a decision based on time, or he can close the bet as soon as he sees an offer that makes sense to him/her.


### Challenges you ran into

> Loading the fhevm wasm module and initializing it. Build custom provider that somehow uses the wasm module for encryption before creating the "payload" if i understand it correct
> ZAMA network does not show the wallet balance from metamask. -> Creating a personalized hook to display it. 
> Building an AGS app that run by defaul in serversite, but we wanted to run it on server client . -> Create a provider [wrapping Wagmi] to isolate it
> ZAMA encrypts info before storing it, and generate the WASM was challenging.  
> Learning how to use FHE library within the contract to do confidential compute. 
> Combining decentralized identities [for gatekeeping, transfering NFTs and confidential blinded auctions] was a challenge. 

### Technology used
Frontend: AGS React typescript webapp, shadcn ui components
Backend: Firebase realtime database to track the auction NFT and address. One improvement would be making a graph or storing it in IPFS
Smart contracts deployed in ZAMA network, FHEVM for encrypting, WAGMi, wallet connect... all in solidity
Encrypted ERC20 [Ownable 2step], ERC721 [OpenZeppelin].
