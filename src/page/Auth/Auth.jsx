import React from "react";
import "./Auth.css";
import { Button } from "@/components/ui/button";

import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
//import ForgotPassword from "./ForgotPassword";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPassword from "./ForgotPasswordForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import CustomeToast from "@/components/custome/CustomeToast";

    const Auth = () => {
        const navigate = useNavigate();
        const location = useLocation();
       
       
      
        const [animate, setAnimate] = useState(false);
      
        const handleNavigation = (path) => {
          // setAnimate(true);
          // setTimeout(() => {
          navigate(path);
          //   setAnimate(false);
          // }, 500);
          // Adjust the delay as needed to match your animation duration
          // setAnimate(false)
        };
      
      
    return(
        <div className={`authContainer h-screen relative`}>
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50"></div>

      <div
        className={`bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 box flex flex-col justify-center items-center  h-[35rem] w-[30rem]  rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white`}
      >
     

        <h1 className="text-6xl font-bold pb-9">Bianca Trading</h1>
        {/* <Avatar>
          <AvatarImage src="https://cdn.pixabay.com/photo/2019/04/15/20/42/bitcoin-4130299_1280.png"/>
          <AvatarFallback>BTC</AvatarFallback>
        </Avatar> */}

        {location.pathname == "/signup" ? (
          <section
            className={`w-full login  ${animate ? "slide-down" : "slide-up"}`}
          >
            <div className={`  loginBox  w-full px-10 space-y-5 `}>
              <SignupForm />

              {location.pathname == "/signup" ? (
                <div className="flex items-center justify-center">
                  <span> {" have already account ?"} </span>
                  <Button
                    onClick={() => handleNavigation("/signin")}
                    variant="ghost"   className="hover:bg-white/10 hover:shadow-md text-white transition-all duration-200 rounded-lg ml-4"
                  >
                    Sign in
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span> don't have already account ? </span>
                  <Button
                    onClick={() => handleNavigation("/signup")}
                    variant="ghost" className="hover:bg-white/10 hover:shadow-md text-white transition-all duration-200 rounded-lg ml-4"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </section>
        ) : location.pathname == "/forgot-password" ? (
          <section className="p-5 w-full">
            <ForgotPasswordForm />
            {/* <Button variant="outline" className="w-full py-5 mt-5">
              Try Using Mobile Number
            </Button> */}
            <div className="flex items-center justify-center mt-5">
              <span>Back To Login ? </span>
              <Button onClick={() => navigate("/signin")} variant="ghost" className="hover:bg-white/10 hover:shadow-md text-white transition-all duration-200 rounded-lg ml-4"
                >
                Sign in
              </Button>
            </div>
          </section>
        ) : (
          <>
            {
              <section className={`w-full login`}>
                <div className={`  loginBox  w-full px-10 space-y-5 `}>
                  <SigninForm />

                  <div className="flex items-center justify-center">
                    <span>don't already have account ? </span>
                    <Button
                      onClick={() => handleNavigation("/signup")}
                      variant="ghost" className="hover:bg-white/10 hover:shadow-md text-white transition-all duration-200 rounded-lg ml-4"
                    > 
                      Sign up
                    </Button>
                  </div>
                  <div className="mt-10">
                    <Button
                      onClick={() => navigate("/forgot-password")}
                      variant="outline"
                      className="w-full py-5"
                    >
                      Forgot Password ?
                    </Button>
                  </div>
                </div>
              </section>
            }
          </>
        )}


      </div>
      
    

    </div>
  );
};


export default Auth