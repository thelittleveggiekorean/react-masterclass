import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`

    `

const Header = styled.header`
    height:30vh;
    background-color:${props => props.theme.color};
    display:flex;
    justify-content:center;
    align-items:center;
`

const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size:3rem;
`

const List = styled.ul`
    padding:20px;
    li {
        background-color:${props => props.theme.color};
        color:${props => props.theme.backgroundColor};
        margin-bottom:1rem;
        border-radius:10px;
        a{
            color:inherit;
            display:block;
            height:100%;
            padding:1rem;
            &:hover {
                color:${props => props.theme.accentColor};
            }
        }
    }
`

const CoinList = [
    {
      "id": "btc-bitcoin",
      "name": "Bitcoin",
      "symbol": "BTC",
      "rank": 1,
      "is_new": false,
      "is_active": true,
      "type": "coin"
    },
    {
      "id": "eth-ethereum",
      "name": "Ethereum",
      "symbol": "ETH",
      "rank": 2,
      "is_new": false,
      "is_active": true,
      "type": "coin"
    },
    {
      "id": "usdt-tether",
      "name": "Tether",
      "symbol": "USDT",
      "rank": 3,
      "is_new": false,
      "is_active": true,
      "type": "token"
    }]


function Coins(){
    return (<Container>
        <Header>
        <Title>Coins</Title>
        </Header>
        <List>{CoinList.map(coin => <li key={coin.id}><Link to={coin.symbol}>{coin.name} &rarr;</Link></li>)}</List>
    </Container>)
}

export default Coins;