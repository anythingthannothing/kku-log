const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteBtn");

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const comment = textarea.value;
  const postId = postContainer.dataset.id;
  if (body === "") return;
  try {
    await axios.post(`/posts/${postId}/comments`, {
      body: comment,
    });
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async (event) => {
  const parent = event.target.parentElement.parentElement;
  const postId = postContainer.dataset.id;
  const commentId = parent.dataset.commentid;
  try {
    await axios.delete(`/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    });
    parent.remove();
  } catch (error) {
    console.log(error);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
deleteBtn.forEach((el) => el.addEventListener("click", handleDelete));
