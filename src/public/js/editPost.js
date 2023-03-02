const form = document.querySelector('#editForm');
const titleInput = form.querySelector('#title');
const subcategoryInput = form.querySelector('#subcategory');
const tagsInput = form.querySelector('#tags');
const thumbnailInput = form.querySelector('#thumbnail');
let postId, file, thumbnailUrl;

window.addEventListener('load', async () => {
  postId = document.documentURI.split('/').at(-2);
  const post = (await axios.get(`/api/posts/${postId}`)).data;
  const content = post.content;
  thumbnailUrl = post.thumbnailUrl;
  console.log(thumbnailUrl);
  editor.setMarkdown(content);
});

form.addEventListener('submit', handleFormSubmit);
thumbnailInput.addEventListener('change', handleFiles);

async function handleFiles() {
  const { data: presignedUrl } = await axios.get('/api/upload');
  file = this.files[0];
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    thumbnailUrl = presignedUrl.split('?')[0];
  } catch (err) {
    alert('S3 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const title = titleInput.value;
  console.log(title);
  const subcategoryId = subcategoryInput.value;
  const content = editor.getMarkdown();
  const tags = tagsInput.value;
  const thumbnail = file;
  const formData = {
    title,
    subcategoryId,
    content,
    tags,
    thumbnailUrl,
  };
  try {
    await axios.put(`/api/posts/${postId}`, formData);
    location.href = `/posts/${postId}`;
  } catch (error) {
    console.log(error);
  }
}
