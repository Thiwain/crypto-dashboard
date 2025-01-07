import { createContext, ReactNode, useContext, useState } from "react";


interface MarketDataType {
    data: {
        market_cap_change_percentage_24h_usd: number;
    };
}

interface MarketDataContextDataType {
    marketData: MarketDataType;
    setMarketData: (data: MarketDataType) => void;
}

const MarketDataContext = createContext<MarketDataContextDataType | undefined>(undefined);

export const useMarketData = () => {
    const context = useContext(MarketDataContext);
    if (!context) throw new Error("useMarketData must be used within a MarketDataProvider")
    return context;
}

export const MarketDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [marketData, setMarketData] = useState<any>(null);

    return (
        <MarketDataContext.Provider value={{ marketData, setMarketData }}>
            {children}
        </MarketDataContext.Provider>
    );
};
