import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../slices/cartSlice";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";

type updateObj = {
  bookIds: Array<number>;
  userId: number;
};

const updateDatabase = async ({ bookIds, userId }: updateObj) => {
  console.log(bookIds, userId);
  bookIds.map(async (id) => {
    const { data } = await axios.put(
      `https://localhost:7147/book/ordered/${id}?userId=${userId}`
    );
    console.log(data);
  });
};

interface Props {
  isSuccess: boolean;
}

export const UpdateDatabase: React.FC<Props> = ({ isSuccess }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.value);
  const user = useSelector((state: RootState) => state.user.value);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(updateDatabase, {
    onSuccess: (data) => {
      dispatch(emptyCart());
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  useEffect(() => {
    const cartIds = cart.map((book) => book.id);
    const updateObj = {
      bookIds: cartIds,
      userId: user.userId,
    };
    if (isSuccess) {
      mutateAsync(updateObj as updateObj);
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <h1 className="my-4 text-3xl font-bold text-center text-blue-900">
      {isSuccess ? "Thankyou for your purchase!" : undefined}
    </h1>
  );
};
