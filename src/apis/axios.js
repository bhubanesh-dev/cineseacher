import { ODMB_KEY } from "constants";

import { serializeKeysToSnakeCase } from "@bigbinary/neeto-cist";
import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { evolve } from "ramda";
import { convertKeysToCamelCase } from "utils/convertKeysToCamelCase";

const showSuccessToastr = response => {
  if (response.data?.response === "False") {
    Toastr.error(response.data.error);
  }
};

const showErrorToastr = error => {
  Toastr.error(
    error.message === t("error.networkError")
      ? t("error.noInternetConnection")
      : error.response?.data?.Error || t("error.somethingWentWrong")
  );
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      if (response.data) response.data = convertKeysToCamelCase(response.data);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL = "https://www.omdbapi.com/";
  axios.defaults.params = { apikey: ODMB_KEY };
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
