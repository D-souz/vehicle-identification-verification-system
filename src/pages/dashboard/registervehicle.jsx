import React, { useState } from "react";
import HomeBredCurbs from "./HomeBredCurbs";
import ExampleOne from "../table/react-tables/ExampleOne";


const VehicleRegistartion = () => {
  return (
    <div>
      <HomeBredCurbs title= "Register vehicle" />
        {/* 
      the table showing registred vehicles 
      and a form to register 
      as well as a qr code qenerator */}

      <ExampleOne />
      </div>
  );
};

export default VehicleRegistartion;
