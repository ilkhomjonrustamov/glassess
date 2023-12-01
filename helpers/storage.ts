import { IProduct, IStorageOrder } from "../server/interfaces";

export function isFound(productID: number) {
  const storage = localStorage.getItem("orders");
  const orders: IStorageOrder[] = storage === null ? [] : JSON.parse(storage);
  let object = {
    boolean: false,
    count: 1,
  };

  orders.map((order) => {
    if (order.id === productID)
      return (object = { boolean: true, count: order.count });
  });

  return object;
}

export function save(product: IProduct, newCount: number, setOrders: Function) {
  const storage = localStorage.getItem("orders");
  const orders: IStorageOrder[] = storage === null ? [] : JSON.parse(storage);
  let newOrder = {} as IStorageOrder;

  newOrder = {
    id: product.id,
    title: product.title,
    image: product.images.length > 0 ? product.images[0].image : null,
    count: newCount,
  };

  orders.push(newOrder);

  setOrders(orders);
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function update(
  productID: number,
  newCount: number,
  setOrders: Function
) {
  const storage = localStorage.getItem("orders");
  const orders: IStorageOrder[] = storage === null ? [] : JSON.parse(storage);

  orders.map((order, idx) => {
    if (order.id === productID) {
      order.count = newCount;

      orders[idx] = order;
    }
  });

  setOrders(orders);
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function deleteOrder(
  productID: number,
  orders: IStorageOrder[],
  setOrders: Function
) {
  let array = [...orders];
  const removableItem = array.findIndex((product) => product?.id === productID);
  array.splice(removableItem, 1);
  setOrders(array);
  localStorage.setItem("orders", JSON.stringify(array));
}

export function deleteAll(setOrders: Function) {
  setOrders([]);
  localStorage.setItem("orders", JSON.stringify([]));
}
