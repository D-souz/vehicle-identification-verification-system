import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Select from "../../../components/ui/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Fileinput from "@/components/ui/Fileinput";
// import DropZone from "../file-input/DropZone";
import { useDispatch, useSelector } from "react-redux";
import { updateEnrollee } from "../../app/enrollees/enrolleeStore";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

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
    gender: yup.string().required("Select a gender"),
    age: yup.number().required("Age is required"),
    image: yup.mixed()
  })
  .required();

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
export const EditEnrollee = () => {
  const dispatch = useDispatch();
  const { agent } = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, message, enrollee } = useSelector((state) => state.enrollees)
  const id = enrollee._id;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = (data) => {

    if (agent.userType != "admin") {
      toast.error("Not authorized to perform action", {
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
      dispatch(updateEnrollee({ id, data }))

      if (isSuccess || enrollee) {
        toast.success("Enrollee updated successfully", {
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

    }
  };

  
  if (isLoading) {
    <Loading />
  }


  useEffect(() => {

    setValue("name", enrollee.name);
    setValue("email", enrollee.email);
    setValue("telephone", enrollee.telephone);
    setValue("nin", enrollee.nin);
    setValue("address", enrollee.address);
    setValue("numberPlate", enrollee.numberPlate);
    setValue("vin", enrollee.vin); 
    setValue("model", enrollee.model);
    setValue("gender", enrollee.gender);
    setValue("age", enrollee.age);

  }, [setValue]);

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
        />
        <Textinput
          name="email"
          label="email"
          type="email"
          register={register}
          error={errors.email}
        />
        <Textinput
          name="telephone"
          label="telephone"
          type="text"
          register={register}
          error={errors.telephone}
        />
        <Textinput
          name="address"
          label="address"
          type="text"
          register={register}
          error={errors.address}
        />
        <Textinput
          name="nin"
          label="national identification number"
          type="text"
          register={register}
          error={errors.nin} 
        />
        <Textinput
          name="vin"
          label="vehicle identification number"
          type="text"
          register={register}
          error={errors.vin} 
        />
        <Textinput
          name="numberPlate"
          label="number plate"
          type="text"
          register={register}
          error={errors.numberPlate}
        />
        <Textinput
          name="model"
          label="model"
          type="text"
          register={register}
          error={errors.model}
        />
        <Select
          name="gender"
          label="gender"
          options={options}
          register={register}
          error={errors.gender}
          className="h-[48px]"
        />
        <Textinput
          name="age"
          label="age"
          type="text"
          register={register}
          error={errors.age}
        />
        <Textinput
          name="image"
          label="update profile image"
          type="file"
          register={register}
          placeholder="Choose a file or drop it here..."
        />
        <div className="flex pt-2 mt-2">
          <div className="lg:col-span-6 col-span-1 col-12">
            <div className="ltr:text-right rtl:text-left">
              <button type="submit" className="btn btn-dark text-center">Update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// export default EditEnrollee;