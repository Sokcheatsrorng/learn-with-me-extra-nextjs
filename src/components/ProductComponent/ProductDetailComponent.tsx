
"use client"

import { CardProductResponseType } from "@/lib/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlaceHolder from '../../../public/asset/place_holder.png'
import CardProductSuggestionComponent from "./RelatedProductComponent";

// import { Marquee } from "../magicui/marquee";

type productId = {
    pro_id: number;
}

export default function ProductDetailComponent(pro_id:productId) {
     const [data, setData] = useState<CardProductResponseType>();
     console.log("Data: ", data)
    useEffect(()=>{
         fetch(`https://fakestoreapi.in/api/products/${pro_id.pro_id}`)
        .then(res => res.json())
        .then(res => {
            const data = res.product;
            console.log(data)
            setData(data);
        })
       
    },[])
    
  return (
  <section>
      <div className="grid lg:grid-cols-2 gap-4 p-8">
        {/* for images */}
        <div>
                
             <Image
              src={data?.image? data?.image :  PlaceHolder}
              alt={data?.title || ''}
              width={250}
              height={250}
              className="w-[500px]"
             />
           
        </div>
        {/* for detail */}
        <div className="font-semibold line-clamp-5 ">
            <h1 className="uppercase">{data?.title.substring(1,25)}</h1>
            <p className="text-red-500">{`${data?.price?.toFixed(2)}$`}</p>
            <p className="mt-5 font-normal">{data?.description}</p>
        </div>
        
           
        
      
    </div>
    {/* suggestion */}
     
     <div>
        <h2>Suggestion</h2>
            <CardProductSuggestionComponent/>
     </div>
  </section>
  )
}
