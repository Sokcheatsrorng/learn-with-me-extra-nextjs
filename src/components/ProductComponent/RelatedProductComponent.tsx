"use client"

import { CardProductResponseType } from "@/lib/product";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlaceHolder from '../../../public/asset/place_holder.png'
import { MagicCard } from "@/components/magicui/magic-card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CardProductSuggestionComponent() {
    const [product, setProduct] = useState<CardProductResponseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParam = useSearchParams();
    const category = searchParam.get("type");

    useEffect(() => {
        if (!category) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                
                const res = await fetch(
                    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
                );
                if (!res.ok) throw new Error("Failed to fetch suggestions");
                const data = await res.json();
              
                setProduct(Array.isArray(data) ? data : data.products ?? []);
            } catch (err) {
                setError("Failed to load suggestions.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]); 

    if (loading) return <p className="text-center py-10 text-gray-500">Loading suggestions...</p>;
    if (error)   return <p className="text-center py-10 text-red-500">{error}</p>;
    if (!product.length) return <p className="text-center py-10 text-gray-400">No suggestions found.</p>;

    return (
        <div>
            <div className="grid container lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 p-8">
                {product.map(({ image, title, description, price, id, category }, index) => (
                    <div key={id}>
                        <Link href={`/product/${id}?type=${category}`}>
                            <MagicCard>
                                <Card>
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <h4 className="text-tiny uppercase font-bold">
                                            {title.substring(0, 25)} 
                                        </h4>
                                        <p className="text-large line-clamp-2">{description}</p>
                                    </CardHeader>

                                    <CardBody className="overflow-visible py-2">
                                        <Image
                                            alt={title}
                                            className="rounded-xl w-[250px] h-[250px] object-contain"
                                            src={image || PlaceHolder} 
                                            width={250}
                                            height={250}              
                                            priority={index < 4}       
                                        />
                                    </CardBody>

                                    <CardFooter className="flex justify-between">
                                        <Button
                                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-lg"
                                            radius="full"
                                        >
                                            Add To Cart
                                        </Button>
                                        <h4 className="font-bold text-large text-red-500">
                                            ${price?.toFixed(2)} 
                                        </h4>
                                    </CardFooter>
                                </Card>
                            </MagicCard>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}