import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  
  import { useForm } from "react-hook-form";
  import { useDispatch, useSelector } from "react-redux";
  import { Button } from "@/components/ui/button";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Label } from "@/components/ui/label";
  //import { addPaymentDetails } from "@/Redux/Withdrawal/Action";
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { z } from "zod";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { zodResolver } from "@hookform/resolvers/zod";
import { sendResetPasswordOTP } from "@/State/Auth/Action"; // 👈 verifică denumirea funcției


const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});
const ForgotPasswordForm = () => {
  const [verificationType, setVerificationType] = useState("EMAIL");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(
      sendResetPasswordOTP({ 
        sendTo: data.email, navigate, verificationType })
    );
    console.log("login form", data);
  };
  return (
    <div className="space-y-5">
      <h1 className="text-center text-xl">
        Where do you want to get the code?
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="enter your email"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-slate-400 py-5">
            Send OTP
          </Button>
        </form>
      </Form>

      
    </div>
  );
};

export default ForgotPasswordForm;
