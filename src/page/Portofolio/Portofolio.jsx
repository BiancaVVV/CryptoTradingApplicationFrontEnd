import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Select } from "@radix-ui/react-select";
import { SelectTrigger } from "@radix-ui/react-select";
import { SelectValue } from "@radix-ui/react-select";
import { SelectContent } from "@radix-ui/react-select";
import { SelectItem } from "@radix-ui/react-select";
import { getUserAssets } from "@/State/Asset/Action";


const tab = ["portfolio", "history"];
const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset } = useSelector((store) => store);
  // const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  console.log("currentTab-----", currentTab);
  return (
    <div className="px-10 py-5 mt-10">
      <div className="pb-5 flex items-center gap-5">
        <Select
          onValueChange={handleTabChange}
          defaultValue="portfolio"
          className=""
        >
          <SelectTrigger className="w-[180px] py-[1.2rem] ">
            <SelectValue placeholder="Select Portfolio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio">Portfilio</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>

        {/* {tab.map((item) => (
          <Button
          key={item}
            className="rounded-full"
            size="lg"
            onClick={() => setActiveTab(item)}
            variant={activeTab == item ? "secondary" : "outline"}
          >
            {item.toUpperCase()}
          </Button>
        ))} */}
      </div>
      {
        currentTab == "portfolio" ? (
          <Table className="px-5  relative">
            <TableHeader className="py-9">
              <TableRow className="sticky top-0 left-0 right-0 bg-background ">
                <TableHead className="py-3">Assets</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>UNIT</TableHead>
                <TableHead>CHANGE</TableHead>
                <TableHead>CHANGE(%)</TableHead>
                <TableHead className="text-right">VALUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {asset.userAssets?.map((item) => (
                <TableRow
                  onClick={() => navigate(`/market/${item.coin.id}`)}
                  key={item.id}
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50 w-8 h-8">
                      <AvatarImage
                        src={item.coin.image}
                        alt={item.coin.symbol}
                      />
                    </Avatar>
                    <span> {item.coin.name}</span>
                  </TableCell>
                  <TableCell>{item.coin.current_price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_24h}
                  </TableCell>
                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_percentage_24h}%
                  </TableCell>

                  <TableCell className="text-right">
                  {(item.coin.current_price * item.quantity).toFixed(3)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <TreadingHistory />
        )
        // <div className="flex items-center justify-center h-[70vh]">
        //   <h1 className="text-3xl font-semibold">No History Available</h1>
        //   </div>
      }
    </div>
  );
};

export default Portfolio;
