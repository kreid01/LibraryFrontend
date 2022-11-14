"use client";
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
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
import axios from "axios";

const createUser = async (data: User) => {
  const { firstName, lastName, email, password } = data;
  const { data: response } = await axios.post(
    `https://localhost:7147/register?FirstName=${firstName}&LastName=${lastName}&Email=${email}&Password=${password}`
  );
  return response.data;
};

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const registerSchema = object({
    firstName: string()
      .min(1, "Name is required")
      .max(32, "Name must be less than 100 characters"),
    lastName: string()
      .min(1, "Name is required")
      .max(32, "Name must be less than 100 characters"),
    email: string().min(1, "Email is required").email("Email is invalid"),
    password: string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string().min(1, "Please confirm your password"),
  }).refine((data: any) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
  type RegisterInput = TypeOf<typeof registerSchema>;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (data) => {
      router.push("/");
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
  const onSubmit = (data: User) => {
    const user = {
      ...data,
    };
    mutate(user);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="font-bold md:ml-[82px] ml-10 my-5 text-2xl text-blue-900">
        Create an account
      </h1>
      <div className="md:ml-[60px] ml-5 w-[410px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                First Name
              </InputLabel>
              <OutlinedInput
                {...register("firstName")}
                style={{ width: "380px", height: "55px" }}
                id="firstName"
                label="First Name"
                margin="dense"
                name="firstName"
                type="text"
                error={!!errors.firstName?.message}
              />
              <FormHelperText className="text-red-600">
                {errors.firstName ? errors.firstName.message : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Second Name
              </InputLabel>
              <OutlinedInput
                {...register("lastName")}
                style={{ width: "380px", height: "55px" }}
                id="lastName"
                label="Last Name"
                margin="dense"
                name="lastName"
                type="text"
                error={!!errors.lastName?.message}
              />
              <FormHelperText className="text-red-600">
                {errors.lastName ? errors.lastName.message : ""}
              </FormHelperText>{" "}
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Email Adress
              </InputLabel>
              <OutlinedInput
                {...register("email")}
                style={{ width: "380px", height: "55px" }}
                id="email"
                label="Email Address"
                margin="dense"
                name="email"
                error={!!errors.email}
                type="text"
              />
              <FormHelperText className="text-red-600">
                {errors.email ? errors.email.message : ""}
              </FormHelperText>
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
                style={{ width: "380px" }}
                id="outlined-adornment-password"
                label="password"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
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
              <FormHelperText className="text-red-600">
                {errors.password ? errors.password.message : ""}
              </FormHelperText>{" "}
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                style={{ width: "380px" }}
                {...register("passwordConfirm")}
                error={!!errors.passwordConfirm}
                id="outlined-adornment-password"
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
                label="password"
              />
              <FormHelperText className="text-red-600">
                {errors.passwordConfirm ? errors.passwordConfirm.message : ""}
              </FormHelperText>{" "}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
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
              Register
            </Button>
          </DialogActions>
        </form>
      </div>
    </>
  );
}
