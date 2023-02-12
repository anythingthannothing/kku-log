const deletePostForm = document.querySelector('#deletePostBtn');

async function handleDeletePost(event) {
  event.preventDefault();
  const { id } = deletePostForm.dataset;
  try {
    await axios.delete(`/api/posts/${id}`);
    location.href = '/posts';
  } catch (error) {
    console.log(error);
  }
}

deletePostForm.addEventListener('submit', handleDeletePost);
