//where profile information will appear
const overview = document.querySelector(".overview");
const username = "brandie2";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector("repos");
const repoData = document.querySelector(".repo-data");


//async function to fetch info from profile
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(profileInfo());
    displayUserInfo(data);
};

gitUserInfo();

//fetch and display user information
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}<p>
    <p><strong>Bio:</strong> ${data.bio}<p>
    <p><strong>Location:</strong> ${data.location}<p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}<p>
    </div>
    `;
    overview.append(div);
    gitRepos();
};


//async function to fetch repos
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //console.log(fetchRepos());
    displayRepos(repoData);
};

//function to display naem of each repo
const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement('li');
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }

};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
    
});

//async function to fetch specific repo info
const getRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);

    //create array of lanaguages
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/github-repo-gallery/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        //console.log(languages);
    }
    theReposInfo(repoInfo, languages);
};

//function to display specific repo info
const theReposInfo = async function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const dive = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoDate.append(div);

    
};