import { Developer } from "./developer.js";
async function createDeveloperArray() {
    let resp = await fetch('https://api.siposm.hu/getDevelopers')
    let data = await resp.json()
    return data.map(i =>{
        return new Developer(
            i.id,
            i.name,
            i.email,
            i.job,
            i.age,
            i.salary,
            i.image,
            i.skills
        )
    })
}
export { createDeveloperArray }