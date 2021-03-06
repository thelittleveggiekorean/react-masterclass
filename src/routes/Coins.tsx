import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

interface ICoinsProps {}

// const ModeButton = styled.button`
//   background-color: ${(props) => props.theme.boxColor};
//   border: none;
//   border-radius: 10px;
//   margin-left: 1rem;
//   color: ${(props) => props.theme.color};
//   padding: 0.2rem 1rem;
//   cursor: pointer;
// `;
const Header = styled.header`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const CoinList = styled.ul`
    padding:20px;
    max-width:300px;
    margin:0 auto;
    }
`;

const Coin = styled.li`
    background-color:${(props) => props.theme.boxColor};
    color:${(props) => props.theme.color};
    margin-bottom:1rem;
    border-radius:10px;
        a {
            display:flex;
            align-items: center;
            color:inherit;
            height:100%;
            padding:1rem;
            transition:color .2s ease-in-out;
            
            &:hover {
            color:${(props) => props.theme.accentColor};
           
        }
`;

interface ICoin {
  id: string;
  is_new: boolean;
  is_active: boolean;
  name: string;
  symbol: string;
  rank: number;
  type: string;
}

const Loading = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.color};
  text-align: center;
`;
const CoinIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDarkAtom}>Change Mode</button>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={coin.id} state={coin.name}>
                <CoinIcon
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </>
  );
}

export default Coins;
