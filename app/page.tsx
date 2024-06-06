"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter()
  const [formData, setFormData] = useState({
    BYER_NAME: '',
    BYER_ADDRESS: '',
    BYER_EMAIL: '',
    BYER_PHONE: '',
    PRODUCT_QUANTITY: 1,
    TOTAL_PRICE: 400,
    SIZE: '' // Add size here
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,      
    });
  };

  

  const sizeList=[{
    id:1,
    size:"S"
  },
{
  id:2,
  size:"M"
},{
  id:3,
  size:"L"
},{
  id:4,
  size:"XL"
}
]
const handleSubmit=async(e:any)=>{

  e.preventDefault()
  try {
    if(!formData.BYER_NAME|| !formData.BYER_EMAIL|| !formData.BYER_PHONE || !formData.BYER_ADDRESS || !formData.SIZE ){
      toast.error("Please fill all the fields")
     
    }else{
      const response = await axios.post('https://yv-t-shitr-point-server.onrender.com/api/create-payment', formData);
      if (response.data) {
        
        window.location.href = response.data; // Redirect to SSLCommerz payment page
      }
      
    }
    
  } catch (error) {
    console.log(error);
    
  }
}


  return (
   <main className="flex items-center  pt-5 pb-8 justify-center">
    <Toaster richColors position="bottom-left"/>
    <form onSubmit={handleSubmit} className="flex shadow shadow-lg flex-col items-center justify-center gap-5" >
    <div className="flex items-center px-4 py-4 w-[40rem] max-md:w-[30rem] rounded-md">
       <h3 className=" text-red-400 font-bold text-4xl">Youth Voice T-Shirt point</h3>
       </div>
    <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
      <label htmlFor="input" className="text-md">
        Please enter your name
      </label>
      <input type="text" name="BYER_NAME" onChange={handleChange} value={formData.BYER_NAME} required className="w-[38rem] max-md:w-[28rem] h-[3rem] focus:outline-red-400 border-red-400 text-black rounded-md shadow px-1 py-1" placeholder=" Please enter your name"/>

      
    </div>
    <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
      <label htmlFor="input" className="text-md">
        Please enter your email
      </label>
      <input type="email" name="BYER_EMAIL" onChange={handleChange} value={formData.BYER_EMAIL} required  className="w-[38rem] max-md:w-[28rem] max-md:w-[25rem] h-[3rem] focus:outline-red-400 border-red-400 text-black rounded-md shadow px-1 py-1" placeholder=" Please enter your email"/>

      
    </div>
    <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
      <label htmlFor="input" className="text-md">
        Please enter your phone
      </label>
      <input  type="tel" name="BYER_PHONE" onChange={handleChange} value={formData.BYER_PHONE} required className="w-[38rem] max-md:w-[28rem] h-[3rem] focus:outline-red-400 border-red-400 text-black rounded-md shadow px-1 py-1" placeholder=" Please enter your phone"/>

      
    </div>
    <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
      <label htmlFor="input" className="text-md">
        Please enter your location
      </label>
      <input type="text" name="BYER_ADDRESS" onChange={handleChange} value={formData.BYER_ADDRESS} required className="w-[38rem] max-md:w-[28rem] h-[3rem] focus:outline-red-400 border-red-400 text-black rounded-md shadow px-1 py-1" placeholder=" Please enter your location"/>

      
    </div>
    <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
    <p>Slect a size</p>
    <div className=" w-full flex px-2 items-center justify-center gap-8">
      {sizeList.map((item)=>(
        <div key={item.id} className={formData.SIZE === item.size?" border border-red-400 flex w-14 items-center justify-center px-4 py-4 rounded-md bg-gray-100 shadow cursor-pointer": "flex w-14 items-center justify-center px-4 py-4 rounded-md bg-gray-100 shadow cursor-pointer"} onClick={(e)=>{setFormData({
          ...formData,
          SIZE: item.size,
        })}}>{item.size}</div>
      ))}
     

      
      </div>      
  </div>
  <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
    <label htmlFor="input" className="text-md">
      Please enter your quantity
    </label>
   <div className=" flex items-center justify-center gap-1">
    <div
    onClick={(e)=>{
      if(formData.PRODUCT_QUANTITY==1){
        toast.error("You have to order atleaset one ")
      setFormData({
         ...formData,
        TOTAL_PRICE:formData.PRODUCT_QUANTITY*400,
       })
      }else if(formData.PRODUCT_QUANTITY >=1){
        setFormData({
          ...formData,
          
           PRODUCT_QUANTITY: formData.PRODUCT_QUANTITY-1,
          // TOTAL_PRICE:formData.PRODUCT_QUANTITY*400,
         })
         setFormData({
          ...formData,
          
          // PRODUCT_QUANTITY: formData.PRODUCT_QUANTITY-1,
          TOTAL_PRICE:formData.PRODUCT_QUANTITY*400,
         })

      }
     
    }} 
      className=" bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300"><FaMinus className=" cursor-pointer text-xl font-normal text-zinc-800" /></div>
    <p className=" mx-2 text-xl">{formData.PRODUCT_QUANTITY}</p>
    <div onClick={(e)=>{
      setFormData({
       ...formData,
        PRODUCT_QUANTITY: formData.PRODUCT_QUANTITY+1,
        //TOTAL_PRICE:formData.PRODUCT_QUANTITY*400,
      })
      setFormData({
        ...formData,
        
        // PRODUCT_QUANTITY: formData.PRODUCT_QUANTITY-1,
        TOTAL_PRICE:formData.PRODUCT_QUANTITY*400,
       })
    }} className=" bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300"><FaPlus className=" cursor-pointer text-xl font-normal text-zinc-800" /></div>
   </div>
  </div>
  <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
      <label htmlFor="input" className="text-md">
        Total Price
      </label>
      <p>{formData.TOTAL_PRICE}</p>

      
    </div>
  <div className="flex-col gap-1 flex px-4 py-4 max-md:w-[30rem] w-[40rem] rounded-md">
      <button type="submit" className="w-[38rem] max-md:w-[28rem] transition-all delay-200 shadow-md border border-red-400 cursor-pointer hover:text-white h-[3rem] hover:bg-red-400  text-black rounded-md shadow px-1 py-1"  aria-label="Buy">Buy</button>

      
    </div>
    

    </form>
     
    
   </main>
  );
}
