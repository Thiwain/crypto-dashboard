import React, { useEffect, useState } from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import MarketCap from '../../components/Cards/MarketCap';
import { useMarketData } from '../../contexts/MarketData/MarketDataContext';
import TradingVolume from '../../components/Cards/TradingVolume';



const OverView: React.FC = () => {

  const { marketData } = useMarketData();
  return (
    <>
      <div>
        <span className='text-black-2 fw-bold dark:text-white sm:text-xl md:text-2xl lg:text-3xl fw-bolder'>Cryptocurrency Prices by Market Cap. </span><br />
        <span>The global cryptocurrency market cap today is $3.67 Trillion, a {<label
          className={`font-medium mt-2 ${marketData ? marketData?.data.market_cap_change_percentage_24h_usd >= 0
            ? "text-green-500"
            : "text-red-500" : '0000'
            }`}
        >
          {marketData
            ? `${marketData.data.market_cap_change_percentage_24h_usd.toFixed(2)}%`
            : "Loading..."}
        </label>} change in the last 24 hours.</span>
      </div >

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <div className="h-full">
          <MarketCap />
        </div>
        <div className="h-full">
          <TradingVolume />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default OverView;
