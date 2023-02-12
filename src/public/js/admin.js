const categoryForm = document.querySelector('#categoryForm');
const categoryDeleteForm = document.querySelectorAll('#categoryDeleteForm');
const subcategoryForm = document.querySelector('#subcategoryForm');
const subcategoryDeleteForm = document.querySelectorAll(
  '#subcategoryDeleteForm',
);

const handleCategoryFormSubmit = async (event) => {
  event.preventDefault();
  const category = document.querySelector('#category').value;
  if (category === '') return;
  try {
    await axios.post('/api/admin/categories', {
      category,
    });
    location.reload();
  } catch (error) {
    console.log(err);
  }
};

const handleCategoryDeleteFormSubmit = async (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  try {
    await axios.delete(`/api/admin/categories/${id}`);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const handleSubategoryFormSubmit = async (event) => {
  event.preventDefault();
  const categoryId = document.querySelector('#categorySelect').value;
  const subcategory = document.querySelector('#subcategory').value;
  console.log(categoryId);
  if (!categoryId) return;
  try {
    await axios.post('/api/admin/subcategories', {
      categoryId,
      subcategory,
    });
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const handleSubcategoryDeleteFormSubmit = async (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  try {
    await axios.delete(`/api/admin/subcategories/${id}`);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

categoryForm.addEventListener('submit', handleCategoryFormSubmit);
categoryDeleteForm.forEach((form) =>
  form.addEventListener('submit', handleCategoryDeleteFormSubmit),
);
subcategoryForm.addEventListener('submit', handleSubategoryFormSubmit);
subcategoryDeleteForm.forEach((form) =>
  form.addEventListener('submit', handleSubcategoryDeleteFormSubmit),
);
