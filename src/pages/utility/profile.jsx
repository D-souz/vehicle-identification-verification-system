import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import BasicArea from "../chart/appex-chart/BasicArea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateAgent } from "../app/agents/agentsStore";

// import images
import ProfileImage from "@/assets/images/users/user-1.jpg";

const FormValidationSchema = yup
  .object({
    image: yup.mixed()
  })
  .required();

const profile = () => {
  const { agent, isActive } = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const dispatch = useDispatch();
  const id = agent._id;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

const onSubmit = (data) => {
  console.log(data)
  dispatch(updateAgent({ id, data }))
}
  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src={'http://localhost:3000/uploads/'+agent.profileImage}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div
                    className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                  >
                  <Modal
                      title="Upload profile image"
                      label={<Icon icon="heroicons:pencil-square" />}
                      uncontrol
                    >
                      <h4 className="font-medium text-lg mb-3 text-slate-900">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <Textinput
                          name="image"
                          label="update profile image"
                          type="file"
                          register={register}
                          onChange={handleFileChange}
                        />
                        <div className="text-base text-slate-600 dark:text-slate-300 mt-4">
                          <h5>Preview</h5>
                          <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                          {
                            previewImage ? 
                            (
                              <img
                                src={previewImage}
                                alt=""
                                className="w-full h-full object-cover rounded-full"
                              />
                            )
                            :
                            (
                              <img
                                src={ProfileImage}
                                alt=""
                                className="w-full h-full object-cover rounded-full"
                              />
                            )
                          }
                          </div>
                        </div>
                        <div className="ltr:text-right rtl:text-left">
                          <button type="submit" className="btn btn-dark text-center">Accept</button>
                        </div>
                        </form>
                      </h4>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  {agent.name}
                </div>
                <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                {
                  isActive 
                  ?
                  <div className="text-sm font-bold text-success-500">
                    Active
                  </div>
                  :
                  <div className="text-sm font-bold text-danger-500">
                    Inactive
                  </div>
                }
                </div>
              </div>
            </div>
          </div>

          <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {agent.role}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Role
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
              {agent.downloadsCount}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Qr codes Downloaded
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
              {agent.scansCount}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Scans
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
              {agent.generationsCount}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Generations
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Info">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:envelope" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      EMAIL
                    </div>
                    <a
                      href="#"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                     {agent.email}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      PHONE
                    </div>
                    <a
                      href="#"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {agent.telephone}
                    </a>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Gender
                    </div>
                    <a
                      href="tel:0189749676767"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {agent.gender}
                    </a>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <Card title="User Overview">
              <BasicArea height={190} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
