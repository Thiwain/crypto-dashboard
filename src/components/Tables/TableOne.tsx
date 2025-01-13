import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const TableOne = () => {
  const [coinData, setCoinData] = useState<any[]>([]); // State to hold coin data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch data from the CoinGecko API
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Cryptocurrencies
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Coin
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price (USD)
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Market Cap
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Volume
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              24h Change
            </h5>
          </div>
        </div>

        {coinData.map((coin) => (
          <NavLink to={`/coin-data/${coin.id}`}>
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${coin === coinData[coinData.length - 1]
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200`}
              key={coin.id}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="h-8 w-8"
                  />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {coin.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  ${coin.current_price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  ${coin.market_cap.toLocaleString()}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  ${coin.total_volume.toLocaleString()}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p
                  className={`${coin.price_change_percentage_24h >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                    }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
