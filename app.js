import { Developer } from "./developer.js";
import { createDeveloperArray } from "./arrayCreator.js";
import { Renderer } from "./renderer.js";
import { Job } from "./job.js";
import { createJobArray } from "./jobArrayCreator.js";
import { JobRenderer } from "./jobRenderer.js";

if (localStorage.getItem("loggedInUser") == null){
    window.location.href = "index.html";
}
let main = document.querySelector('.developers');
let developers = await createDeveloperArray();
let renderer = new Renderer();
render();

let dropdown = document.querySelector('.dropdown-menu');
let jobs = await createJobArray();
let jobRenderer = new JobRenderer();
renderJobs();
let sortbyValue = "default";

let developerToUpdate = null;
let nameField = document.getElementById('input-name');
let emailField = document.getElementById('input-email');
let jobField = document.getElementById('input-job');
let ageField = document.getElementById('input-age');
let salaryField = document.getElementById('input-salary');
let skillsField = document.getElementById('input-skills');

document.querySelector("#add-new-developer-btn").addEventListener('click', addNewDeveloper)
document.querySelector("#update-developer-btn").addEventListener('click', updateDeveloper)
const textarea = document.getElementById('inputTextArea');
const ID = crypto.randomUUID()
const jsonData ={
	"name": "BB-John Doe",
	"email": "john@doe.com",
	"job": "Fullstack Developer",
	"age": 40,
	"salary": 650000,
	"image": "https://randomuser.me/api/portraits/men/1.jpg",
	"skills": [
		"Angular",
		"Node.js",
		"MongoDB"
	]
};
textarea.value = JSON.stringify(jsonData, null, 4);
textarea.style.height = 'auto';
textarea.style.height = textarea.scrollHeight + 'px';

//SORT BY JOBS
document.querySelectorAll('.sort-by-job').forEach(x => {
    x.addEventListener('click', filterByJob)
});

async function filterByJob(e){
    sortbyValue = e.target.dataset.param;
    console.log(sortbyValue)
    developers = await createDeveloperArray();
    if (sortbyValue !== "default")
    {
        developers = developers.filter(x => x.job == sortbyValue)
    }
    render();
}

//UPDATE
function fillInputFields(e){
    let idToUpdate = e.target.dataset.devId;
    developerToUpdate = developers.find(x => x.id === idToUpdate);

    nameField.value = developerToUpdate.name;
    emailField.value = developerToUpdate.email;
    jobField.value = developerToUpdate.job;
    ageField.value = developerToUpdate.age;
    salaryField.value = developerToUpdate.salary;
    skillsField.value = developerToUpdate.skills;
}
function updateDeveloper(){
    if (developerToUpdate != null)
    {
        developerToUpdate.name = nameField.value;
        developerToUpdate.email = emailField.value;
        developerToUpdate.job = jobField.value;
        developerToUpdate.age = ageField.value;
        developerToUpdate.salary = salaryField.value;
        developerToUpdate.skills = skillsField.value.split(",");
        console.log(JSON.stringify(developerToUpdate));
        fetch("https://api.siposm.hu/updateDeveloper", {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(developerToUpdate)
        })
        .then((response) => response.json)
        .then((data) => {
            console.log("Success: ", data)
            nameField.value ="";
            emailField.value ="";
            jobField.value ="";
            ageField.value ="";
            salaryField.value ="";
            skillsField.value ="";
            render();
        })
    }
}

//DELETE
function deleteDeveloper(e){
    let idToDelete = e.target.dataset.devId;
    let jsonIdToDelete = {"id":idToDelete};
    fetch("https://api.siposm.hu/deleteDeveloper",{
        method:"DELETE",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(jsonIdToDelete)
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log("Success: ",data);

        let index = developers.findIndex(x => x.id === idToDelete);
        developers.splice(index,1);
        render();
    })
    .catch((error)=>{
        console.error("Error: ",error)
    })
}
//CREATE
function addNewDeveloper(){
    let parsedJson = JSON.parse(textarea.value)
    let dev = new Developer(
        parsedJson.id,
        parsedJson.name,
        parsedJson.email,
        parsedJson.job,
        parsedJson.age,
        parsedJson.salary,
        parsedJson.image,
        parsedJson.skills
    )
    console.log(dev)
    fetch("https://api.siposm.hu/createDeveloper",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(dev),
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log("Success:",data);
        if (sortbyValue === "default" || sortbyValue === dev.job)
            developers.push(dev);
        console.log("DEVELOPERS: ", developers);
        render();
    })
    .catch((error) => {
        console.log("Error: ",error);
    })
}


textarea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});
function render () {
    main.innerHTML = renderer.renderCard(developers);

    document.querySelectorAll('.delete-dev-btn').forEach(x => {
        x.addEventListener('click', deleteDeveloper)
    });
    document.querySelectorAll('.update-dev-btn').forEach(x => {
        x.addEventListener('click', fillInputFields)
    });
}
function renderJobs(){
    dropdown.innerHTML = jobRenderer.rendeDropDwown(jobs);
}