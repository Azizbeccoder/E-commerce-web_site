import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminShell from "./AdminShell";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} created`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <AdminShell
      title="Categories"
      subtitle="How pieces get grouped in the shop filters."
    >
      <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-14">
        <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
          <h2 className="text-[17px] font-semibold">Add a category</h2>
          <div className="mt-5">
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
            />
          </div>
        </div>

        <div>
          <h2 className="text-[17px] font-semibold">
            Existing
            {categories?.length ? (
              <span className="ml-2 text-[14px] font-normal text-ink-faint tnum">
                {categories.length}
              </span>
            ) : null}
          </h2>

          {!categories?.length ? (
            <div className="mt-5 rounded-lg border border-dashed border-sand-500 py-16 text-center">
              <p className="text-[15px] text-ink-soft">
                No categories yet — add one on the left.
              </p>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                  className="rounded-full border border-sand-400 bg-sand-50 px-5 py-2.5 text-[15px] text-ink-soft transition-all hover:border-clay-400 hover:bg-clay-50 hover:text-clay-600"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          <p className="mt-6 text-[13px] text-ink-faint">
            Click a category to rename or remove it.
          </p>
        </div>
      </div>

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        title={`Edit “${selectedCategory?.name || ""}”`}
      >
        <CategoryForm
          value={updatingName}
          setValue={(value) => setUpdatingName(value)}
          handleSubmit={handleUpdateCategory}
          buttonText="Save changes"
          handleDelete={handleDeleteCategory}
        />
      </Modal>
    </AdminShell>
  );
};

export default CategoryList;
