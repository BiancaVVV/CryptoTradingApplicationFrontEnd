import React, { useEffect } from "react";
import {Button} from "@/components/ui/button.jsx";
import AssetTable from "@/page/Home/AssetTable.jsx";
import StockChart from "@/page/Home/StockChart.jsx";
import { Avatar } from "@radix-ui/react-avatar";
import { DotIcon } from "lucide-react";
import { ChevronLeftIcon } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { useDispatch } from "react-redux";
import { fetchCoinList, getTop50CoinList } from "@/State/Coin/Action";
import { useSelector } from "react-redux";
const Home = () => {

    const [page, setPage] = useState(1);
    const [category, setCategory] = React.useState("all")
    const dispatch=useDispatch()
    const {coin,auth}=useSelector((store)=>store);
    const handleCategory = (value) => {
        setCategory(value)
    }

    useEffect(() => {
        if (category == "top50") {
          dispatch(getTop50CoinList());
        }else if( category == "trading"){
          dispatch(fetchTreadingCoinList())
        }
      }, [category]);

    useEffect(()=>{
        dispatch(fetchCoinList(page))
    },[page])


    

    const handlePageChange = (page) => {
        setPage(page);
      };


      useEffect(() => {
        dispatch(fetchCoinDetails({
          coinId: "bitcoin",
          jwt: auth.jwt || localStorage.getItem("jwt"),
        }))
        
      }, []);

      const gainers = coin.coinList
      .filter((coin) => coin.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 10);

      
    return (
        <div className="relative">
            <div className="lg:flex">
                <div className="lg:w-[50%] lg:border-r">

                    <div className="p-3 flex items-center gap-4">
                        <Button onClick={() => handleCategory("all")}
                                variant={category == "all" ? "default":"outline"} className="rounded-full">All</Button>
                        <div className="p-3 flex items-center gap-4">
                            <Button onClick={() => handleCategory("top50")}
                                    variant={category == "top50" ? "default":"outline"} className="rounded-full">Top 50</Button>
                            <div className="p-3 flex items-center gap-4">
                                <Button onClick={() => handleCategory("topGainers")}
                                        variant={category == "topGainers" ? "default":"outline"} className="rounded-full">Top Gainers</Button>
                                <div className="p-3 flex items-center gap-4">
                                    {/* <Button onClick={() => handleCategory("topLosers")}
                                            variant={category == "topLosers" ? "default":"outline"} className="rounded-full">Top Losers</Button> */}
                    </div>
                </div>
            </div>
        </div> 
        {/* <AssetTable coin={category=="all"? coin.coinList:coin.top50} category={category}/> */}
        <AssetTable
            coin={
              category === "all"
                ? coin.coinList
                : category === "top50"
                ? coin.top50
                : category === "topGainers"
                ? gainers
                : []
            }
            category={category}
          />   
        {category == "all" && (
            <Pagination className="border-t py-3">
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    disabled={page == 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={page == 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(2)}
                    isActive={page == 2}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(3)}
                    isActive={page == 3}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                {page > 3 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(3)}
                      isActive
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

                </div>
                <div className="hidden lg:block lg:w-[50%] p-5">
                    <StockChart coinId={"bitcoin"}/>

                    <div className="flex gap-5 items-center">

                        <div>
                            <Avatar>
                            <AvatarImage className="w-8 h-8" src={"	https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}/>
                            </Avatar>
                        </div>
                        <div className="flex items-center gap-2">
                            <p>BTC</p>
                            <DotIcon className="text-gray-400"/>
                            <p className="text-gray-400">Bitcoin</p>
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

            </div>
            
        </div>
    );
};

export default Home