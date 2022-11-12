import {
  DialogActions,
  DialogContent,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, lazy, Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = lazy(() => import("./Payment"));

type Address = {
  firstName: string;
  lastName: string;
  firstLine: string;
  secondLine: string;
  city: string;
  postcode: string;
};

export const Checkout = () => {
  const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

  const [address, setAddress] = useState<Address | null>(null);
  const onSubmit = (data: Address) => {
    setAddress(data);
    toggleIsPaying();
  };
  const [isPaying, setIsPaying] = useState(false);

  const toggleIsPaying = () => {
    setIsPaying((prevState) => !prevState);
    console.log(isPaying);
  };

  const { register, handleSubmit } = useForm<Address>({
    mode: "onChange",
  });

  return (
    <div>
      <header className="font-bold text-3xl py-6 text-center text-blue-900 border-y-[1px] border-gray-400">
        <h1>Secure Checkout</h1>
      </header>
      {!isPaying && (
        <section>
          <h3 className="text-center font-bold underline py-3 text-lg text-blue-900">
            Devliery Address
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <div className="flex">
                <FormControl
                  style={{ marginBottom: "20px", width: "55ch" }}
                  variant="outlined"
                >
                  {" "}
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <OutlinedInput
                    {...register("firstName")}
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    type="text"
                  />
                </FormControl>
                <FormControl
                  style={{
                    marginBottom: "20px",
                    width: "55ch",
                    marginLeft: "1ch",
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <OutlinedInput
                    {...register("lastName")}
                    id="lastName"
                    label="lastName"
                    required
                    name="lastName"
                    type="text"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  style={{ marginBottom: "20px", width: "81ch" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="firstLine">Address Line 1</InputLabel>
                  <OutlinedInput
                    {...register("firstLine")}
                    style={{ height: "55px" }}
                    id="firstLine"
                    label="Address Line 1"
                    required
                    margin="dense"
                    name="firstLine"
                    type="text"
                  />
                </FormControl>
              </div>
              <FormControl
                style={{ marginBottom: "20px", width: "81ch" }}
                variant="outlined"
              >
                {" "}
                <InputLabel htmlFor="secondLine">Address Line 2</InputLabel>
                <OutlinedInput
                  {...register("secondLine")}
                  id="secondLine"
                  label="Address Line 2"
                  margin="dense"
                  style={{ height: "55px" }}
                  name="secondLine"
                  type="text"
                />
              </FormControl>
              <div className="flex">
                <FormControl
                  style={{ marginBottom: "20px", width: "55ch" }}
                  variant="outlined"
                >
                  {" "}
                  <InputLabel htmlFor="secondLine">Postcode</InputLabel>
                  <OutlinedInput
                    {...register("postcode")}
                    style={{ height: "55px" }}
                    id="postcode"
                    required
                    label="Postcode"
                    name="postcode"
                    type="text"
                  />
                </FormControl>
                <FormControl
                  style={{
                    marginBottom: "20px",
                    width: "55ch",
                    marginLeft: "1ch",
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="city">City/Town</InputLabel>
                  <OutlinedInput
                    {...register("city")}
                    style={{ height: "55px" }}
                    id="city"
                    label="City/Town"
                    required
                    name="city"
                    type="text"
                  />
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                className="text-lg font-bold w-60 mx-auto my-auto mb-4 mt-4 bg-blue-900 h-12 text-white
             rounded-md px-4 hover:brightness-[60%]"
              >
                <FontAwesomeIcon icon={faLock} /> Continue to Checkout
              </button>
            </DialogActions>
          </form>
        </section>
      )}
      {isPaying && (
        <Suspense fallback={<div>Loading...</div>}>
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </Suspense>
      )}

      {address != null && (
        <section className="border-blue-900 border-[1px] mb-5  text-blue-900">
          <div className="mx-6 my-3 text-sm">
            <h2 className="font-bold text-lg mb-2">Delivery Address</h2>
            <p>
              {address.firstName} {address.lastName}
            </p>
            <p>
              {address.firstLine} {address.secondLine}
            </p>
            <p>{address.city}</p>
            <p>{address.postcode}</p>
            <button className="text-blue-500 text-xs " onClick={toggleIsPaying}>
              Change Address
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Checkout;
