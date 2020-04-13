import axios from "axios";

export const addAuthKey = async () => {
  const response = await axios.post("/api/authKey");
  if (response.status === 200) return response.data.authKey;
  else throw Error("Server Error");
};
