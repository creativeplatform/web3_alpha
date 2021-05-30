import axios from "axios";
require('dotenv').config()

const apiKey = process.env.API_KEY;

const apiInstance = axios.create({
  baseURL: "https://livepeer.com/api/",
  timeout: 10000,
});

export const getStreams = (): Promise<any> => {
  return apiInstance.get("/stream?streamsonly=1", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
  });
};

export const getStreamStatus = (streamId): Promise<any> => {
  return apiInstance.get(`/stream/${streamId}`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
  });
};
