/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// const { number } = require("prop-types");



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/**
 * Builds a student from the given list 
 * Pass iterator from page or search scope
 */
function studentBuilder(list, i) {
   let pageHTML = '';
   pageHTML += 
      `<li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src="${list[i].picture.large}">
      <h3>${list[i].name.first} ${list[i].name.last}</h3>
      <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">Joined ${list[i].registered.date}</span>
      </div>
      </li>`
   return pageHTML;
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   let start = (page * 9) - 9;
   let end = start + 9;

   const ul = document.querySelector('.student-list');
   let pageHTML = '';
   ul.innerHTML = '';

   for(let i = start; i < end; i++) {
      if(list[i]) {
         pageHTML += studentBuilder(list, i);
      }
   }
   ul.insertAdjacentHTML('beforeend', pageHTML);
}

// Create the `addPagination` function
// This function will create and insert/append the elements needed for the pagination buttons

function addButtons(list) {
   let numberOfButtons = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   let buttonHTML = '';
   for(let i = 0; i < numberOfButtons; i++) {
      buttonHTML +=
      `<li>
         <button type="button">${i + 1}</button>
      </li>`
   }
   
   linkList.insertAdjacentHTML('beforeend', buttonHTML);
}

function addPagination(list) {
   // Display the correct number of buttons
   const linkList = document.querySelector('.link-list');

   addButtons(list);
   
   // linkList.insertAdjacentHTML('beforeend', buttonHTML);

   linkList.firstElementChild.firstElementChild.className = 'active';
   linkList.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON') {
         let listItems = linkList.getElementsByTagName('li');
         for(let i = 0; i < listItems.length; i++) {
            listItems[i].firstElementChild.className = '';
         }
         e.target.className = 'active';
         showPage(data, e.target.textContent);
      }
   })
}


// Create the `addSearch` function
// This function will create and append a search bar that will filter students based on first name

function addSearch(list) {
   const header = document.querySelector('.header');
   let input = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
   header.insertAdjacentHTML('beforeend', input);
   // const studentSearch = document.querySelector('.student-search');
   document.addEventListener('keyup', (e) => { 
      const ul = document.querySelector('.student-list');
      const input = document.getElementById('search').value;
      const linkList = document.querySelector('.link-list');
      let pageHTML = '';
      let filteredList = [];
      ul.innerHTML = '';
      for(let i = 0; i < list.length; i++) {
         console.log(list[i].name);
         if(list[i].name.first.toLowerCase().includes(input.toLowerCase())) {
            filteredList.push(list[i]);
            pageHTML += studentBuilder(list, i);
         }
      }
      linkList.innerHTML = '';
      showPage(filteredList, 1);
      addButtons(filteredList);
      if(pageHTML == '') {
         // alert('No Search Matches');
         linkList.innerHTML = '<span>No Search Matches</span>';
      }
   })
   
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearch(data);

