const deletePostForm = document.querySelector('#deletePostBtn');
const contentEle = document.querySelector('#content');

window.addEventListener('load', async () => {
  const postId = document.documentURI.split('/').at(-1);
  const post = (await axios.get(`/api/posts/${postId}`)).data;
  let converter = new showdown.Converter();
  converter.setFlavor('github');
  const content = post.content;
  const html = converter.makeHtml(content);
  contentEle.innerHTML = html;
});

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
