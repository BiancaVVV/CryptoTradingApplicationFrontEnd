import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Badge } from "lucide-react";
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";
const Withdrawal = () => {
    const dispatch = useDispatch();
  
    const { withdrawal } = useSelector((store) => store);
  
    useEffect(() => {
      dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
    }, []);
  
    return (
      <div className="px-20 ">
        <h1 className="text-3xl font-bold py-10">Withdrawal</h1>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-5">Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawal.history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium py-5">
                    {readableTimestamp(item?.date)}
                  </TableCell>
                  <TableCell>{"Bank Account"}</TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell className="text-right">
                   {item.status}
                    
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };
  
  export default Withdrawal;
  