import { useDispatch, useSelector } from "react-redux";
import { addQuantity, reduceQuantity, removeItem ,changeSizeCart } from './CartSlice';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdError } from "react-icons/md";
import './cart.css'
export function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart.cart);
    var price=0;
        cart.forEach(item=>{
            if(item.instock)
            price+=(item.Gem.totalPrice+item.metal.weightInGram*item.metal.pricePerGram)*item.quantity;
        })
        const handelChangeSize=(id,e)=>{
                 
        }
    return (
        <div className=" flex flex-col items-center py-8 min-h-[49vh]">
            <div className=" lg:h-[15vh] md:h-[9vh]  w-[100vw] h-[10vh] text-2xl flex justify-center items-center">Your cart items</div>
            <div className="lg:h-[6vh] md:h-[6vh]  w-[100vw] h-[8vh]  flex justify-center items-center text-custom underline font-semibold text-sm"><Link to='/' >Back to Home</Link></div>
                   { cart.length  ? 
            <div className="lg:w-[70vw] md:w-[80vw]  sm:w-[95vw] w-[99vw] border-t  mt-[5vh]">
           
            {cart.map(item=><div key={item.hasOwnProperty('size')?item.secId:item.id} className="flex justify-between border-b my-[5vh] py-[2vh] ">
                    <div className="flex gap-x-[2vw] h-[90px] ">
                  <Link to={`/productInfo/${item.id}`}>
                  
                      <div className="w-[90px] h-[90px] flex flex-col justify-center items-center rounded-[15%] bg-black">
                        
                        <img src={item.images[0]} className="w-[60px] shrink-0 object-contain object-center  " />
                    </div>
                    </Link>
                                <div className="flex flex-col sm:w-auto w-[40vw]  h-[90px] justify-center gap-[3vh]">
                                <Link to={`/productInfo/${item.id}`}>
                                              <div className="font-semibold lg:text-lg sm:text-lg text-sm">
                                    {item.name}

                                    </div>
                                    </Link>
                                    <div className=" sm:text-sm text-xs text-custom font-semibold ">
                                    <button onClick={() =>dispatch(removeItem(item))} className="hover:underline"><MdDelete size={25}/></button>
                                    {!item.instock&& <div className=" text-red-600 flex  items-center "><MdError/>&nbsp; Out of stock</div> }
                                    </div>
                                </div>
                                </div>
                                <div className="flex flex-col font-medium lg:text-base md:text-base sm:text-base text-xs gap-y-[1vh]">
                                <div className="flex">
                                   <div className="w-[10vw] head">Price: </div> <div> {(item.Gem.totalPrice+item.metal.pricePerGram*item.metal.weightInGram)}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-[10vw] head">
                                        Quantity:
                                    </div>
                                    <div className="w-[55px] justify-between flex px-1 text-base h-[25px] items-center customIncrement ">
                                    <button onClick={() => dispatch(reduceQuantity(item))} className="flex justify-center items-center sm:text-xl text-lg">-</button>
                                    <div className="flex justify-center items-center">{item.quantity}</div>
                                    <button onClick={() => dispatch(addQuantity(item))} className="flex justify-center items-center sm:text-xl text-lg">+</button>
                                    </div>

                                </div>
                                <div className="flex">
                                    <div className="w-[10vw] head">Total: </div>
                                    <div>{(item.Gem.totalPrice+item.metal.pricePerGram*item.metal.weightInGram)*item.quantity}</div>
                                </div>

                               {item.hasOwnProperty('size')&& <div className="flex">
                               <div className="w-[10vw] head">Size: </div>
                                    <div className=' sm:w-[55px] w-[50px] sm:h-[30px] h-[20px] flex justify-center items-center sm:text-base text-xs'>{item.size}</div>
                              
                               </div> }
                                </div>
                            </div>
               )
            }
<div className="flex justify-end sm:text-lg text-base font-semibold">
            {/*  price component */}
            {
                cart.length !== 0 &&
                <div className="flex gap-[5vw] items-center">
                    <div>

                    Sub-Total &nbsp; Rs-{price}
                    </div>
                    <div className="inp btn flex justify-center text-sm sm:w-[150px] sm:h-[45px] hover:scale-105">
                        <button>Check Out</button>
                    </div>
                </div>
                }
                </div>
            </div>:<div>Your Cart is empty</div> }
        </div>
    );
}
