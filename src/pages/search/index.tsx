import { useParams } from "react-router";
import CardProduct from "../../components/card-product/cardProduct";
import { getApiProductsbyName } from "./services";
import { useEffect, useState } from "react";
import { products } from "../list-recents-products/type";
import { Products } from "../home/type";
import ListLoading from "../../components/list-loading";

export default function SearchProducts() {

    const params = useParams();

    const [allProducts, setAllProducts] = useState<Products[]>([]);

    const [isLoadingProducts, setIsLoadingProducts] = useState(false);


    const nameProduct = params?.product;

    async function getProductsbyName() {
        setIsLoadingProducts(true)
        try {
            const response = await getApiProductsbyName(nameProduct ?? "")
            setAllProducts(response.data);
        } catch (error) {
            alert("Erro ao buscar produtos por nome");
        }
        setIsLoadingProducts(false)
    }

    useEffect(() => {
        getProductsbyName();
    }, []);


    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Título*/}
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-800">Resultado da Busca</h1>
                <div className="w-32 h-1 bg-gradient-to-r from-primary to-secundary rounded-full"></div>
                <p className="text-gray-600 text-lg">Encontramos {allProducts.length} produtos para sua pesquisa</p>
            </div>
            {isLoadingProducts && <ListLoading />}
            {/* Grid de produtos*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                {allProducts.map((products) => (
                    <CardProduct
                        key={products._id}
                        id={products._id}
                        name={products.name}
                        img={products.url1}
                        manufacturer={products.manufacturer}
                        price={products.price}
                    />
                ))}
            </div>
        </div>
    )
}