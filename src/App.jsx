import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import Portfolio from "./page/Portofolio/Portofolio"
import { Route, Routes } from "react-router-dom";
import StockDetails from "./page/Stock Details/StockDetails";
import Profile from "./page/Profile/Profile";
import Notfound from "./page/Notfound/Notfound";
import { shouldShowNavbar } from "./Util/shouldShowNavbar";
import ResetPassword from "./page/Auth/ResetPassword";
import TwoFactorAuth from "./page/Auth/TwoFactorAuth";
import Wallet from "./page/Wallet/Wallet";
import Watchlist from "./page/Watchlist/Watchlist";
import PasswordUpdateSuccess from "./page/Auth/PasswordUpdateSuccess";
import Activity from "./Activity/Activity";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import PaymentDetails from "./page/Payment Details/PaymentDetails";
import SearchCoin from "./page/Search/SearchCoin";
import { BrowserRouter} from "react-router-dom";
import Sidebar from "./page/Navbar/Sidebar";
import Auth from "./page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";

const routes = [
  { path: "/", role: "ROLE_USER" },
  { path: "/portfolio", role: "ROLE_USER" },
  { path: "/activity", role: "ROLE_USER" },
  { path: "/wallet", role: "ROLE_USER" },
  { path: "/withdrawal", role: "ROLE_USER" },
  { path: "/payment-details", role: "ROLE_USER" },
  { path: "/wallet/success", role: "ROLE_USER" },
  { path: "/market/:id", role: "ROLE_USER" },
  { path: "/watchlist", role: "ROLE_USER" },
  { path: "/profile", role: "ROLE_USER" },
  { path: "/search", role: "ROLE_USER" },
 
];


function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")));
  }, [auth.jwt]);



  return (
    <BrowserRouter>
      {auth.user ? (
        <>
          { <Navbar />}
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Portfolio />} path="/portfolio" />
            <Route element={<Activity />} path="/activity" />
            <Route element={<Wallet />} path="/wallet" />
            <Route element={<Withdrawal />} path="/withdrawal" />
            <Route element={<PaymentDetails />} path="/payment-details" />
            <Route element={<Wallet />} path="/wallet/:order_id" />
            <Route element={<StockDetails />} path="/market/:id" />
            <Route element={<Watchlist />} path="/watchlist" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<SearchCoin />} path="/search" />
            <Route element={<Notfound />} path="*" />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route element={<Auth />} path="/" />
          <Route element={<Auth />} path="/signup" />
          <Route element={<Auth />} path="/signin" />
          <Route element={<Auth />} path="/forgot-password" />
          <Route element={<ResetPassword />} path="/reset-password/:session" />
          <Route element={<PasswordUpdateSuccess />} path="/password-update-successfully" />
          <Route element={<TwoFactorAuth />} path="/two-factor-auth/:session" />
          <Route element={<Notfound />} path="*" />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
