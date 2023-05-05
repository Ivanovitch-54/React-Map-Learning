import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const axiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  const axios = useProvideAxios();
  return (
    <axiosContext.Provider value={axios}>{children}</axiosContext.Provider>
  );
};

export const useAxios = () => {
  return useContext(axiosContext);
};

function useProvideAxios() {
  const basePath = `https://api-adresse.data.gouv.fr/search/?q=`;

  const getAdresse = (name, { long = 0, lat = 0 }) => {
    let path = `${basePath}${name}&lat=${lat}&lon=${long}`;

    return axios.get(path);
  };

  return {
    getAdresse,
  };
}
