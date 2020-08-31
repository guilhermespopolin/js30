const panels = document.querySelectorAll(".gallery__panel");

function toggleOpen() {
  this.classList.toggle("gallery__panel--open");
}

function toggleActive() {
  this.classList.toggle("gallery__panel--active");
}

panels.forEach((imageGallery) => {
  imageGallery.addEventListener("click", toggleOpen);
});
