import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IToggleProps {
  toggleDark: () => void;
}

export default function Router({ toggleDark }: IToggleProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins toggleDark={toggleDark} />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}
