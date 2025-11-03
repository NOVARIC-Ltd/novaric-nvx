export const NVX_ADDRESS = (process.env.NEXT_PUBLIC_NVX_ADDRESS || '0x39E4d2285bC51a12588341213A05E523C928bF46') as `0x${string}`;
export const OFFICIAL_PAIR = process.env.NEXT_PUBLIC_OFFICIAL_PAIR || 'NVX/USDC';
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.ankr.com/bsc";
export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 56);
