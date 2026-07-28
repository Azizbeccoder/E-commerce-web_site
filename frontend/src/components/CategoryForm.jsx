const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Add category",
  handleDelete,
}) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="field-label" htmlFor="category-name">
        Category name
      </label>
      <input
        id="category-name"
        type="text"
        className="field"
        placeholder="e.g. Tableware"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>

    <div className="flex items-center gap-3">
      <button type="submit" className="btn-primary btn-sm">
        {buttonText}
      </button>

      {handleDelete && (
        <button
          type="button"
          onClick={handleDelete}
          className="btn btn-sm border border-rust/30 text-rust hover:bg-rust hover:text-sand-50"
        >
          Delete
        </button>
      )}
    </div>
  </form>
);

export default CategoryForm;
