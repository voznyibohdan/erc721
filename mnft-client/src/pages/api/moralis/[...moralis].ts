import { MoralisNextApi } from "@moralisweb3/next";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY || '';

export default MoralisNextApi({ apiKey: MORALIS_API_KEY  });
