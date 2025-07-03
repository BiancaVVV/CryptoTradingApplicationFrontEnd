import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import {DragHandleHorizontalIcon, MagnifyingGlassIcon} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Sidebar from "../Navbar/Sidebar";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

  
const Navbar = () => {
  const navigate = useNavigate();
  const {auth}=useSelector((store)=>store)
    return (
        <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>

        <div className='flex items-center gap-3'>
        <Sheet className="">
  <SheetTrigger>
    <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
        <DragHandleHorizontalIcon className='h-7 w-7'></DragHandleHorizontalIcon>
    </Button>
  </SheetTrigger>
  <SheetContent  className="w-72 border-r-0 flexs flex-col justify-center" side="left">
    <SheetHeader>
      <SheetTitle>
      <div className="text-3xl flex justify-center items-center gap-1">
      <Avatar>
        <AvatarImage src="https://cdn.pixabay.com/photo/2024/03/12/23/30/ai-generated-8629742_640.png"></AvatarImage>
      </Avatar>

      <div>
        <span className="font-bold text-blue-700">Bianca</span>
        <span>Trading</span>
      </div>

      </div>

      </SheetTitle>
    </SheetHeader>
    <Sidebar/>
  </SheetContent>
</Sheet>
        <p className="text-sm lg:text-base cursor-pointer">
            Bianca Trading
        </p>
            <div className="p-0 ml-9">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="flex items-center gap-3"
            >
              {" "}
                    <MagnifyingGlassIcon/>
                    <span>Search</span>
                </Button>

            </div>
        </div>
        <div>
            <Avatar>
                <AvatarFallback>
                    {auth.user?.fullName[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
        </div>
        </div>
    )
}

export default Navbar