const form = document.querySelector('#postForm');
const titleInput = form.querySelector('#title');
const subcategoryInput = form.querySelector('#subcategory');
const tagsInput = form.querySelector('#tags');
const thumbnailInput = form.querySelector('#thumbnail');
let file, thumbnailUrl;

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
  const subcategory = subcategoryInput.value;
  const content = editor.getMarkdown();
  const tags = tagsInput.value;
  const formData = {
    title,
    subcategory,
    content,
    tags,
    thumbnailUrl,
  };
  console.log(content);
  try {
    const res = await axios.post('/api/posts', formData);
    location.href = `/posts/${res.data}`;
  } catch (error) {
    console.log(error);
  }
}
