const form = document.querySelector("#postForm");
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
  const title = titleInput.value;
  const subcategory = subcategoryInput.value;
  const content = contentInput.value;
  const tags = tagsInput.value;
  const thumbnail = file;
  const formData = {
    title,
    subcategory,
    content,
    tags,
    thumbnail,
  };
  try {
    const res = await axios.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    location.href = `/posts/${res.data}`;
  } catch (error) {
    console.log(error);
  }
}
