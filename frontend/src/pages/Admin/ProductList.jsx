import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminShell from "./AdminShell";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data?.error) {
        toast.error("Product create failed. Try again.");
      } else {
        toast.success(`${data.name} is live`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message || "Image uploaded");
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminShell
      title="New product"
      subtitle="Everything a customer sees on the product page."
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* image */}
        <section>
          <h2 className="u-label">Photograph</h2>

          <div className="mt-4 flex flex-col gap-5 sm:flex-row">
            <div className="h-44 w-36 shrink-0 overflow-hidden rounded-lg border border-sand-400 bg-sand-200">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center text-[13px] text-ink-faint">
                  No image
                </div>
              )}
            </div>

            <label className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-sand-500 bg-sand-50 px-6 py-10 text-center transition-colors hover:border-clay-400 hover:bg-clay-50">
              <span className="text-[15px] font-medium text-ink">
                {uploading ? "Uploading…" : "Choose an image"}
              </span>
              <span className="mt-1.5 text-[13px] text-ink-faint">
                JPG or PNG · shown at 4:5
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>
        </section>

        {/* details */}
        <section className="border-t border-sand-400 pt-8">
          <h2 className="u-label">Details</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="field"
                placeholder="Stoneware serving bowl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="price">
                Price (USD)
              </label>
              <input
                id="price"
                type="number"
                className="field"
                placeholder="48"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="brand">
                Maker
              </label>
              <input
                id="brand"
                type="text"
                className="field"
                placeholder="Atelier Foss"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="field cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                className="field"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="stock">
                Count in stock
              </label>
              <input
                id="stock"
                type="number"
                className="field"
                placeholder="12"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              className="field resize-y"
              placeholder="How it's made, what it's for, how it wears in."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </section>

        <div className="flex items-center gap-4 border-t border-sand-400 pt-8">
          <button type="submit" className="btn-primary">
            Publish product
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/allproductslist")}
            className="btn-ghost"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminShell>
  );
};

export default ProductList;
