
// book Search 
const searchBook = () => {
   const serachField = document.getElementById('search-field');
   toggoleSpiner('block')

   serachField.textContent = '';
   const searchValue = serachField.value;
   searchValue.value = '';
   // Check empty or not 
   if (searchValue === '') {
      const serarchResultNotFound = document.getElementById('result-not-found');
      serarchResultNotFound.innerText = "No value Found !! Please Enter Something !"
      serarchResultNotFound.value = '';

      toggoleSpiner('none')

      // console.log("please enter something");
   }

   else {
      clear();
      const url = `https://openlibrary.org/search.json?q=${searchValue}`
      fetch(url)
         .then(response => response.json())
         .then(json => displaydata(json.docs))
   }

}
// sppiner for load data 
const toggoleSpiner = displayStyle => {
   document.getElementById('spinner').style.display = displayStyle;

}

// showing all data 
const displaydata = docs => {
   //console.log(docs[0]);
   // console.log(docs[0].author_name[0]);

   const searchResult = document.getElementById("serach-result");
   searchResult.textContent = '';
   const totalSerarchResult = docs.length;
   // total 
   const total = document.getElementById('toatl-result-count');
   total.innerHTML = `
   <h1 class='m-3'> Total Search Result :  ${totalSerarchResult} </h1> 
    `
   //  check data is valid or not 
   if (docs.length === 0) {
      clear();
      const serarchResultNotFound = document.getElementById('result-not-found');
      serarchResultNotFound.innerText = "No value Found !! Please Enter Valid Book Name  !"
      serarchResultNotFound.value = '';
      toggoleSpiner('none')

   }

   if (docs === '') {
      // const serarchResultNotFound = document.getElementById('result-not-found');
      toggoleSpiner('none')

      //  serarchResultNotFound.innerText = "No value Found !! Please Enter valid Book Name "
   }
   else {
      docs.forEach(docs => {
         // console.log(docs.title);
         const div = document.createElement('div');
         div.classList.add('col');
         let cover_image = 'images.png';
         if (docs.cover_i != undefined)
            cover_image = 'https://covers.openlibrary.org/b/id/' + docs.cover_i + '-M.jpg';

         div.innerHTML = `
         <div class="card" >
           <img src="${cover_image}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title">${docs.title}</h5>
             <p> ${docs.author_name ? docs.author_name[0] : 'No Author Name'} </p>
             <p class="card-text"> ${docs.publisher ? docs.publisher : 'No Publisher Name'}</p>
             <p> ${docs.first_publish_year ? docs.first_publish_year : ' Publish Year Not Found'} </p>
           </div>
         </div>
         `
         searchResult.appendChild(div)

      });
      toggoleSpiner('none')
   }

};


const clear = () => {
   document.getElementById("result-not-found").innerHTML = "";
}