import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import Select from "../../../components/ui/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Radio from "@/components/ui/Radio";
import { useDispatch, useSelector } from "react-redux";
import { registerAgent, reset } from "./store";

const options = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  }
];

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
      gender: yup.string().required("Select a gender"),
      userType: yup.string().required("Select a user type"),
      secretKey: yup.string().required("secret key is Required"),
  })
  .required();

 const RegForm = () => {
  const dispatch = useDispatch();
  const { agent, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  //  handling onchange on radio buttons
  const [value, setValue] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value)
  };


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
    console.log(data);
    
    if (value == "admin" && secretKey != "adminVivs") {
      toast.error("Invalid secret key", {
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
    // else {
      // dispatch(registerAgent(data));
  
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
        toast.success("Registration successful!", {
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
       
      }

      // reset the state
      dispatch(reset()); 
    // }
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
      <div className="flex flex-wrap space-xy-5">
        <span>Sign up As</span>
        {/* <Radio
            label="agent"
            name="userType"
            value="agent"
            checked={value === "agent"}
            onChange={handleChange}
            register={register('userType')}
          />
          <Radio
            label="admin"
            name="userType"
            value="admin"
            checked={value === "admin"}
            onChange={handleChange}
            register={register('userType')}
          /> */}
      {/* <label htmlFor="agent" className="pl-4">
        <input
        name="userType"
         id="agent"
         type="radio"
         value="agent"
         {...register('userType')}
        //  register={register('userType')}
        //  error={errors.userType}
         onChange={(e) => setUserType(e.target.value)}
        />
         An agent
      </label>
      <label htmlFor="admin" className="pl-4">
        <input
          name="userType"
          id="admin"
          type="radio"
          value="admin"
          {...register('useType')}
          // register={register('userType')}
          // error={errors.userType}
          onChange={(e) => setUserType(e.target.value)}
        />
          Admin
      </label> */}
      <input type="radio" value="agent" onChange={handleChange}  name="userType"/>agent
      <input type="radio"  value="admin" onChange={handleChange}  name="userType"/>admin
      </div>
      {
        value == "admin" ? (
          <Textinput
          name="secretKey"
          label="secret key"
          type="text"
          placeholder="Enter the admin secret Key"
          register={register}
          error={errors.secretKey}
          className="h-[48px]"
          onChange={(e) => setSecretKey(e.target.value)}
        />
        ) 
        : 
        null
      }
      <Textinput
        name="name"
        label="name"
        type="text"
        placeholder="Enter Full name"
        register={register}
        error={errors.name}
        className="h-[48px]"
      />
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder="Enter email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="password"
        type="password"
        placeholder="8+ characters, 1 capitat letter "
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
        placeholder="Enter role"
        register={register}
        error={errors.role}
        className="h-[48px]"
      />
       <Textinput
        name="telephone"
        label="telephone"
        type="tel"
        placeholder="Enter telephone"
        register={register}
        error={errors.telephone}
        className="h-[48px]"
      />
      <Select
        name="gender"
        label="gender"
        options={options}
        register={register}
        error={errors.gender}
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
