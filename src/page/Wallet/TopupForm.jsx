
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { Input } from "@/components/ui/input";
import { paymentHandler } from "@/State/Wallet/Action";
const TopupForm = () => {
    const [amount, setAmount] = React.useState('')
    const dispatch=useDispatch();
    const [paymentMethod, setPaymentMethod] = React.useState("STRIPE")
    const handleChange = (e) => {
        setAmount(e.target.value);
    };
    const handleSubmit = () =>{
        console.log(amount, paymentMethod);
        dispatch(paymentHandler({jwt:localStorage.getItem("jwt"),
            paymentMethod,
            amount
        }))
    };
    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    }

    return (
        <div className='pt-10 space-y-5'>

            <div>
                <h1 className='pb-1'>Enter Amount</h1>
                <Input onChange={handleChange}
                value={amount}
                placeholder="$9999" 
                className="py-7 text-lg"/>
            </div>
            <div>
                <h1 className='pb-1'>Select payment method</h1>
                <RadioGroup 
                onValueChange={(value)=>handlePaymentMethodChange(value)}
                className="flex"
                defaultValue="STRIPE">
                    <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
                        <RadioGroupItem icon={DotFilledIcon} className='h-9 w-9' value="STRIPE" id="r1"/>
                        <Label htmlFor="r1">
                            <div className='bg-white rounded-md px-5 py-2 w-32'>
                            <img
                  className="h-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt=""
                />
                            </div>
                        </Label>
                    </div>

                </RadioGroup>
            </div>
            <Button onClick={handleSubmit} className="w-full py-7">
                Submit
            </Button>




        </div>
    )
}


export default TopupForm