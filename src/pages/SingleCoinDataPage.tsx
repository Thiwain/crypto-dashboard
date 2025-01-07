import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import { useEffect, useState } from 'react';
import { getCoinDataAPI } from '../api/DashboardOverviewAPICalls';

const SingleCoinDataPage = () => {
  const { id } = useParams<{ id: string }>();
  const [coinDetails, setCoinDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const res = await getCoinDataAPI(id || '');
        setCoinDetails(res);
      } catch (error) {
        console.error('Failed to fetch coin details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl font-medium">Loading...</div>;
  }

  if (!coinDetails) {
    return <div className="text-center text-xl font-medium">Coin details not found.</div>;
  }

  const {
    name,
    image,
    market_data: marketData,
    market_cap_rank: marketCapRank,
  } = coinDetails;

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName={name || 'Coin Details'} />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Growth</h3>
            </div>
            <ChartOne />
          </div>
        </div>

        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Details</h3>
            </div>
            <div className="p-7">
              <div className="flex items-center space-x-4 mb-6">
                {/* Coin Icon */}
                {image?.small && (
                  <img src={image.small} alt={name} className="w-10 h-10" />
                )}

                {/* Name and Price */}
                <div>
                  <h4 className="text-xl font-semibold text-black dark:text-white">
                    {name}
                  </h4>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    ${marketData?.current_price?.usd || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Market Information */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Market Cap Rank
                  </p>
                  <p className="font-semibold text-black dark:text-white">
                    {marketCapRank || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Market Cap
                  </p>
                  <p className="font-semibold text-black dark:text-white">
                    ${marketData?.market_cap?.usd?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    24H Trading Volume
                  </p>
                  <p className="font-semibold text-black dark:text-white">
                    ${marketData?.total_volume?.usd?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Circulating Supply
                  </p>
                  <p className="font-semibold text-black dark:text-white">
                    {marketData?.circulating_supply?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Total Supply
                  </p>
                  <p className="font-semibold text-black dark:text-white">
                    {marketData?.total_supply?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Max Supply
                  </p>
                  <p className="font-semibold text-black dark:text-white">
                    {marketData?.max_supply?.toLocaleString() || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCoinDataPage;
