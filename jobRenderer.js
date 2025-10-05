export class JobRenderer{
    
    rendeDropDwown(jobArray){
        let s = '<li><a class="dropdown-item sort-by-job" data-param="default">Default</a></li>'
        jobArray.forEach(job => {
            s += '<li><a class="dropdown-item sort-by-job" data-param="'+job.name+'">'+job.name+'</a></li>'
        });
        return s;
    }
}