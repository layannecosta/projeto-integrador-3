import { useEffect, useState } from "react";
import CardProduct from "../../components/card-product/cardProduct";
import { products } from "./type";
import { getApiAllProducts, getApiAllProductsOrders } from "./services";
import ListLoading from "../../components/list-loading";

export default function ListAllProducts() {
   const [allProducts, setAllProducts] = useState<products[]>([]);

   const [isLoadingRecents, setIsLoadingRecents] = useState(false);

   async function getAllProducts() {
      setIsLoadingRecents(true)
      try {
         const response = await getApiAllProducts();
         setAllProducts(response.data);
      } catch (error) {
         alert("Houve um erro ao buscar produtos recentes.");
      }
      setIsLoadingRecents(false)
   }

   async function getAllOrdersProducts(typeOrder: "descending" | "ascending") {
      setAllProducts([]);
      setIsLoadingRecents(true);
      try {
         const response = await getApiAllProductsOrders(typeOrder);
         setAllProducts(response.data);
      } catch (error) {
         alert("Houve um erro ao buscar produtos recentes.");
      }
      setIsLoadingRecents(false)
   }

   useEffect(() => {
      getAllProducts();
   }, []);

   return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
         {/* Título */}
         <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">Todos os Produtos</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secundary mx-auto rounded-full"></div>
            <p className="text-gray-600 text-lg">Descubra as melhores ofertas disponíveis</p>
         </div>

         {/* Ordenação dos produtos */}
         <div>
            <p>
               Ordenar por: {" "}
               <button
                  className=" text-primary"
                  onClick={() => getAllOrdersProducts("ascending")}
               > Menor preço</button> {" "} | {" "}
               <button
                  className=" text-primary"
                  onClick={() => getAllOrdersProducts("descending")}
               >Maior preço</button>
            </p>
         </div>

         {/* Grid de produtos */}
         {isLoadingRecents && <ListLoading />}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {allProducts.map((products) => (
               <CardProduct
                  key={products._id}
                  name={products.name}
                  img={products.url1}
                  manufacturer={products.manufacturer}
                  price={products.price}
               />
            ))}
         </div>
      </div>
   );
}