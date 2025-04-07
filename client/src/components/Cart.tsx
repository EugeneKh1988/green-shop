"use client";

import { useGlobalContext } from "@/app/Context/store";
import { IPlant, IPlantCart, ISizeCount } from "@/lib/Interfaces";
import { delFromLocalStorage, discountPrice, fromLocalStorage, plantsCount, toLocalStorage } from "@/utils/utils";
import { ActionIcon, Button, Table, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import StrapiImage from "./StrapiImage";
import { useLazyQuery } from "@apollo/client";
import { cartPlantsQuery, cartPlantsQueryVariables } from "@/queries/cartPlants";
import { notifications } from "@mantine/notifications";
import SvgIcon from "./SvgIcon";
import Link from "next/link";


interface CartProps {
  className?: string;
}

const Cart: React.FC<CartProps> = ({ className }) => {
  const classNameValue = className ? `${className}` : "";
  // context
  const { productCartCount, setProductCartCount } = useGlobalContext();
  // plant from localStorage
  const [cartPlants, setCartPlants] = useState<IPlantCart[]>([]);
  const [
    getPlantsData,
    { data: dbData, error: dbDataError, loading: initLoading, refetch },
  ] = useLazyQuery<{ plants: IPlant[] }>(cartPlantsQuery, {
    errorPolicy: "all",
  });
  console.log(dbData);

  useEffect(() => {
    // load plants from localStorage
    setCartPlants(fromLocalStorage<IPlantCart[]>("cart") || []);
  }, []);

  // load plants data from server
  useEffect(() => {
    if (cartPlants && cartPlants.length > 0) {
      getPlantsData({ variables: cartPlantsQueryVariables(cartPlants) });
    }
  }, [cartPlants]);

  // if error was set
  useEffect(() => {
    console.log(dbDataError?.message);
    if (
      dbDataError &&
      (dbDataError.message == "Forbidden access" ||
        dbDataError.message ==
          "Response not successful: Received status code 401")
    ) {
      delFromLocalStorage("user");
      refetch();
    }
    if (dbDataError) {
      notifications.show({
        message: dbDataError.message,
        color: "red",
      });
    }
  }, [dbDataError]);

  // cartPlant by documentId
  const cartPlantByDocumentId = (documentId: string) => {
    if(cartPlants && cartPlants.length > 0) {
      const resArr = cartPlants.filter(item => item.documentId == documentId);
      return resArr && resArr.length > 0 ? resArr[0] : null;
    }
    return null;
  };

  // plants data by documentId
  const dbPlantByDocumentId = (documentId: string) => {
    if(dbData && dbData.plants.length > 0) {
      const resArr = dbData.plants.filter(item => item.documentId == documentId);
      return resArr && resArr.length > 0 ? resArr[0] : null;
    }
    return null;
  };

  const decreaseCount = (documentId?: string, size?: string) => {
    // copy cart plants
    const updatedCartPlants = [...cartPlants];
    // find index of plant by documentId
    const foundIndex = updatedCartPlants.findIndex(value => value.documentId === documentId && value.sizeCount?.size === size);
    if(foundIndex >=0 && updatedCartPlants[foundIndex].sizeCount?.count) {
      let count = updatedCartPlants[foundIndex].sizeCount?.count;
      // change count
      count > 1 ?  updatedCartPlants[foundIndex].sizeCount.count = updatedCartPlants[foundIndex].sizeCount?.count - 1 : null;
      // change state to rerender
      setCartPlants(updatedCartPlants);
      // save to localStorage
      toLocalStorage<IPlantCart[]>("cart", updatedCartPlants);
      // change cart badge counter
      setProductCartCount(plantsCount());
    }
  };

  const increaseCount = (documentId?: string, size?: string, sizeCount?: ISizeCount[]) => {
    const updatedCartPlants = [...cartPlants];
    const foundIndex = updatedCartPlants.findIndex(value => value.documentId === documentId && value.sizeCount?.size === size);
    if(foundIndex >=0 && updatedCartPlants[foundIndex].sizeCount?.count && sizeCount) {
      let count = updatedCartPlants[foundIndex].sizeCount?.count;
      const foundsizeCount = sizeCount.filter(item => item.size === updatedCartPlants[foundIndex].sizeCount?.size);
      if(foundsizeCount && foundsizeCount.length > 0) {
        count < (foundsizeCount[0].count || 1) ?  updatedCartPlants[foundIndex].sizeCount.count = updatedCartPlants[foundIndex].sizeCount?.count + 1 : null;
        setCartPlants(updatedCartPlants);
        toLocalStorage<IPlantCart[]>("cart", updatedCartPlants);
        setProductCartCount(plantsCount());
      }
    }
  };

  const countTotal = (dbplant: IPlant, plantCart: IPlantCart) => {
    const count = plantCart?.sizeCount?.count || 1;
    const price = parseFloat((discountPrice(dbplant?.discount, dbplant?.price) || "0"));
    return count * price;
  };

  const subTotal = () => {
    let value = 0;
    cartPlants.forEach(cartPlant => {
      const dbPlant = dbPlantByDocumentId(cartPlant.documentId || "");
      if(dbPlant) {
        value += countTotal(dbPlant, cartPlant);
      }
    });
    return value;
  }

  const removeFromCart = (documentId?: string, sizeCount?: ISizeCount) => {
    // copy cart plants
    const updatedCartPlants = [...cartPlants];
    // find index of plant by documentId
    const foundIndex = updatedCartPlants.findIndex(value => value.documentId === documentId && value.sizeCount?.size === sizeCount?.size);
    if(foundIndex >= 0) {
      updatedCartPlants.splice(foundIndex, 1);
      // change state to rerender
      setCartPlants(updatedCartPlants);
      // save to localStorage
      toLocalStorage<IPlantCart[]>("cart", updatedCartPlants);
      // change cart badge counter
      setProductCartCount(plantsCount());
      //refetch();
    }
  };

  const plantRows = () => {
    return cartPlants.map((cartPlant, index) => {
      const dbPlant = dbPlantByDocumentId(cartPlant.documentId || "")
      if(dbPlant) {
        return plantRow(cartPlant, dbPlant, index);
      }
      return null;
    });
  };

  const plantRow = (cartItem: IPlantCart, dbPlant: IPlant, rowNum: number) => {
    return (
      <Table.Tr key={rowNum} className="bg-alabaster">
        <Table.Td>
          <div className="flex gap-14 items-center">
            {dbPlant?.cover ? (
              <StrapiImage
                src={dbPlant.cover?.url}
                width={dbPlant.cover?.width || 0}
                height={dbPlant.cover?.height || 0}
                alt={dbPlant.name || ""}
                className="max-w-70 mix-blend-multiply"
              />
            ) : null}
            <div>
              <div className="flex gap-5 items-center">
                <h5 className="font-medium text-[16px] leading-16">
                  {dbPlant?.name}
                </h5>
                <div className="flex justify-center items-center rounded-full border border-chateau-green text-[12px] text-chateau-green min-w-20">{cartItem.sizeCount?.size}</div>
              </div>
              <p className="mt-6 text-[14px] leading-16">
                SKU:<span className="text-dove-gray"> {dbPlant?.sku}</span>
              </p>
            </div>
          </div>
        </Table.Td>
        <Table.Td className="font-medium text-[16px] leading-16 text-dove-gray">
          ${discountPrice(dbPlant?.discount, dbPlant?.price) || ""}
        </Table.Td>
        <Table.Td>
          <div className="flex gap-16 items-center">
            <div
              className="cursor-pointer rounded-full w-22 h-25 shrink-0 bg-chateau-green hover:bg-chateau-green-600 text-white text-[17px] leading-16 flex justify-center items-center"
              onClick={() =>
                decreaseCount(dbPlant?.documentId, cartItem.sizeCount?.size)
              }
            >
              -
            </div>
            <p className="text-[17px] leading-10">
              {cartItem?.sizeCount?.count}
            </p>
            <div
              className="cursor-pointer rounded-full w-22 h-25 shrink-0 bg-chateau-green hover:bg-chateau-green-600 text-white text-[17px] leading-16 flex justify-center items-center"
              onClick={() =>
                increaseCount(
                  dbPlant?.documentId,
                  cartItem.sizeCount?.size,
                  dbPlant?.sizeCount
                )
              }
            >
              +
            </div>
          </div>
        </Table.Td>
        <Table.Td className="font-bold text-[16px] leading-16 text-chateau-green">
          ${countTotal(dbPlant, cartItem).toFixed(2)}
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="transparent"
            onClick={() =>
              removeFromCart(dbPlant.documentId, cartItem?.sizeCount)
            }
          >
            <SvgIcon iconName="remove" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  };

  return (
    <div
      className={`mt-51 pb-87 flex flex-col lg:flex-row gap-86 items-start ${classNameValue}`}
    >
      {cartPlants && cartPlants.length > 0 ? (
        <>
          <Table
            withRowBorders={false}
            classNames={{
              th: "pt-0 pb-11 font-medium text-[16px] leading-16 border-b-[0.3px] border-b-chateau-green/50",
              td: "",
              table: "border-separate border-spacing-y-10",
              thead: "",
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Products</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{plantRows()}</Table.Tbody>
          </Table>
          <div className="lg:min-w-328">
            <h4 className="mt-10 text-[18px] leading-16 font-bold pb-11 border-b-[0.3px] border-b-chateau-green/50">
              Cart Totals
            </h4>
            <p className="mt-11 text-[14px] leading-16">Coupon Apply</p>
            <div className="flex mt-8">
              <TextInput
                placeholder="Enter coupon code here..."
                classNames={{
                  input:
                    "rounded-l-[3px] rounded-r-none placeholder:text-silver-chalice border-1 border-r-0 border-chateau-green min-h-40",
                  root: "grow",
                }}
              />
              <Button className="bg-chateau-green hover:bg-chateau-green-600 text-white min-h-40 font-bold text-[15px] leading-16 rounded-l-none rounded-r-[3px]">
                Apply
              </Button>
            </div>
            <div className="flex justify-between mt-30">
              <p className="text-[15px] leading-16">Subtotal</p>
              <p className="font-medium text-[18px] leading-16">
                ${subTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between mt-15">
              <p className="text-[15px] leading-16">Coupon Discount</p>
              <p className="text-[15px] leading-16">(-) 00.00</p>
            </div>
            <div className="flex justify-between mt-21">
              <p className="text-[15px] leading-16">Shiping</p>
              <p className="font-medium text-[18px] leading-16">$16.00</p>
            </div>
            <p className="text-right mt-8 text-[12px] leading-16 text-chateau-green">
              View shipping charge
            </p>
            <div className="flex justify-between mt-26">
              <p className="text-[16px] leading-16 font-bold">Total</p>
              <p className="font-bold text-[18px] leading-16 text-chateau-green">
                ${(subTotal() + 16).toFixed(2)}
              </p>
            </div>
            <Button className="w-full mt-41 bg-chateau-green hover:bg-chateau-green-600 text-white min-h-40 font-bold text-[15px] leading-16 rounded-[3px]">
              Proceed To Checkout
            </Button>
            <Link
              href="/"
              className="block text-center mt-14 text-[15px] leading-16 text-chateau-green"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (<p className="text-[18px] leading-18 text-chateau-green w-full text-center">Cart is empty!</p>)}
    </div>
  );
};

export default Cart;
