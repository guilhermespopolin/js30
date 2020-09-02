const panels = document.querySelectorAll(".gallery__panel");

function toggleOpen() {
  const isAlreadyOpened = this.classList.contains('gallery__panel--open');
  
  if (isAlreadyOpened) {
    this.classList.remove('gallery__panel--open');
  } else {
    const currentOpenedPanel = this.parentNode.querySelector('.gallery__panel--open');
    
    if (currentOpenedPanel) {
      currentOpenedPanel.classList.remove('gallery__panel--open');
    }

    this.classList.add('gallery__panel--open');
  }
}

function activate(event) {
  const isPanelOpen = this.classList.contains('gallery__panel--open');
  const doesPanelFinishResizing = event.propertyName === 'flex-grow';

  if (isPanelOpen && doesPanelFinishResizing) {
    this.classList.add('gallery__panel--active');
  }
}

function deactivate(event) {
  const isPanelClosed = !this.classList.contains('gallery__panel--open');
  const doesPanelStartResizing = event.propertyName === 'flex-grow';
  
  if (isPanelClosed && doesPanelStartResizing) {
    this.classList.remove('gallery__panel--active');
  }
}

panels.forEach((panel) => {
  panel.addEventListener('click', toggleOpen);
  panel.addEventListener('transitionstart', deactivate);
  panel.addEventListener('transitionend', activate);
});
