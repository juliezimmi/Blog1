// Blog Post Functionality
const postsSection = document.getElementById('blog-posts');
const addPostBtn = document.getElementById('addPostBtn');
const postModal = document.getElementById('postModal');
const closePostModal = document.getElementById('closePostModal');
const savePostBtn = document.getElementById('savePostBtn');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');

// Image Gallery Functionality
const addImageBtn = document.getElementById('addImageBtn');
const imageModal = document.getElementById('imageModal');
const closeImageModal = document.getElementById('closeImageModal');
const addImageToGalleryBtn = document.getElementById('addImageToGalleryBtn');
const newImageInput = document.getElementById('newImageInput');
const imagesDiv = document.getElementById('images');

// Load posts and images from localStorage
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  postsSection.innerHTML = '';
  posts.forEach(post => {
    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
    postsSection.appendChild(el);
  });
}

function loadImages() {
  const images = JSON.parse(localStorage.getItem('blogImages') || '[]');
  imagesDiv.innerHTML = `<img src="image1" alt="Gallery Image" />`; // Always show the background image first
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Gallery Image';
    imagesDiv.appendChild(img);
  });
}

// Modal controls
addPostBtn.onclick = () => {
  postModal.style.display = 'block';
};

closePostModal.onclick = () => {
  postModal.style.display = 'none';
  postTitle.value = '';
  postContent.value = '';
};

savePostBtn.onclick = () => {
  const title = postTitle.value.trim();
  const content = postContent.value.trim();
  if (title && content) {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    posts.unshift({ title, content });
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    loadPosts();
    postTitle.value = '';
    postContent.value = '';
    postModal.style.display = 'none';
  }
};

// Modal controls for images
addImageBtn.onclick = () => {
  imageModal.style.display = 'block';
};
closeImageModal.onclick = () => {
  imageModal.style.display = 'none';
  newImageInput.value = '';
};

addImageToGalleryBtn.onclick = () => {
  const file = newImageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const images = JSON.parse(localStorage.getItem('blogImages') || '[]');
      images.push(e.target.result);
      localStorage.setItem('blogImages', JSON.stringify(images));
      loadImages();
    };
    reader.readAsDataURL(file);
    imageModal.style.display = 'none';
    newImageInput.value = '';
  }
};

// Close modals when clicking outside
window.onclick = function(event) {
  if (event.target === postModal) postModal.style.display = 'none';
  if (event.target === imageModal) imageModal.style.display = 'none';
}

// Initial load
window.onload = () => {
  loadPosts();
  loadImages();
};