import React from "react";
import { Oval } from "react-loader-spinner";

export const AppLoader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#2196f3"
      wrapperClass="app__loader"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#BBDEFB"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
