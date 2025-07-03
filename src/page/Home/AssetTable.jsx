import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const AssetTable = ({coin,category}) => {

    const dispatch=useDispatch()

    const navigate=useNavigate()
    return (
        <Table className="px-5  border-t relative">

        <ScrollArea className={`${category=="all"?"h-[77.5vh]":"h-[82vh]"}`}>
              <TableHeader>
                <TableRow className="sticky top-0 left-0 right-0 bg-background">
                    <TableHead className="py-4">Coin</TableHead>
                    <TableHead >SYMBOL</TableHead>
                    <TableHead >VOLUME</TableHead>
                    <TableHead >MARKET CAP</TableHead>
                    <TableHead >24h</TableHead>
                    <TableHead >PRICE</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {coin.map((item,index)=> <TableRow key={item.id}>
                    <TableCell onClick={()=>navigate(`/market/${item.id}`)} className="font-medium flex items-center gap-2">
                        <Avatar className="-z-50 w-7 h-7">
                            <AvatarImage src={item.image}/>
                        </Avatar>
                        <span>{item.name}</span>
                    </TableCell>
                    <TableCell className="text-left">{item.symbol}</TableCell>
                    <TableCell className="text-left">{item.total_volume}</TableCell>
                    <TableCell className="text-left">{item.market_cap}</TableCell>
                    <TableCell className="text-left">{item.price_change_percentage_24h}</TableCell>
                    <TableCell className="text-left">${item.current_price}</TableCell>
                </TableRow>)}

            </TableBody>   
        </ScrollArea>


       
        </Table>

    )
}

export default AssetTable