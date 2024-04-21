import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./Loader.scss";
import { useLoader } from "../../../Global/Context/globalContext";

const Loader = () => {
  const { isLoading } = useLoader();
  return (
    <div style={{ display: isLoading ? "block" : "none" }}>
      <ThreeDots
        visible={isLoading}
        height="120"
        width="120"
        color="#ffffff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </div>
  );
};


export default Loader;
