import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserWatchlist, addItemToWatchlist } from "@/State/Watchlist/Action";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const dispatch = useDispatch();
  const [page] = useState(1);
  const { watchlist } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserWatchlist(jwt));
    }
  }, [page, dispatch]);

  const handleAddToWatchlist = (id) => {
    dispatch(addItemToWatchlist(id));
  };

  return (
    <div className="pt-8 lg:px-10">
      <div className="flex items-center pt-5 pb-10 gap-5">
        <BookmarkFilledIcon className="h-10 w-10" />
        <h1 className="text-4xl font-semibold">Watchlist</h1>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full border rounded-lg text-sm">
          <TableHeader>
            <TableRow className="sticky top-0 bg-background">
              <TableHead className="min-w-[180px] px-4 py-3">Coin</TableHead>
              <TableHead className="min-w-[100px] px-4 py-3">SYMBOL</TableHead>
              <TableHead className="min-w-[150px] px-4 py-3">VOLUME</TableHead>
              <TableHead className="min-w-[150px] px-4 py-3">MARKET CAP</TableHead>
              <TableHead className="min-w-[100px] px-4 py-3">Market Rank</TableHead>
              <TableHead className="min-w-[150px] px-4 py-3">PRICE</TableHead>
              <TableHead className="text-right text-red-700 min-w-[100px] px-4 py-3">
                Remove
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {watchlist.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  onClick={() => navigate(`/market/${item.id}`)}
                  className="font-medium flex items-center gap-2 cursor-pointer px-4 py-3"
                >
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.symbol} />
                  </Avatar>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell className="px-4 py-3">{item.symbol.toUpperCase()}</TableCell>
                <TableCell className="px-4 py-3">{item.total_volume}</TableCell>
                <TableCell className="px-4 py-3">{item.market_cap}</TableCell>
                <TableCell
                  className="px-4 py-3"
                >
                  {item.market_cap_rank}
                </TableCell>
                <TableCell className="px-4 py-3">{item.current_price}</TableCell>
                <TableCell className="text-right px-4 py-3">
                  <Button
                    onClick={() => handleAddToWatchlist(item.id)}
                    className="h-10 w-10"
                    variant="outline"
                    size="icon"
                  >
                    <BookmarkFilledIcon className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Watchlist;
