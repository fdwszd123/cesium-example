import axios from "axios";

export const $get = async (url) => {
  const res = await axios.get(url);
  return res.data;
};
