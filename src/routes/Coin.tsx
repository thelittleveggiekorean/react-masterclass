import {useParams} from 'react-router-dom';

type Params = {
    coinId: string;
}

function Coin(){
    const {coinId} = useParams<Params>();
    return <h1>Coin {coinId}</h1>
}
export default Coin;
