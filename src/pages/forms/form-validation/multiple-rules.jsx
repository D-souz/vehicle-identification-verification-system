import React, { useState, useEffect} from "react";
import Textinput from "@/components/ui/Textinput";
import Card from "../../../components/ui/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Fileinput from "@/components/ui/Fileinput";
import DropZone from "../file-input/DropZone";

const FormValidationSchema = yup
  .object({
    password: yup.string().required("Password is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    username: yup.string().required("Username is Required"),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  })
  .required();

const MultiValidation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

    // intiating state for the image uploader
    const [selectedFiles, setSelectedFiles] = useState([]); 
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
      >
        <Textinput
          name="email"
          label="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Enter email...."
        />
        <Textinput
          name="username"
          label="username"
          type="text"
          register={register}
          error={errors.username}
          placeholder="Enter fullname...."
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
          name="nationalid"
          label="national identification number"
          type="text"
          register={register}
          error={errors.nationalid}
          placeholder="Enter the NIN"
        />
        <Textinput
          name="vehicleid"
          label="vehicle identification number"
          type="text"
          register={register}
          error={errors.vehicleid}
          placeholder="Enter the VIN"
        />
        <Textinput
          name="numberplate"
          label="number plate"
          type="text"
          register={register}
          error={errors.numberplate}
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
        <div className="lg:col-span-2 col-span-1">
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiValidation;
