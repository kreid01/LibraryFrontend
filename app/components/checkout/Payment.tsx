import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Address } from "./Checkout";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { UpdateDatabase } from "./UpdateDatabase";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    paypal: any;
  }
}

interface Props {
  address: Address | null;
}

type Order = {
  userId: number;
  isBorrowing: boolean;
  bookIds: Array<Number>;
  addressId: number;
  cartTotal: number;
};

const postAddress = async (data: Address) => {
  const { firstName, lastName, addressLine1, addressLine2, postcode, city } =
    data;
  const { data: response } = await axios.post(
    `https://localhost:7147/address?UserId=${1}&FirstName=${firstName}&LastName=${lastName}&AddressLine1=${addressLine1}&AddressLine2=${addressLine2}&Postcode=${postcode}&City=${city}`
  );
  return response.data;
};

const postOrder = async (data: Order) => {
  const { userId, isBorrowing, bookIds, addressId, cartTotal } = data;
  const { data: response } = await axios.post(
    `https://localhost:7147/orders?UserId=${userId}&IsBorrowing=${isBorrowing}&BookIds=${bookIds}&AddressId=${addressId}&TotalPrice=${cartTotal}`
  );
  return response.data;
};

export const Payment: React.FC<Props> = ({ address }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const paypal = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [addressId, setAddressId] = useState<number>();
  const cart = useSelector((state: RootState) => state.cart.value);
  const user = useSelector((state: RootState) => state.user.value);
  const cartTotal = cart.reduce((acc, book) => {
    return acc + book.price;
  }, 0);

  const orderDetails = {
    userId: user.userId,
    isBorrowing: cart.some((book) => book.isBorrowing === true),
    bookIds: cart.map((book) => {
      return book.id;
    }),
    cartTotal: cartTotal,
    addressId: addressId,
  };

  const { mutate, isLoading } = useMutation(postAddress, {
    onSuccess: (data) => {
      mutateAsync(orderDetails as Order);
      const message = "success";
      setAddressId(data);
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const { mutateAsync, isSuccess } = useMutation(postOrder, {
    onSuccess: (data) => {},
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=ASg4hURsYhE4RiPY5jGySBazfMbXOvU8ReDCX3eWvH8h5PcAz86zd1Y_bFzzpo1P0dm4stlx40_aemjF`;
      script.async = true;

      script.onload = () => setScriptLoaded(true);

      document.body.appendChild(script);
    };
    addPaypalScript();
  }, []);

  React.useEffect(() => {
    if (scriptLoaded) {
      window.paypal
        .Buttons({
          createOrder: (data: any, action: any) => {
            return action.order.create({
              purchase_units: [
                {
                  amount: {
                    value: cartTotal,
                    currecny_code: "GBP",
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, action: any) => {
            const order = await action.order.capture();
            mutate(address as Address);
          },
          onCancel: async (data: any, action: any) => {
            router.push("/");
          },
          onError: (err: any) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }
  }, [scriptLoaded]);
  return (
    <div className=" md:w-[50%]  w-full mx-auto">
      <UpdateDatabase isSuccess={isSuccess} />
      <div ref={paypal}></div>
    </div>
  );
};

export default Payment;