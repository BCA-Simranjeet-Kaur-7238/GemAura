import React, { useEffect } from 'react'
import './productInfo.css'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {changeSize, setProductInfo} from './productListSlice'
import { useState } from 'react'
import {addToCart } from '../cart/CartSlice'
import ErrorPage from '../Reusable/404Error/errorPage'
const productInfo = () => {
  const params=useParams();
  const [num,setNum]=useState(0)
  const dispatch=useDispatch();
  dispatch(setProductInfo(params));
  let item=useSelector(state=>state.productInfo.productInfo)
  const [size,setSize]=useState(item.size)
  useEffect(()=>{
      dispatch(changeSize(size))
  },[size])
  const handelChangeSize=(e)=>{
    setSize(e.target.value)
  }
  const handelAddToCart=()=>{
    let i={
      id:item.id,
      name:item.name,
      desc:item.desc,
      metal:item.metal,
      Gem:item.Gem,
       type_of:item.type_of,
       images:item.images,
       instock:item.instock,
       size:size
    }

    i.size=size;
    dispatch(addToCart(i))
  }
  return (
    <div className=' w-[100vw] contProductInfo'>
      {item?<><div className="contLeftInfo">
        <div className="contProductImg">
          <div className='contOptionImg'>{item.images.map((itm,index)=><div className='optionImg' onClick={()=>setNum(index)} key={index}>
             <img src={itm} alt="" />
             </div> )}
          </div>
          <div className='contMainImg'><img src={item.images[num]} alt="" /></div>
        </div>
        <div className='text-2xl my-10 flex  justify-center lg:w-[500px] w-[350px] font-semibold h-auto desc'><div className='h-auto lg:w-[500px] w-[350px] flex justify-center'>All hand-made jewellery , premium quality , attractive and long lasting</div></div>
      </div>
      <div className="contRightInfo">
        <div className='name lg:text-3xl md:text-3xl  flex   text-2xl font-semibold sm:my-[7vh] md:my-[5vh]'>{item.name} </div>
        <div className=' lg:w-[60%] md:w-[60%] w-[80%] my-[7vh] md:my-[5vh] price'><div className=' border-b-[2px] border-black  font-bold sm:text-xl   '>Excluding All Taxes :- </div> <div className='priceCustomColor text-xl font-bold md:text-2xl' >Rs {item.metal.weightInGram*item.metal.pricePerGram+item.Gem.totalPrice}</div></div>
        <div className='flex justify-between lg:w-[60%] md:w-[90%] w-[90%] my-[7vh] md:my-[5vh] lg:my-[7vh] buycart items-end'>
        {item.type_of.toLowerCase()=="ring"&&<div className=' flex flex-col ' > <div  className='text-xl mb-2'> Change Size: </div> <input type="number" value={size} onChange={(e)=>handelChangeSize(e)} className='inp w-[200px]' /></div>}
          <button onClick={handelAddToCart}  className='inp w-[200px] h-[45px]'>Add to Cart</button>
        </div>
        <div className='my-[7vh] md:my-[5vh] continfo '>
          {item.type_of.toLowerCase()=="ring"&& <div className='flex md:gap-[1vw]  gap-0 Phonegap'> <div className='text-[17px] font-semibold'>Size: </div> <div className='w-full flex'>{size}   </div></div>}
            <div className='flex md:gap-[1vw]  gap-0 Phonegap'> <div className='text-[17px] font-semibold'>Metal: </div> <div className='w-full'>{item.metal.type}</div></div>
            <div className='flex md:gap-[1vw]  gap-0 Phonegap'> <div className='text-[17px] font-semibold'>Gem: </div> <div className='w-full'>{item.Gem.type}</div></div>
            <div className='flex md:gap-[1vw]  gap-0 Phonegap'> <div className='text-[17px] font-semibold'>Weight: </div> <div className='w-full'>{item.Gem.weightInCaret/5+item.metal.weightInGram} Gram</div></div>
            <div className='flex md:gap-[1vw]  gap-0 ProductDesc Phonegap'> <div className='text-[17px] font-semibold '  >Descreption: </div> <div className=' w-[80%] flex flex-wrap '>{item.desc}</div></div>
        </div>
      </div></>:<ErrorPage /> 
      }
    
    </div>
  )
}

export default productInfo
