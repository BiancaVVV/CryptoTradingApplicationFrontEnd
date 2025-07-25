import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon, BookmarkIcon, DotIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { fetchCoinDetails } from "@/State/Coin/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import StockChart from "../Home/StockChart";
import { existInWatchlist } from "@/Util/existInWatchlist";
import { getUserWallet } from "@/State/Wallet/Action";

const StockDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coin, watchlist, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: auth.jwt || localStorage.getItem("jwt"),
      })
    );
    dispatch(getUserWatchlist(localStorage.getItem("jwt")))
  }, [id]);

  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);

  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist(coin.coinDetails?.id));
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <>
      {coin.loading ? (
        "loading..."
      ) : (
        <div className="p-5 mt-5">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <div>
                <Avatar>
                  <AvatarImage src={coin.coinDetails?.image?.large} />
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                  <DotIcon className="text-gray-400" />
                  <p className="text-gray-400">{coin.coinDetails?.name}</p>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">
                    {coin.coinDetails?.market_data.current_price.usd}
                  </p>
                  <p
                    className={`${
                      coin.coinDetails?.market_data.market_cap_change_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    <span className="">
                      {coin.coinDetails?.market_data.market_cap_change_24h}
                    </span>
                    <span>
                      (
                      {
                        coin.coinDetails?.market_data
                          .market_cap_change_percentage_24h
                      }
                      %)
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Button
                onClick={handleAddToWatchlist}
                className="h-10 w-10"
                variant="outline"
                size="icon"
              >
                {existInWatchlist(watchlist.items, coin.coinDetails) ? (
                  <BookmarkFilledIcon className="h-6 w-6" />
                ) : (
                  <BookmarkIcon className="h-6 w-6" />
                )}
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button size="lg">TRADE</Button>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader className="">
                    <DialogTitle className="px-10 pt-5 text-center">
                      How much do you want to spend?
                    </DialogTitle>
                  </DialogHeader>
                  <TreadingForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-10">
            <StockChart coinId={coin.coinDetails?.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default StockDetails;
