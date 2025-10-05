export class Renderer{

    renderCard(developerArray){
        let s = ''
        developerArray.forEach(dev => {
            s += '<div class="col-md-4 mb-4">'
            s += '<div class="card h-100" '+this.borderIfOlderThen(dev.age)+'>'
            s += '<img src="'+dev.image +'" class="card-img-top" style="opacity:'+this.fadeIfOlderThen(dev.age)+'">'
            s += '<div class="card-body">'
            s += '<h5 class="card-title">'+dev.name+'</h5>'
            s += '<p class="card-text">Email: '+dev.email+'</p>'
            s += '<p class="card-text">Job: '+dev.job+'</p>'
            s += '<p class="card-text">Age: '+dev.age+'</p>'
            s += '<p class="card-text">Salary: '+dev.salary+'</p>'
            s += '<button data-dev-id="'+dev.id+'" type="button" class="btn btn-outline-danger delete-dev-btn">Delete</button>'
            s += '<button data-dev-id="'+dev.id+'" type="button" class="btn btn-outline-primary update-dev-btn">Update</button>'
            s += '</div>'
            s += '</div>'
            s += '</div>'
        })
        return s
    }

    fadeIfOlderThen(age){
        if (age >=45)
            return 0.3
        else
            return 1
    }
    borderIfOlderThen(age){
        if (age >=45)
            return 'style="border: 2px solid red"'
        else if(age <= 25)
            return 'style="border: 2px solid green"'
        else
            return ''
    }
}