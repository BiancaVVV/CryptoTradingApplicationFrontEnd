import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { login } from "@/State/Auth/Action";
  import { useForm } from "react-hook-form";
  import { useDispatch, useSelector } from "react-redux";
  import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
  import { Button } from "@/components/ui/button";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Label } from "@/components/ui/label";
  //import { addPaymentDetails } from "@/Redux/Withdrawal/Action";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });
const SigninForm = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(login(data));
    console.log("login form", data);
  };
    return (
        <div>
          <h1 className="text-xl font-bold text-center pb-3">Login</h1>


            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
             

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    name="email"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="email"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
           
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="password"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          

            <Button type="submit" className="w-full  py-5">
              Submit
            </Button>
      
            
          




                </form>

            </Form>
        </div>
    )
}


export default SigninForm