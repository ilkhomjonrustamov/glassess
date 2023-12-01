import axios from "axios";
import { ICategory, IService, IStoreObjectData } from "./interfaces";
import { useRouter } from "next/router";

export async function getCategories(locale: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/categories`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data.results;

  return data;
}
export async function getHomeCategories(locale: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/main_categories`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data.results;

  return data;
}
export async function getCategoriesProducts(locale: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/category_with_products`,
    {
      headers: { Language: locale },
    }
  );
  const data = await res.data.results;
  return data;
}
export async function getServices(locale: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/services`, {
    headers: { Language: locale },
  });
  const data = await res.data.results;
  return data;
}

export async function getSingleCategory(locale: string, slug: any) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/categories/${slug}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data;

  return data as ICategory;
}
export async function getSingleService(locale: string, slug: any) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/services/${slug}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data;

  return data as IService;
}

export async function getProducts(locale: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/products`, {
    headers: { Language: locale },
  });

  const data = await res.data.results;

  return data;
}

export async function getSingleProduct(locale: string, slug: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/products/${slug}`,
    {
      headers: { Language: locale },
    }
  );

  const data = await res.data;

  return data;
}

export async function searchProducts(query: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/products?search=${query}`
  );

  const data = res.data;

  return data;
}

export async function getSiteinfo(locale: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/static_infos`,
    {
      headers: { language: locale },
    }
  );

  const data = res.data;

  return data;
}

export async function storeOrders(data: IStoreObjectData) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/application/create`,
    data
  );
  return res.data;
}
export async function getFilteredProducts(locale: any, query: any) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/products`, {
    params: {
      ...query,
    },
    headers: { Language: locale },
  });

  const data = await res.data.results;
  return data;
}

export async function getAtributsColors() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/atributs`);
  const data = await res.data.colors;

  return data;
}
export async function getAtributsForms() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/atributs`);
  const data = await res.data.forms;

  return data;
}
export async function getAtributsMaterial() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/atributs`);
  const data = await res.data.materials;

  return data;
}
export async function getAtributsSizes() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/atributs`);
  const data = await res.data.sizes;
  return data;
}
