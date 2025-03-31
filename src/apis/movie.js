import axios from "axios";

import { BASE_URL } from "./constants";

const show = params => axios.get(BASE_URL, { params });

const fetch = params => axios.get(BASE_URL, { params });

const movieApi = { show, fetch };

export default movieApi;
