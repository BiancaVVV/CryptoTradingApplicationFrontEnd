import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";


  import { Input } from "@/components/ui/input";
  import { register } from "@/State/Auth/Action";
  import { useForm } from "react-hook-form";
  import { useDispatch, useSelector } from "react-redux";
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
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { useNavigate } from "react-router-dom";
 import { useEffect } from "react";

  const formSchema = z.object({
    fullName: z.string().nonempty("Full name is required"),
    email: z.string().email("Invalid email address").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .optional(),
  });

const SignupForm = () => {

   const navigate=useNavigate()
  const dispatch=useDispatch()
     const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

    const onSubmit = (data) => {
      dispatch(register(data))
      console.log("signup form", data);
    };


 


    return (
        <div>
            <h1 className="text-xl font-bold text-center pb-3">Register</h1>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
              <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="name"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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


export default SignupForm