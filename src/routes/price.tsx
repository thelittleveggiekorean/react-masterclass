import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { IPrice } from "./Coin";
import { Overview, OverviewItem } from "./Coin";

interface ICoin {
  coinId: string;
}

const PriceTab = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.boxColor};
`;

function Price({ coinId }: ICoin) {
  const { isLoading, data } = useQuery<IPrice>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );

  return (
    <Overview>
      <OverviewItem>
        <span>BETA VALUE</span>
        <span>{data?.beta_value}</span>
      </OverviewItem>
      <OverviewItem>
        <span>TOTAL SUPPLY</span>
        <span>{data?.total_supply}</span>
      </OverviewItem>
      <OverviewItem>
        <span>CIRCULATING SUPPLY</span>
        <span>{data?.circulating_supply}</span>
      </OverviewItem>
    </Overview>
  );
}

export default Price;
