import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminShell from "./AdminShell";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image updated");
    } catch (err) {
      toast.error(err?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Delete this product? This cannot be undone."
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`“${data.name}” deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <AdminShell
      title="Edit product"
      subtitle={name || "Loading product"}
      actions={
        <button
          type="button"
          onClick={handleDelete}
          className="btn btn-sm border border-rust/30 text-rust hover:bg-rust hover:text-sand-50"
        >
          Delete product
        </button>
      }
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* image */}
        <section>
          <h2 className="u-label">Photograph</h2>

          <div className="mt-4 flex flex-col gap-5 sm:flex-row">
            <div className="h-44 w-36 shrink-0 overflow-hidden rounded-lg border border-sand-400 bg-sand-200">
              {image ? (
                <img
                  src={image}
                  alt={name}
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
                {uploading ? "Uploading…" : "Replace image"}
              </span>
              <span className="mt-1.5 text-[13px] text-ink-faint">
                Leave it alone to keep the current one
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
              <label className="field-label" htmlFor="u-name">
                Name
              </label>
              <input
                id="u-name"
                type="text"
                className="field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="u-price">
                Price (USD)
              </label>
              <input
                id="u-price"
                type="number"
                className="field"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="u-brand">
                Maker
              </label>
              <input
                id="u-brand"
                type="text"
                className="field"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="u-category">
                Category
              </label>
              <select
                id="u-category"
                className="field cursor-pointer"
                value={category || ""}
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
              <label className="field-label" htmlFor="u-quantity">
                Quantity
              </label>
              <input
                id="u-quantity"
                type="number"
                min="1"
                className="field"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="u-stock">
                Count in stock
              </label>
              <input
                id="u-stock"
                type="number"
                className="field"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label" htmlFor="u-description">
              Description
            </label>
            <textarea
              id="u-description"
              rows="5"
              className="field resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </section>

        <div className="flex items-center gap-4 border-t border-sand-400 pt-8">
          <button type="submit" className="btn-primary">
            Save changes
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

export default AdminProductUpdate;
