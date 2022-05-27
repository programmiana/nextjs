use crate::*;

pub trait NonFungibleTokenCore {
    //get information about the NFT token passed in
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken>;
}

#[near_bindgen]
impl NonFungibleTokenCore for Contract {
    //get the information for a specific token ID
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken> {
        //if there is some token ID in the tokens_by_id collection
        if let Some(token) = self.tokens_by_id.get(&token_id) {
            //we'll get the metadata for that token
            let metadata = self.token_metadata_by_id.get(&token_id).unwrap();
            //we return the JsonToken (wrapped by Some since we return an option)
            Some(JsonToken {
                token_id,
                owner_id: token.owner_id,
                metadata,
            })
        } else {
            //if there wasn't a token ID in the tokens_by_id collection, we return None
            None
        }
    }
}
