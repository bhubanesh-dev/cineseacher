import axios from "axios";

const show = params => axios.get(``, { params });

const fetch = params => axios.get("", { params });

const movieApi = { show, fetch };

export default movieApi;
