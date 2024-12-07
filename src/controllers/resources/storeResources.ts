import { Context } from "hono";
import { v2 as cloudinary } from "cloudinary";

const storeResources = async (c: Context) => {
  const response = await c.req.json();

  const uploadResult = await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);
};
