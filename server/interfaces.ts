export interface IStorageOrder {
  id: number;
  title: string;
  image: string | null;
  count: number;
}

export interface ICategory {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  desc: string | null;
  products: IProduct[];
  children: ICategory[];
}

export interface IProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  // image: string | null;
  includes: string | null;
  category: ICategory;
  details: string | null;
  desc: string | null;
  images: { id: number; image: string }[];
  material: [];
  sizes: { id: number; title: string }[];
  gender: string;
  colors: { id: number; title: string; hex: string }[];
}

export interface IService {
  id: number;
  image: string;
  slug: string;
  title: string;
  sub_text: string;
}
export interface IObjectOrder {
  id: number;
  count: number;
}

export interface IStoreObjectData {
  full_name: string;
  phone_number: string;
  message: string;
  email: string;
  city: string;
  product: string;
  color: number;
  size: number;
}
export interface IStore {
  name: string;
  number: string;
}
export interface IColors {
  id: number;
  title: string;
  hex: string;
}

export interface IMaterials {
  id: number;
  title: string;
}
export interface ISizes {
  id: number;
  title: string;
}

export interface IForms {
  id: number;
  title: string;
}
