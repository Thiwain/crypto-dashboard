import { getCurrentDate } from "../utils/utils";

const keyHeader = new Headers();
keyHeader.append('Content-Type', 'application/json');
keyHeader.append('x-cg-demo-api-key', import.meta.env.VITE_API_KEY as string);

const getMarketCapAPI = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7',
            { method: 'GET', headers: keyHeader });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

const getTotalMarketCapAPI = async () => {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/global', { method: 'GET', headers: keyHeader });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        console.log('data')
        return data;
    } catch (error) {
        throw error;
    }
}

const getMarketDataAPI = async () => {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/history?id=bitcoin&date=' + getCurrentDate(),
            { method: 'GET', headers: keyHeader });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

const getTradingVolumeAPI = async () => {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1',
            { method: 'GET', headers: keyHeader });
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getTrendingCoinsAPI = async () => {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/search/trending', {
            method: 'GET',
            headers: keyHeader
        })
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getTopGainersAPI = async () => {
    try {
        const res = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
            { method: 'GET', headers: keyHeader, });
        const data = await res.json();
        const topGainers = data
            .sort((a: any, b: any) => b.price_change_percentage_24h - a.price_change_percentage_24h)
            .slice(0, 3);
        return topGainers;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getCoinDataAPI = async (id: string) => {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { method: 'GET', headers: keyHeader });
        return await res.json();
    } catch (error) {
        throw error;
    }
}

export {
    getMarketCapAPI,
    getMarketDataAPI,
    getTotalMarketCapAPI,
    getTradingVolumeAPI,
    getTrendingCoinsAPI,
    getTopGainersAPI,
    getCoinDataAPI
};