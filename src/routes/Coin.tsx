import {useParams, Route, Routes, Link, useMatch} from 'react-router-dom';
import styled from 'styled-components';
import Chart from './chart';
import Price from './price';
import { useQuery } from 'react-query';
import {fetchCoinInfo, fetchCoinTickers} from '../api';


type Params = {
    coinId: string;
}
const Wrapper = styled.div`
    max-width:420px;
    margin: 0 auto;
`

const Header = styled.header`
    height:30vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size:3rem;
    font-weight:700;
    text-transform:uppercase;
    children: React.ReactNode|React.ReactNode[];
`
const Loading = styled.div`
    font-size:3rem;
    color:${props => props.theme.color};
    text-align:center;
`

const Overview = styled.div`
    background-color:${props => props.theme.boxColor};
    border-radius:10px;
    display:flex;
    justify-content:space-between;

    padding:1rem;
`
const OverviewItem = styled.div`
display:flex;
flex-direction:column;
text-align:center;
    span:first-child {
        font-size:.6rem;
        margin-bottom:.5rem;
    }

`
const Description = styled.div`
    
    margin:1rem auto;
    line-height:1.2
`
const Tabs = styled.div`
    max-width:420px;
    display:flex;
    justify-content:space-between;
`

const Tab = styled.button<{isActive: boolean}>`
    width:195px;
    background-color:${props => props.isActive ? props => props.theme.accentColor : props => props.theme.boxColor};
    border-radius: 10px;
    border: none;
    padding: .5rem 0;
    margin: 2rem 0;
    a {
        color:${props => props.theme.color};
        display:block;
        width:inherit;
        height:inherit;

}`


interface IInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    description: string;
    message: string;
    open_source: boolean;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPrice {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_12h: number;
            percent_change_15m:number;
            percent_change_1h:number;
            percent_change_1y: number;
            percent_change_24h:number;
            percent_change_30d: number;
            percent_change_30m:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_from_price_ath:number;
            price:number;
            volume_24h: number;
            volume_24h_change_24h:number;
        }
    };
}

function Coin(){
    
    const priceMatch = useMatch(`/:coinId/price`);
    const chartMatch = useMatch(`/:coinId/chart`);

    const {coinId} = useParams<Params>();

    const {isLoading : infoLoading, data : infoData} = useQuery<IInfo>(["info", coinId], () => fetchCoinInfo(coinId));
    const {isLoading : tickersLoading, data : tickersData} = useQuery<IPrice>(["tickers", coinId], () => fetchCoinTickers(coinId));



    const loading = infoLoading || tickersLoading;
  
    
    return <>
        <Header>
            <Title>{infoData?.name}</Title>
        </Header>
        {loading ? "Loading..." : <Wrapper>
            <Overview>
                <OverviewItem>
                    <span>RANK</span>
                    <span>{tickersData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>SYMBOL</span>
                    <span>{tickersData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>OPEN SOURCE</span>
                    <span>{infoData?.open_source ? "YES" : "NO"}</span>
                </OverviewItem>
            </Overview>
            <Description>
                {infoData?.description}
            </Description>
            <Overview>
                <OverviewItem>
                    <span>TOTAL SUPPLY</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>MAX SUPPLY</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>
            <Tabs>
                <Tab isActive={chartMatch !== null}><Link to={`/${coinId}/chart`}>Chart</Link></Tab>
                <Tab isActive={priceMatch !== null}><Link to={`/${coinId}/price`}>Price</Link></Tab>
            </Tabs>
            <Routes>
                <Route path='/price' element={<Price />}/>
                <Route path='/chart' element={<Chart coinId={coinId!} />}/>
            </Routes>
        </Wrapper> 
        }
        
    </>
}
export default Coin;
