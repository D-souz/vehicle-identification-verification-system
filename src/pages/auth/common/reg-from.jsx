import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { registerAgent, reset } from "./store";


const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    // confirm password
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
      role: yup.string().required("A role is Required"),
      telephone: yup.string().required("Telephone is Required"),
  })
  .required();

const RegForm = () => {
  const dispatch = useDispatch();
  const { agent, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registerAgent(data));

    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isSuccess || agent) {
      toast.success("Agent registered successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
      // console.log(data);
    }
    // reset the state
    dispatch(reset()); 
  };

  if (isLoading) {
    toast.info("Registering agent...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="name"
        label="name"
        type="text"
        placeholder="Enter your name"
        register={register}
        error={errors.name}
        className="h-[48px]"
      />
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder=" Enter your email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder=" Enter your password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <Textinput
        name="confirmpassword"
        label="Comfirm password"
        type="password"
        placeholder=" Confirm your password"
        register={register}
        error={errors.confirmpassword}
        className="h-[48px]"
      />
       <Textinput
        name="role"
        label="role"
        type="text"
        placeholder=" Enter your role"
        register={register}
        error={errors.role}
        className="h-[48px]"
      />
       <Textinput
        name="telephone"
        label="telephone"
        type="tel"
        placeholder=" Enter your telephone"
        register={register}
        error={errors.telephone}
        className="h-[48px]"
      />
      <Checkbox
        label="You accept our Terms and Conditions and Privacy Policy"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <button type="submit" className="btn btn-dark block w-full text-center">
        Create an account
      </button>
    </form>
  );
};

export default RegForm;
