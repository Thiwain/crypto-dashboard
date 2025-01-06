import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getMarketCapAPI, getMarketDataAPI, getTotalMarketCapAPI } from "../../api/DashboardOverviewAPICalls";

interface MarketCapDataType {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

interface MarketDataType {
    market_data: {
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
    };
}

const MarketCap: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const [marketData, setMarketData] = useState<any | null>(null);
    const [marketCapData, setMarketCapData] = useState<MarketCapDataType | null>(null);


    useEffect(() => {
        const root = document.documentElement;
        setTheme(root.classList.contains("dark") ? "dark" : "light");

        const observer = new MutationObserver(() => {
            setTheme(root.classList.contains("dark") ? "dark" : "light");
        });

        observer.observe(root, { attributes: true, attributeFilter: ["class"] });

        const fetchData = async () => {
            try {
                const market_cap_data = await getMarketCapAPI();
                setMarketCapData(market_cap_data);
                const market_data = await getTotalMarketCapAPI();
                setMarketData(market_data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();

        return () => observer.disconnect();
    }, []);

    const chartOptions = {
        chart: {
            height: 150,
            type: "line",
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 1000,
                animateGradually: {
                    enabled: true,
                    delay: 200
                },
                dynamicAnimation: {
                    speed: 350
                }
            }
        },
        series: [
            {
                name: "Market Cap",
                data: marketCapData?.market_caps.map((cap) => cap[1]) || [],
            },
        ],
        colors: [theme === "dark" ? "#5cc658" : "#5cc658"],
        stroke: {
            width: 2,
        },
        grid: {
            borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
            BsBorderWidth: 0,
        },
        xaxis: {
            type: "category",
            categories: marketCapData
                ? marketCapData.market_caps.map((cap) =>
                    null,
                )
                : [],
            labels: {
                style: { fontSize: "0px", color: theme === "dark" ? "#d1d5db" : "#374151" },
            },
            axisBorder: {
                show: true,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
        },
        tooltip: {
            theme,
        },
    };

    return (
        <div className="container mx-auto mt-10">
            <div className={`bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg flex relative overflow-hidden`}>
                {/* Card Content */}
                <div className="text-gray-800 dark:text-white z-10">
                    <h3 className="text-lg font-semibold">Market Cap</h3>
                    <div className="text-2xl font-bold mt-2">{marketCapData ? marketCapData.total_volumes[0][1] : 'Loading....'} USD</div>
                    <div
                        className={`flex items-center font-medium mt-2 ${marketData?.data.market_cap_change_percentage_24h_usd >= 0
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    marketData?.data.market_cap_change_percentage_24h_usd >= 0
                                        ? "M5 15l7-7m0 0l7 7m-7-7v18" 
                                        : "M19 9l-7 7m0 0l-7-7m7 7V3" 
                                }
                            />
                        </svg>
                        {marketData
                            ? `${marketData.data.market_cap_change_percentage_24h_usd.toFixed(2)}%`
                            : "Loading..."}
                    </div>

                </div>

                <div className="absolute bottom-1 top-1 bg-center right-1 left-1 z-0 opacity-80">
                    {/* @ts-ignore */}
                    <Chart
                    // @ts-ignore
                        options={chartOptions}
                        series={chartOptions.series}
                        type="line"
                        width={550}
                        height={130}
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketCap;
