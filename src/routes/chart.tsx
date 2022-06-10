import { useQuery } from 'react-query';
import { fetchCoinChart } from '../api';


interface ChartProps {
    coinId: string;
}

function Chart({coinId}: ChartProps){
    const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinChart(coinId));
    console.log(isLoading, data);
    return <h1>chart</h1>;
}

export default Chart;