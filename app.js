document.addEventListener('keydown', event => {

   if (event.code === 'Space') {
      event.preventDefault();

      setRandomColors();
   }

});

/* Mobile events */
document.addEventListener('touchstart', event => {
   const lockButton = event.target.closest('[data-type="lock"]');
   const addButton = event.target.closest('[data-type="add"]');
   const columnTitle = event.target.closest('.column__title');

   if (addButton || columnTitle || lockButton) return;

   if (event) setRandomColors();

});
/* ------------ */

document.addEventListener('click', event => {
   const lockButton = event.target.closest('[data-type="lock"]');
   const addButton = event.target.closest('[data-type="add"]');
   const columnTitle = event.target.closest('.column__title');

   if (lockButton) {
      lockButton.firstElementChild.classList.toggle('fa-lock-open');
      lockButton.firstElementChild.classList.toggle('fa-lock');

   } else if (addButton) {
      addNewColumn();

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


      const isLocked = columnButtons[0].firstElementChild.classList.contains('fa-lock');

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
   document.body.insertAdjacentHTML('beforeend', `
      <div class="column" style="background-color: ${color};">
      <h2 class="column__title">${color}</h2>
      <div class="column__buttons">
         <button data-type="lock" class="column__button">
            <i class="fa-solid fa-lock-open"></i>
         </button>
         <button data-type="add" class="column__button">
            <i class="fa-solid fa-plus"></i>
         </button>
      </div>
   </div>
      `);
}

setRandomColors();