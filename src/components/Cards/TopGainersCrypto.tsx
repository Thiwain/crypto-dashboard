import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getTopGainersAPI } from "../../api/DashboardOverviewAPICalls";

const TopGainersCrypto: React.FC = () => {
    const [coinsData, setCoinsData] = useState<any | null>(null);

    useEffect(() => {
        const fn = async () => {
            try {
                const res = await getTopGainersAPI();
                setCoinsData(res);
            } catch (error) {
                console.error(error);
            }
        };
        fn();
    }, []);

    return (
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    💥 Top Gainers
                </h3>
            </div>

            <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                {coinsData ? coinsData.map((coin: any, index: any) => (
                    <NavLink key={index} to={'/coin-data/' + coin.id}
                        className="flex items-center gap-3 p-3 mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                    >
                        <img
                            src={coin.image}
                            alt={`${coin.name} logo`}
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                        <div className="flex flex-col flex-grow">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{coin.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                ${coin.current_price.toFixed(7)}
                            </span>
                            <span
                                className={`ml-2 text-sm flex items-center fw-bold ${coin.price_change_percentage_24h >= 0
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                    }`}
                            >
                                {coin.price_change_percentage_24h >= 0 ? (
                                    <>
                                        ↑ {coin.price_change_percentage_24h.toFixed(2)}%
                                    </>
                                ) : (
                                    <>
                                        ↓ {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                    </>
                                )}
                            </span>
                        </div>
                    </NavLink>
                )) : 'Loading....'}
            </div>
        </div>
    );
};

export default TopGainersCrypto;
