import { Job } from "./job.js";

async function createJobArray() {
    let resp = await fetch('https://api.siposm.hu/job')
    let data = await resp.json()
    return data.map(i =>{
        return new Job(
            i.id,
            i.name,
            i.description
        )
    })
}
export { createJobArray }