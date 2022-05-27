# Todos

- [ ] Write tests
- [ ] Confirm near token creation mechanisms
- [ ] Implement burning
- [ ] Implement revoking
- [ ] EVENT_JSON needs updating
- [ ] FIXME: NFTContractMetadata {
      spec: "nft-1.0.0".to_string(),
      name: "NFT Tutorial Contract".to_string(),
      symbol: "GOTEAM".to_string(),
      icon: None,
      base_uri: None,
      reference: None,
      reference_hash: None,
      },
      )

# Smart contracts

"factory" is the creator of NTT token contracts.
"token" is the actual NTT token contract being deployed by "factory"

Both are rust based smart contracts for the NEAR blockchain

# Smart contract source basis

Token

https://github.com/near-examples/nft-tutorial/tree/main/nft-contract

Factory

https://github.com/near-examples/token-factory/

# Smart contract testing

cd factory
cargo build
sh build.sh
cargo test --package token-factory -- --nocapture

cd ..
cd token
cargo build
sh build.sh
cargo test --package ntt_simple -- --nocapture

cleanup previous
rm -rf /tmp/near-sandbox

near-sandbox --home /tmp/near-sandbox init
near-sandbox --home /tmp/near-sandbox run

near call ntt_simple set_status '{"message": "aloha!"}' --accountId ntt_simple

# Deploy to testnet

near dev-deploy --wasmFile build-output/main.wasm --helperUrl https://near-contract-helper.onrender.com

## Deployment 1

Starting deployment. Account id: dev-1653662015557-68385594308308, node: https://rpc.testnet.near.org, helper: https://near-contract-helper.onrender.com, file: build-output/main.wasm
Transaction Id EzkjUTbdAajgfhF9vVQeVUoYtQ2AjH2eA8RBcoNZ2SdC
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/EzkjUTbdAajgfhF9vVQeVUoYtQ2AjH2eA8RBcoNZ2SdC
Done deploying to dev-1653662015557-68385594308308

# Bug issues

AddrInUse

find port from error message

~/Projects/created/NTT-contract/contract-testing master\*
❯ lsof -i tcp:3000

~/Projects/created/NTT-contract/contract-testing master*
❯ lsof -i tcp:24567
COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
near-sand 63401 DVF 89u IPv4 0xcf6d828ef4de3f55 0t0 TCP *:24567 (LISTEN)

~/Projects/created/NTT-contract/contract-testing master\*
❯ kill -9 63401
