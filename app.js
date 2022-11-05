const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', event => {
  
   if (event.code === 'Space') {
      event.preventDefault();
      setRandomColors(columns);
   }
   
});


/* Mobile events */

document.addEventListener('touchstart', event => {
   const columnButton = event.target.closest('.column__button');
   const columnTitle = event.target.closest('.column__title');

   if (columnButton || columnTitle) return;

   if (event) setRandomColors(columns);

});

/* ------------ */

document.addEventListener('click', event => {
   const columnButton = event.target.closest('.column__button');
   const columnTitle = event.target.closest('.column__title');

   if (columnButton) {
      columnButton.firstElementChild.classList.toggle('fa-lock-open');
      columnButton.firstElementChild.classList.toggle('fa-lock');

   } else if (columnTitle) {
      copyToClickboard (event.target.textContent) 
   }
});


function setRandomColors(columns) {
   columns.forEach(column => {

      const color = chroma.random();
      const columnTitle = column.querySelector('.column__title');
      const columnButton = column.querySelector('.column__button');

      const isLocked = columnButton.firstElementChild.classList.contains('fa-lock');

      if (isLocked) return;
      columnTitle.textContent = color;
      column.style.background = color;

      setTextColor(columnTitle, color);
      setTextColor(columnButton, color);

   });
}



function setTextColor(text, color) {
   const luminance = chroma(color).luminance();

   text.style.color = luminance > 0.5 ? 'black' : 'white';
}


function copyToClickboard (text) {
   return navigator.clipboard.writeText(text);
}


setRandomColors(columns);