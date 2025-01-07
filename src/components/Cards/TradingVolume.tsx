import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getTradingVolumeAPI } from "../../api/DashboardOverviewAPICalls";



const TradingVolume: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [tradingVolumeData, setTradingVolumeData] = useState<any | null>();

    useEffect(() => {
        const root = document.documentElement;
        setTheme(root.classList.contains("dark") ? "dark" : "light");

        const observer = new MutationObserver(() => {
            setTheme(root.classList.contains("dark") ? "dark" : "light");
        });

        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTradingVolumeAPI()
                setTradingVolumeData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [])

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
                data: tradingVolumeData?.prices?.map((cap: any) => cap[1]) || [],
            },
        ],
        colors: [theme === "dark" ? "#47defc" : "#47defc"],
        stroke: {
            width: 2,
        },
        grid: {
            borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
            BsBorderWidth: 0,
        },
        xaxis: {
            type: "category",
            categories: tradingVolumeData
                ? tradingVolumeData.market_caps.map(() =>
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
                    <h3 className="text-lg font-semibold">Trading Volume</h3>
                    <div className="text-2xl font-bold mt-2">
                        {tradingVolumeData ? tradingVolumeData.prices[0][0].toFixed(0) : 'Loading....'} USD
                    </div>
                    <div
                        className='flex items-center font-medium mt-8'
                    >

                    </div>
                </div>

                <div className="absolute bottom-2 top-2 right-2 left-2 z-0 opacity-90">
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

export default TradingVolume;
