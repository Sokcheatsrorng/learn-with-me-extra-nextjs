"use client"

import { CardProductResponseType } from "@/lib/product";
import { Card, CardHeader, CardBody, CardFooter, Button} from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
// import placeholder 
import PlaceHolder from '../../../public/asset/place_holder.png'
import { MagicCard } from "@/components/magicui/magic-card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";



export default  function CardProductSuggestionComponent(
  
 
) {
    // declare state to catch up data 
    const [product, setProduct] = useState<CardProductResponseType[]>();
        const searchParam = useSearchParams();
        const category = searchParam.get("type")
        console.log("The category type: ", category)
    

    // useEffect
    useEffect(() => {
        // const fetchData = async () => {
        //     // fetch native API
        //     const res = await fetch(`https://fakestoreapi.in/api/products/products`);
        //     const data = await res.json();
        //     console.log("The Res:", data )
        //     setTimeout(()=>{
        //            setProduct(data);
        //     },2000)
        //     return data;
        // }
        
    
    
      
        const fetchData = () => {
            fetch(`https://fakestoreapi.in/api/products/category?type=${category}`)
            .then(res => res.json())
            .then(res => setProduct(res.products))
        }

        fetchData();
    }, [])

 
  

    return (
        <div>
               <div className="grid container lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 p-8 ">
               
                    {
                product?.map(({ image, title, description, price, id }) => (
                    
                    
                    <div key={id}>
        
         {/* <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div> */}
                       
                        <Link href={`/product/${id}`}>
                           <MagicCard>
                                 <Card >
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt={title}
                                    className=" rounded-xl w-[250px] h-[250px] object-contain"
                                    src={
                                        image ? image : PlaceHolder
                                    }
                                    width={270}
                                    height={100}
                                />
                            </CardBody>

                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="text-tiny uppercase font-bold">{title.substring(1, 25)}</h4>

                                <p className="text-large line-clamp-2">{description}</p>

                            </CardHeader>
                            <CardFooter className="flex justify-between">
                                <Button
                                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-lg"
                                    radius="full"
                                >Add To Cart</Button>
                                <h4 className="font-bold text-large text-red-500">{price}$</h4>
                            </CardFooter>
                        </Card>

                        </MagicCard>
                        </Link>
                     
                   

                    </div>
                ))

            }

             
          
        </div>
        </div>
     

    )
}
