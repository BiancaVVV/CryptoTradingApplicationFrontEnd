/* eslint-disable no-unused-vars */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Button } from "@/components/ui/button";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { getUserAssets } from "@/State/Asset/Action";
  import { Avatar, AvatarImage } from "@/components/ui/avatar";
  import { getAllOrdersForUser } from "@/State/Order/Action";
  import { calculateProfite } from "@/Util/calculateProfite";
  
  const TreadingHistory = () => {
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState("portfolio");
    const { asset, order } = useSelector((store) => store);
  
    useEffect(() => {
      dispatch(getUserAssets(localStorage.getItem("jwt")));
      dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
    }, []);
  
    const handleTabChange = (value) => {
      setCurrentTab(value);
    };
  
    return (
      <div className="">
        <Table className="px-5 relative">
          <TableHeader className="py-9">
            <TableRow className="sticky top-0 left-0 right-0 bg-background">
              <TableHead className="py-3">Date & Time</TableHead>
              <TableHead>Treading Pair</TableHead>
              <TableHead>Buy Price</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead>Profite/Loss</TableHead>
              <TableHead className="text-right">VALUE</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {order.orders?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                  <p className="text-gray-400">
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="-z-50 w-8 h-8">
                    <AvatarImage
                      src={item.orderItem.coin.image}
                      alt={item.orderItem.coin.symbol}
                      className="w-8 h-8"
                    />
                  </Avatar>
                  <span>{item.orderItem.coin.name}</span>
                </TableCell>
                <TableCell>${item.orderItem.buyPrice}</TableCell>
                <TableCell>
                  {item.orderItem.sellPrice
                    ? `$${item.orderItem.sellPrice}`
                    : "-"}
                </TableCell>
                <TableCell>{item.orderType}</TableCell>
                <TableCell
                  className={`${
                    calculateProfite(item) < 0 ? "text-red-600" : ""
                  }`}
                >
                  {item.orderType === "SELL"
                    ? calculateProfite(item)
                    : "-"}
                </TableCell>
                <TableCell className="text-right">${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default TreadingHistory;
  