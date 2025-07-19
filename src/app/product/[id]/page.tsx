import ProductDetailComponent from "@/components/ProductComponent/ProductDetailComponent";


export default async function DetailPage(
    {
        params
    }:
    {
        params: Promise<{id:number}>
    }
){

    const productId = await (await params).id;


    return(
        <div>
            <ProductDetailComponent pro_id={productId}/>



        </div>

    )
}