import { useQuery } from "react-query";
import { fetchCoinChart } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  color: ${(props) => props.theme.color};
`;
interface ChartProps {
  coinId: string;
}
interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinChart(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const seriesData: Array<{ x: Date; y: [string, string, string, string] }> =
    data
      ? data.map((price) => {
          return {
            x: new Date(price.time_open),
            y: [
              price.open.toFixed(2),
              price.high.toFixed(2),
              price.low.toFixed(2),
              price.close.toFixed(2),
            ],
          };
        })
      : [];

  return (
    <ChartContainer>
      {isLoading ? (
        "Loading the chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: seriesData,
            },
          ]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "green",
                  downward: "red",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
            theme: {
              mode: "dark",
              palette: "palette10",
            },
            chart: {
              width: "100%",
              height: "500px",
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
            markers: {
              size: 1,
            },
          }}
        />
      )}
    </ChartContainer>
  );
}

export default Chart;
