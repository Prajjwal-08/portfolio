
  const draggableDiv = document.getElementById('draggable-div');

  draggableDiv.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', null); // For Firefox
    event.dataTransfer.setDragImage(event.target, 0, 0); // Optional: Sets a custom drag image
  });

  document.addEventListener('dragover', (event) => {
    event.preventDefault(); // Necessary to allow dropping
  });

  document.addEventListener('drop', (event) => {
    event.preventDefault();
    
    // Get the mouse position on drop
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Set the new position of the draggable element
    draggableDiv.style.position = 'absolute';
    draggableDiv.style.left = `${mouseX - draggableDiv.offsetWidth / 2}px`;
    draggableDiv.style.top = `${mouseY - draggableDiv.offsetHeight / 2}px`;

  });