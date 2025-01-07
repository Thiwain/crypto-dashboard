import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { getTrendingCoinsAPI } from "../../api/DashboardOverviewAPICalls";


const TrendingCrypto: React.FC = () => {

    const [coinsData, setCoinsData] = useState<any | null>();

    useEffect(() => {
        const fn = async () => {
            try {
                const data = await getTrendingCoinsAPI();
                setCoinsData(data);
            } catch (error) {
                console.error(error)
            }
        }
        fn();
    }, []);

    return (
        <div className="rounded-sm border h-full border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    🔥Trending
                </h3>
            </div>

            <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                {coinsData ? coinsData.coins.slice(0, 3).map((coin: any, index: any) => (
                    <NavLink to={'/coin-data/' + coin.item.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                    >
                        <img
                            src={coin.item.small}
                            alt={`${coin.item.name} logo`}
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                        <div className="flex flex-col flex-grow">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{coin.item.name}</span>
                        </div>
                        <span><img src={coin.item.data.sparkline} alt="sparkline" /></span>
                        <div className="text-right">
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                ${coin.item.data.price.toFixed(7)}
                            </span>
                            <span
                                className={`ml-2 text-sm flex items-center fw-bold ${coin.item.data.price_change_percentage_24h.usd >= 0
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                    }`}
                            >
                                {coin.item.data.price_change_percentage_24h.usd >= 0 ? (
                                    <>
                                        ↑ {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                                    </>
                                ) : (
                                    <>
                                        ↓ {Math.abs(coin.item.data.price_change_percentage_24h.usd).toFixed(2)}%
                                    </>
                                )}
                            </span>
                        </div>
                    </NavLink>
                )) : 'Loading....'}
            </div>

        </div>
    )
}

export default TrendingCrypto;