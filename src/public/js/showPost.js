const deletePostForm = document.querySelector('#deletePostBtn');
const contentEle = document.querySelector('#content');
const Viwer = toastui.Editor;
const { codeSyntaxHighlight } = Viwer.plugin;

window.addEventListener('load', async () => {
  const postId = document.documentURI.split('/').at(-1);
  const post = (await axios.get(`/api/posts/${postId}`)).data;
  const viwer = new Viwer({
    el: document.querySelector('#viwer'),
    height: 'auto',
    initialValue: post.content,
    // plugins: [codeSyntaxHighlight],
  });
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
