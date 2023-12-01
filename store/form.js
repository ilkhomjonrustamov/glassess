import { createContext, useState } from "react";

export const FormContext = createContext();

export default function FormContextProvider({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <FormContext.Provider
      value={{
        isSuccess,
        setIsSuccess,
        products,
        setProducts,
        query,
        setQuery,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
