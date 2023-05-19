

const search = document.querySelector('.search');
const searchInput = search.querySelector('.search_input');
const searchWrapper = search.querySelector('.search_wrapper');
const repositoriesWrapper = document.querySelector('.repositories_wrapper');




function createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if(elementClass) {
        element.classList.add(elementClass);
    }
    return element;
}
    
function createRepository(repositoryData) {

    const searchResult = createElement('li', 'search_result');
    searchResult.textContent = repositoryData.name;
    searchWrapper.append(searchResult);
    
    searchResult.addEventListener('click', () => {

        Array.from(searchWrapper.querySelectorAll('.search_result')).forEach(function(item) {
             return item.remove();
        })
        searchInput.value = '';

        const repositoryElement = createElement('li', 'repository');
        repositoryElement.textContent = `Name: ${repositoryData.name} \nOwner: ${repositoryData.owner.login} \nStars: ${repositoryData.stargazers_count}`;
        const buttonDel = createElement('button', 'btn-delete');
        repositoryElement.append(buttonDel);

        repositoriesWrapper.append(repositoryElement);

        buttonDel.addEventListener('click', function removeRepository() {
            repositoryElement.remove();
            buttonDel.removeEventListener('click', removeRepository);
         })

     })
}


searchRepositories = debounce(searchRepositories, 500);
searchInput.addEventListener('keyup', searchRepositories);      


async function searchRepositories() {
       
    if(searchInput.value.trim()) {
        return await fetch(`https://api.github.com/search/repositories?q=${searchInput.value}&per_page=5`).then(result => {
            if(result.ok) {
                result.json().then(result => {
                    clearRepositories();

                    result.items.forEach((repository) => 
                        createRepository(repository));
                });
            }
        }).catch(error => console.log(error))
    } else {
        clearRepositories();
    }
};


function clearRepositories() {
    return searchWrapper.textContent = '';
};
       
function debounce (fn, debounceTime){
    let timer; 
  
    return function(...rest) { 
  
        clearTimeout(timer); 
        timer = setTimeout (() => { 
        fn.apply(this, rest) 
        }, debounceTime);
  
    }
};





  
