"use client"

import { CardProductResponseType } from "@/lib/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlaceHolder from '../../../public/asset/place_holder.png'
import CardProductSuggestionComponent from "./RelatedProductComponent";

type ProductIdProps = {
    pro_id: number;
}

export default function ProductDetailComponent({ pro_id }: ProductIdProps) {
    const [data, setData] = useState<CardProductResponseType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${pro_id}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const result = await res.json();
               
                setData(result);
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pro_id]);

    if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
    if (error)   return <p className="text-center py-20 text-red-500">{error}</p>;
    if (!data)   return <p className="text-center py-20 text-gray-400">Product not found.</p>;

    return (
        <section>
            <div className="grid lg:grid-cols-2 gap-4 p-8">
                {/* Image */}
                <div className="flex items-center justify-center">
                    <Image
                        src={data.image || PlaceHolder}
                        alt={data.title || 'Product image'}
                        width={500}  
                        height={500}
                        className="w-[500px] h-[500px] object-contain"
                        priority     
                    />
                </div>

                {/* Detail */}
                <div className="font-semibold flex flex-col gap-3">
                    <h1 className="uppercase text-xl">
                        {data.title?.substring(0, 25)} 
                    </h1>
                    <p className="text-red-500 text-lg">
                        {`$${data.price?.toFixed(2)}`} 
                    </p>
                    <p className="mt-2 font-normal text-gray-600 leading-relaxed">
                        {data.description} 
                    </p>
                    <p className="text-sm text-gray-400 capitalize">
                        Category: {data.category}
                    </p>
                </div>
            </div>

            {/* Suggestion */}
            <div className="p-8">
                <h2 className="text-xl font-bold mb-4">Suggestions</h2>
                <CardProductSuggestionComponent />
            </div>
        </section>
    );
}