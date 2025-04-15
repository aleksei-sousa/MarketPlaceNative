import * as SecureStore from "expo-secure-store";
import api from "./api";

const productService = {
  addProduct: async (AddProductsParams) => {
    const token = await SecureStore.getItemAsync("onebitshop-token");

    const { name, price, description, category, addressId, images, published } =
      params;

    let formdata = new FormData();

    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("addressId", addressId);
    formdata.append("published", published);
    images.map((image) => {
      formdata.append("images", {
        // @ts-ignore
        name: image.filename,
        uri: image.uri,
        type: image.type,
      });
    });

    const res = await api.post("/products", formdata, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },
  
  getAllProducts: async (number) => {
    const res = await api.get(`/products?page=${page}`);

    return res.data;
  },
  updateProduct: async (UpdateParams) => {
    const token = await SecureStore.getItemAsync("onebitshop-token");

    const res = await api.put(`/products/${params._id}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },
  deleteProduct: async (DeleteParams) => {
    const token = await SecureStore.getItemAsync("onebitshop-token");

    const { _id } = params;

    const res = await api.delete(`/products/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },
};

export default productService;