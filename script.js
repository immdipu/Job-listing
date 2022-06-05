const searchResultChildContainer = document.querySelector(".search_result_child_container");
const skillContainer = document.querySelector(".skill_container");
const search = document.querySelector(".search");




const fetchdata = async () => {
    const res = await fetch("./data.json");
    const data = await res.json();
    return data;
}


const htmlelement = function (item) {
    return listingDisplay = `<div class="result">
    <img class="profile" src="${item.logo}" alt="photosnap">
    <section class="section_one">
      <p class="title">${item.company}</p>
      <h3 class="position">${item.position}</h3>
      <div class="section_child">
        <p class="details">${item.postedAt}</p>
        <p class="details">${item.contract}</p>
        <p class="details">${item.location}</p>
      </div>
    </section>
    <section class="section_two">
      <ul class="skill_container">
        <li class="skill_name jobs">${item.role}</li> 
        <li class="skill_name jobs">${item.level}</li> 
        ${lan(item.languages)}
        ${lan(item.tools)}
      </ul>
    </section>
    </div>`
}

// TO DISPLAY LISTING

let listingDisplay = " ";
const showslist = function () {
    fetchdata().then(data => {
        data.forEach(item => {
            listingDisplay += htmlelement(item);
            searchResultChildContainer.innerHTML = listingDisplay;
        })
    })
}

showslist();



// DISPLAY SEARCH ELEMENT IN THE SEARCH BAR

const displaysearch = function (e) {
    let element = e.target;
    if (element.classList.contains('jobs')) {
        searchadd(element);
    }

}


// ADD ELEMENT IN THE SEARCH BAR
let filterArray = [];
const searchadd = function (element) {
    let filterdom = "";
    if (!filterArray.includes(element.textContent)) {
        filterArray.push(element.textContent);
        listfilter();
    }

    filterArray.forEach(function (element) {
        filterdom += `<div class="search_element">
        <h6 class="search_element_header">${element}</h6><img class="cross_button" src="./images/icon-remove.svg"
          alt=""></span>
      </div>`
        search.innerHTML = filterdom;
    })
    const crossButton = document.querySelectorAll('.cross_button');
    crossButton.forEach(e => {
        e.addEventListener('click', removeElement)
    })

}






// ADD LIST OF sKILL

const lan = function (input) {
    let landiv = "";
    input.forEach(item => {
        landiv += ` <li class="skill_name jobs">${item}</li>`
    })
    return landiv;
}




// TO FILTER LIST ACCORDING TO SEARCH PARAMETER
const listfilter = function () {
    let displaylisting = "";
    fetchdata().then(data => {
        data.forEach((item => {
            if (validJobs(item)) {
                displaylisting += htmlelement(item);
                searchResultChildContainer.innerHTML = displaylisting;
            }
        }))
    })
}


const validJobs = (item) => {
    let isValid = true;
    filterArray.forEach(elem => {
        if (item.role !== elem && item.level !== elem && !item.languages.includes(elem) && !item.tools.includes(elem)) {
            isValid = false;
        }
    })
    return isValid;
}



// REMOVE THE ELEMENT FROM SEARCH BAR
const removeElement = function (e) {
    element = e.target;
    const elementToRemove = element.parentElement;
    let index = filterArray.indexOf(elementToRemove.textContent.trim())
    filterArray.splice(index, 1);
    elementToRemove.remove();
    if (filterArray.length !== 0) {
        listfilter();
    }
    else {
        listingDisplay = " ";
        showslist();
    }
}




searchResultChildContainer.addEventListener('click', displaysearch);