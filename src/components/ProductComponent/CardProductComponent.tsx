"use client"

import { CardProductResponseType } from "@/lib/product";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlaceHolder from '../../../public/asset/place_holder.png'
import { MagicCard } from "@/components/magicui/magic-card";
import Link from "next/link";

type PaginationType = {
    query: string,
    currentPage: number
}

export default function CardProductComponent({ query, currentPage }: PaginationType) {
    const [product, setProduct] = useState<CardProductResponseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://fakestoreapi.com/products?page=${currentPage}&limit=8`
                );
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                // fakestoreapi.com returns a plain array, not { products: [] }
                setProduct(Array.isArray(data) ? data : data.products ?? []);
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, currentPage]); //

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

    return (
        <div>
            <div className="grid container lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 p-8 mx-auto">
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
                                            width={270}
                                            height={270}              
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
                                        <h4 className="font-bold text-large text-red-500">{price}$</h4>
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