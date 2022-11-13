import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const CartNavQuantity: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.value);
  const cartQuantity = `Cart (${cart.length})`;

  return <>{cartQuantity}</>;
};
