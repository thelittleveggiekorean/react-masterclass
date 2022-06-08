import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';


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
`

const CoinList = styled.ul`
    padding:20px;
    max-width:300px;
    margin:0 auto;
    }
`

const Coin = styled.li`
    background-color:${props => props.theme.color};
    color:${props => props.theme.backgroundColor};
    margin-bottom:1rem;
    border-radius:10px;
        a {
            color:inherit;
            display:block;
            height:100%;
            padding:1rem;
            &:hover {
            color:${props => props.theme.accentColor};
        }
`

interface CoinInterface {
    "id": string,
    "is_new": boolean,
    "is_active": boolean,
    "name": string,
    "symbol": string,
    "rank": number,
    "type": string,
}

const Loading = styled.div`
    font-size:3rem;
    color:${props => props.theme.color};
    text-align:center;
`



function Coins(){

    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            console.log(json.slice(0, 100));
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, [])

    return (
    <>
        <Header>
        <Title>Coins</Title>
        </Header>
        {loading ? <Loading>Loading...</Loading> :
            <CoinList>
                {coins.map(coin => 
                    <Coin key={coin.id}>
                        <Link to={coin.symbol}>{coin.name} &rarr;</Link>
                    </Coin>
                )}
            </CoinList>
        }
    </>
    )
}

export default Coins;