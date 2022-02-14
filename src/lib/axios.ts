import axios from "axios";

const everhourApi = axios.create({
  baseURL: "https://api.everhour.com/",
});

everhourApi.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem("invoicer::state");
  if (!apiKey) {
    return config;
  }

  config.headers = {
    ...config.headers,
    "X-Api-Key": JSON.parse(apiKey).invoiceSender.everhourApiKey,
  };

  return config;
});

export { everhourApi };
