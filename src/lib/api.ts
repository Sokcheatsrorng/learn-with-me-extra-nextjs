
"use client"


export type ProductId = {
    pro_id: number;
}


export default async function fetchProductById({ pro_id }: ProductId) {

    // const res = await fetch(`${process.env.NEXT_PUBLIC_FAKE_STORE_BASE_URL}/${pro_id}`);
    // const data:CardProductResponseType = await res.json();
    // console.log("The data of product", data)
    fetch(`https://fakestoreapi.in/api/product/${pro_id}`)
        .then(res => res.json())
        .then(res => {
            const data = res.products;
            console.log(data)
            return data;
        })
}