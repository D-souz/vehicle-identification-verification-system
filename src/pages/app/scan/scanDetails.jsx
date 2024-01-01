import React from 'react';
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import responsiveImage4 from "@/assets/images/all-img/thumb-4.png";
import { useDispatch, useSelector } from 'react-redux';
import { grantAccessIn, denyAcess, grantAccessOut} from '../reports/reportStore';
import { useNavigate } from 'react-router-dom';

const ScanDetails = () => {
  const dispatch = useDispatch();
  const { scanResult } = useSelector((state) => state.qrCodeScanner);
  const { enrollee, isSuccess } = useSelector((state) => state.enrollees); 
  const scanData = JSON.parse(scanResult);
  const id = enrollee._id;
  const navigate = useNavigate();

  
  // grantting access in
  const handleAccessIn = () =>{
    dispatch(grantAccessIn({id}))

      toast.success("Access in grantted!", {
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
        navigate("/enrollees");
      }, 1500);
  }

  // denying access
const handleDenyAccess = () =>{
  dispatch(denyAcess({id}))

      toast.error("Access denied!", {
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
        navigate("/enrollees");
      }, 1500);
}
  // grantting access out
   const handleAccessOut = () =>{
    dispatch(grantAccessOut({id}))

      toast.success("Access out grantted!", {
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
        navigate("/enrollees");
      }, 1500);

  }
  return (
    <div>
      <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative text-center">
        <img
          src={responsiveImage4}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className='row'>
        {/* card1 */}
        <div className='col-6'>
          <div className="fw-bold pb-2 text-center">Personal Details</div>
          <Card bodyClass="p-2">
          {/* <div className="p-4"> */}
            <div className="text-sm">
            <table>
                <tbody>
                <tr>
                    <td>Name: </td>
                    <td className="p-2">{scanData.name}</td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td className="p-2">{scanData.email}</td>
                </tr>
                <tr>
                    <td>Contact: </td>
                    <td className="p-2">{scanData.telephone}</td>
                </tr>
                <tr>
                    <td>Address: </td>
                    <td className="p-2">{scanData.address}</td>
                </tr>
                <tr>
                    <td>NIN: </td>
                    <td className="p-2">{scanData.nin}</td>
                </tr>
                <tr>
                    <td>Gender: </td>
                    <td className="p-2">{scanData.gender}</td>
                </tr>
                </tbody>
            </table>
            </div>
          {/* </div> */}
          </Card>
        </div>
        {/* card2 */}
        <div className='col-6'>
          <div className="fw-bold pt-4 text-center">Vehicle Details</div>
          <Card bodyClass="p-2">
            <div className="text-sm">
              <table>
                  <tbody>
                      <tr>
                          <td>VIN: </td>
                          <td className="p-2">{scanData.vin}</td>
                      </tr>
                      <tr>
                          <td>Model: </td>
                          <td className="p-2">{scanData.model}</td>
                      </tr>
                      <tr>
                          <td>Lisence Number: </td>
                          <td className="p-2">{scanData.numberPlate}</td>
                      </tr>
                  </tbody>
                </table>
            </div>
          </Card>
        </div>
      </div>
      <div className='p-4'>
        <Button 
          text="Grant Access in"
          className="btn-outline-secondary p-2 mr-4 text-success-500 w-40"
          onClick={handleAccessIn}
        />
        <Button 
          text="Deny Access"
          className="btn-outline-secondary p-2 mr-4 text-danger-500 w-40"
          onClick={handleDenyAccess}
        />
        <Button 
          text="Grant Access out"
          className="btn-outline-secondary p-2 text-primary-500 w-40"
          onClick={handleAccessOut}
        />
      </div>
    </div>
  )
}

export default ScanDetails;