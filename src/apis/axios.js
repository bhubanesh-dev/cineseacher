import { ODMB_KEY, ODMB_API_URL } from "constants";

import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { convertKeysToCamelCase } from "utils/convertKeysToCamelCase";

const checkForGettingErrorInResposne = response => {
  if (response.data?.response === "False") {
    Toastr.error(response.data.error);
  }
};

const showErrorToastr = error => {
  Toastr.error(
    error.message === t("error.networkError")
      ? t("error.noInternetConnection")
      : error.response?.data?.Error
  );
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      if (response.data) response.data = convertKeysToCamelCase(response.data);

      checkForGettingErrorInResposne(response); // Check: if in the resposne getting some error as per api response

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL = ODMB_API_URL;
  axios.defaults.params = { apikey: ODMB_KEY };
  setHttpHeaders();
  responseInterceptors();
}
