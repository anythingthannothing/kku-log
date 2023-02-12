const Editor = toastui.Editor;
const editor = new Editor({
  el: document.querySelector('#editor'),
  previewStyle: 'vertical',
  height: '500px',
  initialEditType: 'markdown',
  initialValue: '',
});
