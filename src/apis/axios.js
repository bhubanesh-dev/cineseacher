import { ODMB_KEY, ODMB_API_URL, AUTO_HIDE_TOAST_DURATION } from "constants";

import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { convertKeysToCamelCase } from "utils/convertKeysToCamelCase";

const checkForGettingErrorInResponse = response => {
  if (response.data?.response === "False") {
    Toastr.error(response.data.error, { autoClose: AUTO_HIDE_TOAST_DURATION });
  }
};

const showErrorToastr = error => {
  Toastr.error(
    error.message === t("error.networkError")
      ? t("error.noInternetConnection")
      : error.response?.data?.Error,
    { autoClose: AUTO_HIDE_TOAST_DURATION }
  );
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      if (response.data) response.data = convertKeysToCamelCase(response.data);

      checkForGettingErrorInResponse(response); // Check: if in the response getting some error as per api response

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

export default function initializeAxios() {
  axios.defaults.baseURL = ODMB_API_URL;
  axios.defaults.params = { apikey: ODMB_KEY };
  responseInterceptors();
}
