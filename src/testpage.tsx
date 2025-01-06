import React, { useState, useEffect } from "react";

const MarketPrice = () => {
    const [marketPrice, setMarketPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            console.log('called')
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch market data");
                }
                const data = await response.json();
                setMarketPrice(data.bitcoin.usd);
            } catch (error) {
                console.error("Error fetching market data:", error);
            }
        };

        // Fetch every 5 seconds
        const interval = setInterval(fetchMarketData, 7000);
        fetchMarketData(); // Initial fetch

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div>
            <h1>Bitcoin Market Price</h1>
            {marketPrice !== null ? (
                <p>Current Price: ${marketPrice.toLocaleString()}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MarketPrice;
