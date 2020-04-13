import axios from "axios";
import { addAuthKey } from "./auth";

const updateAuthKey = async () => {
  const authKey = await addAuthKey();
  window.localStorage.setItem("authKey", authKey);
  return authKey;
};

export const getWishlist = async authKey => {
  const response = await axios(`/api/wishlist?authKey=${authKey}`);
  if (response.status === 200) {
    if (!response.data.wishlist) {
      const newAuthKey = await updateAuthKey();
      await getWishlist(newAuthKey);
    } else {
      return response.data.wishlist;
    }
  }
  else throw Error("Server Error");
};

export const addMovieToWishlist = async (authKey, movieId) => {
  const response = await axios.put(
    `/api/wishlist/${movieId}?authKey=${authKey}`
  );
  if (response.status === 200) return true;
  if (response.status === 401) {
    const newAuthKey = await updateAuthKey();
    await addMovieToWishlist(newAuthKey, movieId);
  } else throw Error("Server Error");
};

export const deleteMovieFromWishlist = async (authKey, movieId) => {
  const response = await axios.delete(
    `/api/wishlist/${movieId}?authKey=${authKey}`
  );
  if (response.status === 200) return true;
  if (response.status === 401) {
    const newAuthKey = await updateAuthKey();
    await deleteMovieFromWishlist(newAuthKey, movieId);
  } else throw Error("Server Error");
};
