// import { Globe } from "@/components/magicui/globe";
import LoadingComponent from "@/components/LoadingComponents/ProductLoadingComponent";
import CardProductComponent from "@/components/ProductComponent/CardProductComponent";
import { PaginationProducts } from "@/components/ProductComponent/ProductPaginationComponent";

import { AuroraText } from "@/components/magicui/aurora-text";
import StyledComponentsRegistry from "@/lib/registry";
import { Suspense } from "react";
 

export default async function Home(
  props:{
    searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
  }
) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '4';
  const currentPage = Number(searchParams?.page) || 1;
  return (
   <div>
    {/* <Globe /> */}

    <div>
      <h1 className="text-2xl font-bold text-center">
        <AuroraText>Our Products</AuroraText>
      </h1>
      <StyledComponentsRegistry>
          <Suspense  key={query + currentPage}  fallback={<LoadingComponent/>}>
         <CardProductComponent query={query} currentPage={currentPage}/>
       </Suspense>
          <div className="text-center">
              <PaginationProducts
               page={currentPage} 
               limit={query}
                previous={
                  currentPage != 0 ? currentPage -1: currentPage + 1
                }
                 next={
                   currentPage != 0 ? currentPage +1: currentPage - 1
                 } />
             
        </div>
        

      </StyledComponentsRegistry>
    
   
    </div>
   </div>
  );
}
