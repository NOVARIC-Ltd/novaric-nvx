UNCX locker proof (simple link bundle; you can swap to their API later):

import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  try {
    const locks = [
      {
        id: 5152866,
        unlock: "2026-11-02T10:27:00Z",
        link: "https://bscscan.com/token/0x39E4d2285bC51a12588341213A05E523C928bF46?a=5152866"
      },
      {
        id: 4305353,
        unlock: "2026-11-02T10:27:00Z",
        link: "https://bscscan.com/token/0x39E4d2285bC51a12588341213A05E523C928bF46?a=4305353"
      },
      {
        id: 4693647,
        unlock: "2025-12-02T10:27:00Z",
        link: "https://bscscan.com/token/0x39E4d2285bC51a12588341213A05E523C928bF46?a=4693647"
      }
    ];

    // Sort locks by unlock date (earliest first)
    const sortedLocks = locks.sort(
      (a, b) => new Date(a.unlock).getTime() - new Date(b.unlock).getTime()
    );

    const nextUnlock = sortedLocks[0];
    const now = new Date().toISOString();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120"
      },
      body: JSON.stringify({
        token: "NVX",
        chain: "bsc",
        contract: "0x39E4d2285bC51a12588341213A05E523C928bF46",
        totalLocks: sortedLocks.length,
        nextUnlock,
        locks: sortedLocks,
        timestamp: now
      })
    };
  } catch (error) {
    console.error("Error generating lock data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "lock_data_fetch_failed", message: String(error) })
    };
  }
};
