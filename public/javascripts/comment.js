const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteBtn");

const handleSubmit = (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const comment = textarea.value;
  const postId = postContainer.dataset.id;
  if (body === "") return;
  axios
    .post(`/posts/${postId}/comments`, {
      body: comment,
    })
    .then((response) => {
      if (response.status === 201) {
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleDelete = async (event) => {
  const parent = event.target.parentElement.parentElement;
  const postId = postContainer.dataset.id;
  const commentId = parent.dataset.commentid;
  axios
    .delete(`/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    })
    .then((response) => {
      if ((response.status = 201)) {
        parent.remove();
      }
    });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
deleteBtn.forEach((el) => el.addEventListener("click", handleDelete));
