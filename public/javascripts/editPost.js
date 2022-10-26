const form = document.querySelector("#editForm");
const titleInput = form.querySelector("#title");
const subcategoryInput = form.querySelector("#subcategory");
const contentInput = form.querySelector("#summernote");
const tagsInput = form.querySelector("#tags");
const thumbnailInput = form.querySelector("#thumbnail");
let file;

form.addEventListener("submit", handleFormSubmit);
thumbnailInput.addEventListener("change", handleFiles, false);

function handleFiles() {
  file = this.files[0];
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const id = form.dataset.id;
  const title = titleInput.value;
  const content = contentInput.value;
  const tags = tagsInput.value;
  const thumbnail = file;
  let formData;
  if (subcategoryInput.value !== "") {
    const subcategory = subcategoryInput.value;
    formData = {
      title,
      subcategory,
      content,
      tags,
      thumbnail,
    };
  } else {
    formData = {
      title,
      content,
      tags,
      thumbnail,
    };
  }
  try {
    await axios.put(`/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    location.href = `/posts/${id}`;
  } catch (error) {
    console.log(error);
  }
}
