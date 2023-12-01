import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import dynamic from "next/dynamic";
import {
  getCategories,
  getCategoriesProducts,
  getHomeCategories,
  getProducts,
  getServices,
  getSingleCategory,
} from "../server/api";

// Interfaces
import { ICategory, IProduct, IService } from "../server/interfaces";
import Toast from "../components/utils/toast";
import { useContext } from "react";
import { FormContext } from "../store/form";
import { TranslationsContext } from "../store/translations";

// Sections
const Hero = dynamic(() => import("../components/home/hero"));
const Products = dynamic(() => import("../components/home/products"));
const Contacts = dynamic(() => import("../components/home/contact"));
const ProductsSection = dynamic(() => import("../components/home/products"));
const CategoriesHome = dynamic(() => import("../components/home/categories"));
const Services = dynamic(() => import("../components/home/service"));
interface PageProps {
  categories: ICategory[];
  products: IProduct[];
  categoriesProducts: ICategory[];
  service: IService[];
}

export default function Page({
  categories,
  products,
  categoriesProducts,
  service,
}: PageProps) {
  const { isSuccess } = useContext(FormContext);
  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead title={"Glasses"} desc={""} canonical={"/"} />
      <Layout categories={categories}>
        <Hero />
        <CategoriesHome categories={categories} />
        <ProductsSection
          category={
            categoriesProducts.filter((item) => item.products.length > 0)[0]
          }
        />
        <Services services={service} />
        <ProductsSection
          category={
            categoriesProducts.filter((item) => item.products.length > 0)[1]
          }
        />
        <Contacts />
      </Layout>
      <Toast
        variant="success"
        toast={isSuccess ? true : false}
        message={`${t["main.successfully_sent"]}!`}
      />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const categories = await getHomeCategories(ctx.locale);
  const categoriesProducts = await getCategoriesProducts(ctx.locale);
  // const categories1 = await getSingleCategory(ctx.locale,);
  // const Homecategories = await getHomeCategories(ctx.locale);
  const products = await getProducts(ctx.locale);
  const categoriesAll = await getCategories(ctx.locale);
  const service = await getServices(ctx.locale);
  return {
    props: { categories, products, categoriesProducts, service, categoriesAll },
  };
}
