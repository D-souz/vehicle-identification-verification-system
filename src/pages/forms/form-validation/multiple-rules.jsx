import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
// import Card from "../../../components/ui/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Fileinput from "@/components/ui/Fileinput";
// import DropZone from "../file-input/DropZone";
import { useDispatch, useSelector } from "react-redux";
import { registerEnrollee } from "../../app/enrollees/enrolleeStore";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";

const FormValidationSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    name: yup.string().required("Username is Required"),
    telephone: yup.string().required("Telephone is Required"),
    address: yup.string().required("Address is Required"),
    nin: yup.string().required("NIN is Required"),
    vin: yup.string().required("VIN is Required"),
    numberPlate: yup.string().required("Vehicle number plate is Required"),
    model: yup.string().required("Vehicle model is Required"),
  })
  .required();

const MultiValidation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, isError, isSuccess, message, enrollee } = useSelector((state) => state.enrollees)
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    formState,
    reset,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = (data) => {
    dispatch(registerEnrollee(data))
    console.log(data);

    if (isSuccess || enrollee) {
      toast.success("Enrollee registered successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
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
  };

    
  if (isLoading) {
    <Loading />
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, isSubmitSuccessful, reset]);

    // intiating state for the image uploader
    const [selectedFiles, setSelectedFiles] = useState([]); 
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
      >
        <Textinput
          name="name"
          label="enrollee's name"
          type="text"
          register={register}
          error={errors.name}
          placeholder="Enter fullname...."
        />
        <Textinput
          name="email"
          label="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Enter email...."
        />
        <Textinput
          name="telephone"
          label="telephone"
          type="text"
          register={register}
          error={errors.telephone}
          placeholder="Enter phone number"
        />
        <Textinput
          name="address"
          label="address"
          type="text"
          register={register}
          error={errors.address}
          placeholder="Enter the address"
        />
        <Textinput
          name="nin"
          label="national identification number"
          type="text"
          register={register}
          error={errors.nin}
          placeholder="Enter the NIN"
        />
        <Textinput
          name="vin"
          label="vehicle identification number"
          type="text"
          register={register}
          error={errors.vin}
          placeholder="Enter the VIN"
        />
        <Textinput
          name="numberPlate"
          label="number plate"
          type="text"
          register={register}
          error={errors.numberPlate}
          placeholder="Enter plate number"
        />
        <Textinput
          name="model"
          label="model"
          type="text"
          register={register}
          error={errors.model}
          placeholder="Enter vehicle model"
        />
        <Fileinput 
          selectedFiles={selectedFiles}
          name="enrolleeImages"
          multiple
          preview
        />
        <div className="flex pt-6 mt-8">
          <div className="lg:col-span-2 col-span-1 col-6">
            <div className="ltr:text-right rtl:text-left">
              <button type="submit" className="btn btn-dark  text-center">Submit</button>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-1 col-6">
            <div className="ltr:text-right rtl:text-left">
              <button type="reset" className="btn btn-dark  text-center" onClick={() => reset()}>Reset</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiValidation;
