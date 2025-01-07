import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const CoinSearch = () => {
    const [query, setQuery] = useState('');
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const debounceDelay = 500;

    useEffect(() => {
        if (!query) {
            setCoins([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/search?query=${query}`
                );
                const data = await response.json();
                setCoins(data.coins);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }, debounceDelay);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearchChange = (event: any) => {
        setQuery(event.target.value);
    };

    return (
        <div className="relative w-full">
            <form action="https://formbold.com/s/unique_form_id" method="POST" className="w-full">
                <div className="relative">
                    <button className="absolute left-0 top-1/2 -translate-y-1/2">
                        <svg
                            className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                fill=""
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                fill=""
                            />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                        placeholder="Type to search..."
                    />
                </div>
            </form>

            {query && !loading && coins.length > 0 && (
                <div className="absolute z-10 w-full mt-2 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto dark:bg-gray-800">
                    <ul className="divide-y divide-gray-300 dark:divide-gray-500">
                        {coins.map((coin: any) => (
                            <NavLink to={'/coin-data/' + coin.id}>
                                <li
                                    key={coin.id}
                                    className="flex items-center p-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors dark:hover:bg-blue-700 dark:hover:text-white"
                                >

                                    <img
                                        src={coin.thumb}
                                        alt={coin.name}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <div>
                                        <span className="block font-medium">{coin.name}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</span>
                                    </div>
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            )
            }

            {/* Loading Indicator */}
            {loading && <div className="absolute top-12 right-2 text-gray-500 dark:text-gray-300">Loading...</div>}
        </div >
    );
};

export default CoinSearch;
