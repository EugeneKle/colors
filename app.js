let isModal = true;

document.addEventListener('keydown', event => {

   if (event.code === 'Space') {
      event.preventDefault();

      document.querySelector('.hint-modal').classList.add('hint-modal_hidden');

      setRandomColors();
   }

});

/* Mobile events */
document.addEventListener('touchstart', event => {
   const lockButton = event.target.closest('[data-type="lock"]');
   const addButton = event.target.closest('[data-type="add"]');
   const removeButton = event.target.closest('[data-type="remove"]');
   const moveButton = event.target.closest('[data-type="move"]');
   const columnTitle = event.target.closest('.column__title');
   const hint = event.target.closest('.hint-modal__button');




   if (hint) {
      document.querySelector('.hint-modal').classList.add('hint-modal_hiden');
      isModal = false;
   }

   
   if (addButton || columnTitle || lockButton || removeButton || moveButton || isModal) return;

   if (event) setRandomColors();

});
/* ------------ */

document.addEventListener('click', event => {
   const lockButton = event.target.closest('[data-type="lock"]');
   const addButton = event.target.closest('[data-type="add"]');
   const removeButton = event.target.closest('[data-type="remove"]');
   const columnTitle = event.target.closest('.column__title');
   const hint = event.target.closest('.hint-modal__button');



   if (lockButton) {
      lockButton.firstElementChild.classList.toggle('fa-lock-open');
      lockButton.firstElementChild.classList.toggle('fa-lock');

   } else if (addButton) {
      addNewColumn();

   } else if (hint) {

      document.querySelector('.hint-modal').classList.add('hint-modal_hidden');

   } else if (removeButton) {
      const column = removeButton.closest('.column');      
      removeColumn(column);

      const columns = document.querySelectorAll('.column');
   
      if (columns.length === 0) return;

   } else if (columnTitle) {
      copyToClickboard(event.target.textContent)
   }
});


function setRandomColors() {

   let columns = document.querySelectorAll('.column');

   columns.forEach(column => {

      const color = chroma.random();
      const columnTitle = column.querySelector('.column__title');
      const columnButtons = column.querySelectorAll('.column__button');

      const isLocked = columnButtons[1].firstElementChild.classList.contains('fa-lock');

      if (isLocked) return;
      columnTitle.textContent = color;
      column.style.background = color;

      setTextColor(columnTitle, color);
      columnButtons.forEach(button => setTextColor(button, color));

   });
}



function setTextColor(text, color) {
   const luminance = chroma(color).luminance();

   text.style.color = luminance > 0.5 ? 'black' : 'white';
}


function copyToClickboard(text) {
   return navigator.clipboard.writeText(text);
}


function addNewColumn() {
   const color = chroma.random();
   const luminance = chroma(color).luminance();

   const textColor = luminance > 0.5 ? 'black' : 'white';

   document.body.insertAdjacentHTML('beforeend', `
   <div class="column" style="background-color: ${color};">
      <h2 class="column__title" style="color:${textColor};">${color}</h2>
      <div class="column__buttons">
         <button data-type="move" class="column__button handle" style="color:${textColor};">
            <i class="fa-solid fa-maximize"></i>
         </button>
         <button data-type="lock" class="column__button" style="color:${textColor};">
            <i class="fa-solid fa-lock-open"></i>
         </button>
         <button data-type="add" class="column__button" style="color:${textColor};">
            <i class="fa-solid fa-plus"></i>
         </button>
         <button data-type="remove" class="column__button" style="color:${textColor};">
            <i class="fa-solid fa-minus"></i>
         </button>
      </div>
   </div>
      `);
}


function removeColumn(column) {
   column.remove();
}

/* Draggable  */
const draggabelArea = document.querySelector('body');

new Sortable(draggabelArea, {
   handle: '.handle', // handle's class
   animation: 200
});
/* -------------- */
setRandomColors();