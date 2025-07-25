import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, WalletIcon } from "lucide-react";
import {
    CopyIcon,
    DownloadIcon,
    ReloadIcon,
    ShuffleIcon,
    UpdateIcon,
    UploadIcon,
  } from "@radix-ui/react-icons";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { useSelector } from "react-redux";
  import { getPaymentDetails } from "@/State/Withdrawal/Action";
  import { useDispatch } from "react-redux";
  import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import TopupForm from "./TopupForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { depositMoney, getUserWallet, getWalletTransactions } from "@/State/Wallet/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}
export const Wallet = () => {

    const dispatch = useDispatch();
    const query=useQuery()
    const orderId=query.get("order_id");
    const paymentId=query.get("payment_id")
    const navigate=useNavigate();

    const {wallet} = useSelector((store)=>store)

    useEffect(() => {
        handleFetchUserWallet();
        handleFetchWalletTransaction();
    }, []);


    useEffect(() => {
        if (orderId && paymentId) {
          const alreadyProcessed = sessionStorage.getItem(`processed-${orderId}`);
      
          if (!alreadyProcessed) {
            dispatch(depositMoney({
              jwt: localStorage.getItem("jwt"),
              orderId,
              paymentId,
              navigate
            }));
      
            sessionStorage.setItem(`processed-${orderId}`, "true");
          }
        }
      }, [orderId, paymentId]);
      

    const handleFetchUserWallet = () =>{
        dispatch(getUserWallet(localStorage.getItem("jwt")));
    };


    const handleFetchWalletTransaction = () => {

        dispatch(getWalletTransactions({jwt:localStorage.getItem("jwt")}))
    }


    return (
        <div className="flex flex-col items-center">

            <div className="pt-10 w-full lg:w-[60%]">

            <Card>
                <CardHeader className="pb-9">
                    <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                    <WalletIcon size={30}/>
                    <div>
                        <CardTitle className="text-2xl">My Wallet</CardTitle>
                    <div className="flex items-center gap-2">
                    <p className="text-gray-200 text-sm">
                        #{wallet.userWallet?.id}
                    </p>
                    <CopyIcon className="cursor-pointer hover:text-slate-300"/>



                    </div>
                    
                    
                    </div>


                  


                    </div>
                    <div>
                        <ReloadIcon onClick={handleFetchUserWallet} className="w-6 h-6 cursor-pointer hover:text-gray-400"/>
                    </div>


                    </div>

                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                    <DollarSign/>
                    <span className="text-2xl font-semibold">
                        {wallet.userWallet.balance}
                    </span>
                    </div>

                    <div className="flex gap-7 mt-5">
                    <Dialog>
                        <DialogTrigger>
                            <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                <UploadIcon/>
                                <span className="text-sm mt-2">Add Money</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Top Up Your Wallet
                                </DialogTitle>
                            </DialogHeader>
                            <TopupForm/>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                            <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                            <DownloadIcon />
                                <span className="text-sm mt-2">Withdrawal</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Request Withdrawal
                                </DialogTitle>
                            </DialogHeader>
                            <WithdrawalForm/>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                            <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                <ShuffleIcon/>
                                <span className="text-sm mt-2">Transfer</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-center text-xl">
                                    Transfer to other wallet
                                </DialogTitle>
                            </DialogHeader>
                            <TransferForm/>
                        </DialogContent>
                    </Dialog>

                    </div>


                </CardContent>
            </Card>

            <div className="py-5 pt-10">
                <div className="flex gap-2 items-center pb-5">
                    <h1 className="text-2xl font-semibold">History</h1>
                    <UpdateIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400"/>
                </div>

            <div className="space-y-5">

                {wallet.transactions?.map((item,i)=>
                <div key={i}>
                <Card className=" p-2 px-5 flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <Avatar onClick={handleFetchWalletTransaction}>
                            <AvatarFallback>
                                <ShuffleIcon className=""/>
                            </AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">

                            <h1>{item.type || item.purpose}</h1>
                            <p className="text-sm text-gray-500">{item.date}</p>

                        </div>


                    </div>

                    <div>
                        <p className={`text-green-500`}>{item.amount} USD</p>
                    </div>
                </Card>
            </div>
                )}
            </div>

            </div>

            </div>
        </div>
    )
}

export default Wallet