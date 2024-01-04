import React, { useState } from "react";
import { toast } from "react-toastify";
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


const schema = yup.object()
  .shape({
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
      age: yup.number().required("Age is Required").positive('Age must be a positive number'),
      gender: yup.string().required("Select a gender"),
      userType: yup.string().required("Select a user type"),
      secretKey: yup.string().when('userType', {
        is: 'adminVivs',
        then: yup.string().required("secret key is Required"),
      }),
  });


 const RegForm = () => {

   const {
     register,
     formState: { errors },
     handleSubmit,
   } = useForm({
     resolver: yupResolver(schema),
     mode: "all",
   });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agent, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  
  //  handling onchange on radio buttons
  const [userTypeValue, setUserTypeValue] = useState(null);
  const handleChange = (e) => {
    setUserTypeValue(e.target.value);
    console.log(e.target.value)
  };



  const onSubmit = (data) => {
    console.log(data);
    
    if (userTypeValue == "admin" && secretKey != "adminVivs") {
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
    else {
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
    }
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" >
      <div>
      <span>Sign up As</span>
      <label className="capitalize pl-2">
        <input type="radio" value='agent' {...register('userType')} onChange={handleChange}/>
        agent
      </label>
      <label className="capitalize pl-2">
        <input type="radio" value='admin' {...register('userType')} onChange={handleChange}/>
        admin
      </label>
      {errors.userType && <span className="text-danger-500 block text-sm px-2 py-1">{errors.userType.message}</span>}
      </div>
      {
        userTypeValue == "admin" && (
          <div>
            <label className="block capitalize">Secret Key</label>
            <input 
              type="password" 
              {...register('secretKey')} 
              className="h-[48px] form-control py-2" 
              onChange={(e) => setSecretKey(e.target.value)}
            />
            {errors.secretKey && <span className="text-danger-500 block text-sm px-2 py-1">{errors.secretKey.message}</span>}
          </div>
        )
      }
      <div>
        <label className="block capitalize">Name</label>
        <input 
          type="text" 
          {...register('name')} 
          placeholder="Enter Full name" 
          className="h-[48px] form-control py-2"
        />
        {errors.name && <span className="text-danger-500 block text-sm px-2 py-1">{errors.name.message}</span>}
      </div>
      <div>
        <label className="block capitalize">Email</label>
        <input 
          type="email" 
          {...register('email')} 
          placeholder="Enter email" 
          className="h-[48px] form-control py-2"
        />
        {errors.email && <span className="text-danger-500 block text-sm px-2 py-1">{errors.email.message}</span>}
      </div>
      <div>
        <label className="block capitalize">Password</label>
        <input 
          type="password" 
          {...register('password')}
          placeholder="8+ characters, 1 capitat letter" 
          className="h-[48px] form-control py-2"
         />
        {errors.password && <span className="text-danger-500 block text-sm px-2 py-1">{errors.password.message}</span>}
      </div>
      <div>
        <label className="block capitalize">Comfirm password</label>
        <input 
          type="password" 
          {...register('confirmpassword')} 
          placeholder="8+ characters, 1 capitat letter" 
          className="h-[48px] form-control py-2"/>
        {errors.confirmpassword && <span className="text-danger-500 block text-sm px-2 py-1">{errors.confirmpassword.message}</span>}
      </div>
      <div>
        <label className="block capitalize">Role</label>
        <input 
          type="text" 
          {...register('role')} 
          placeholder="Enter role" 
          className="h-[48px] form-control py-2"/>
        {errors.role && <span className="text-danger-500 block text-sm px-2 py-1">{errors.role.message}</span>}
      </div>
      <div>
        <label className="block capitalize">Telephone</label>
        <input 
          type="text" 
          {...register('telephone')} 
          placeholder="Enter telephone" 
          className="h-[48px] form-control py-2"/>
        {errors.telephone && <span className="text-danger-500 block text-sm px-2 py-1">{errors.telephone.message}</span>}
      </div>
      <div>
        <label className="block capitalize">Age</label>
        <input 
          type="number" 
          {...register('age', { valueAsNumber: true })} 
          placeholder="Enter your age" 
          className="h-[48px] form-control py-2"/>
        {errors.age && <span className="text-danger-500 block text-sm px-2 py-1">{errors.age.message}</span>}
      </div>
      <div>
      <Select
        name="gender"
        label="gender"
        options={options}
        register={register}
        error={errors.gender}
        className="h-[48px]"
      />
      </div>
      <div>
      <Checkbox
        label="You accept our Terms and Conditions and Privacy Policy"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      </div>
      <button type="submit" className="btn btn-dark block w-full text-center">
        Create an account
      </button>
    </form>
  );
};

export default RegForm;
