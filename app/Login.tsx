import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  Button,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

interface Props {
  setLogin: () => void;
}

export type Login = {
  email: string;
  password: string;
};

const loginUser = async (user: Login) => {
  const { data: response } = await axios.post(
    `https://localhost:7147/login?Email=${user.email}&Password=${user.password}`
  );
  return response;
};

type jwtDetails = {
  token: string;
  userId: number;
  isAuth?: boolean;
};

type jwt = {
  exp: number;
};

export const Login: React.FC<Props> = ({ setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<Login>({
    mode: "onChange",
  });

  const getUserById = async (userState: any) => {
    const { data } = await axios.get(
      `https://localhost:7147/user/${userState?.userId}`,
      {
        headers: {
          authorization: `bearer ${userState?.token}`,
        },
      }
    );
  };

  const [jwtData, setjwtData] = useState<jwtDetails>(() => {
    const saved = localStorage.getItem("jwtData");
    const initialValue = JSON.parse(saved as any);
    return initialValue || "";
  });

  useEffect(() => {
    if (jwtData.token && jwt_decode(jwtData.token)) {
      const { exp } = jwt_decode(jwtData.token as string) as jwt;
      const currentTime = Date.now() / 1000;
      if (currentTime < exp) {
        getUserById(jwtData);
      }
    }
  }, [jwtData]);

  React.useEffect(() => {
    window.localStorage.setItem("jwtData", JSON.stringify(jwtData));
  }, [jwtData]);

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      setjwtData({ ...data, isAuth: true });
      const message = "success";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
  const onSubmit = (data: Login) => {
    const login = {
      ...data,
    };
    mutate(login);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const closeLogin = () => {
    setLogin();
  };

  return (
    <div className="w-[480px] bg-white  p-6 z-20 aboslute border-2 border-blue-900 rounded-md flex-col justify-center">
      <header className="font-bold text-2xl my-3 text-blue-900 text-center abolute">
        Login or create an account
        <button
          onClick={closeLogin}
          className="h-8 w-8 absolute p-2 bg-blue-400 rounded-full left-[460px] top-[-2%]"
        >
          <FontAwesomeIcon icon={faXmark} className="mb-5 -mt-1" />
        </button>
      </header>
      <div className="border-b-[1px] border-gray-300 pb-10 mb-5">
        <h3 className="font-semibold text-gray-600 ml-2">Log in here</h3>
        <p className="ml-2 text-gray-600 text-xs">
          If you have an account with us, please log in.
        </p>
        <form className="-ml-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <FormControl
              style={{ marginBottom: "20px", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Email
              </InputLabel>
              <OutlinedInput
                {...register("email")}
                style={{ width: "410px", height: "55px" }}
                id="email"
                label="email"
                required
                margin="dense"
                name="email"
                type="text"
              />
              <FormHelperText className="text-red-600"></FormHelperText>
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...register("password")}
                style={{ width: "410px" }}
                id="outlined-adornment-password"
                label="password"
                required
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ width: "410px" }}
              color="primary"
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : null
              }
            >
              Login
            </Button>
          </DialogActions>
        </form>
        <button className="ml-36 text-blue-400">Forgot password?</button>
      </div>
      <section className="text-gray-600 text-sm ml-2">
        <h3 className="font-semibold text-gray-600 text-base">New here</h3>
        <p className="my-2">Registraion is free and easy!</p>
        <ul className="list-disc ml-5 mb-4">
          <li>Faster checkout</li>
          <li>View and track orders and more</li>
          <li>Create your wishlist</li>
        </ul>
        <Button
          style={{ width: "410px" }}
          color="primary"
          type="button"
          variant="contained"
          onClick={closeLogin}
        >
          <Link href="/registration">Create an account</Link>
        </Button>
      </section>
    </div>
  );
};
