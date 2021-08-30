const projectForm = document.querySelector('form[name=project]');
const isEditing = document.querySelector('.centered-form').classList.contains('editing');
const deleteProjectBtn = document.querySelector('.project-delete');

const url = window.location.href.split('/')
const projectId = parseInt(url[url.length - 1]);

console.log(projectForm, isEditing, deleteProjectBtn, url, projectId)
/* projectForm.submit(e => {
  e.preventDefault();
  $('.form-error').remove();

  const data = {
    name: $('#project_name').val(),
    description: $('#project_description').val(),
    deadline: $('#project_deadline').val(),
    stdContributors: Object.assign({}, contributors)
  }

  $.ajax({
    url: !isEditing ? "/api/project/create" : "/api/project/edit/"+projectId,
    method: "POST",
    data: JSON.stringify(data),
    success: (response) => {
      !isEditing ?
        successToast("Le projet a correctement été créé ! Nous vous y emmenons...") :
        successToast("Le projet a correctement été modifié ! Nous vous y emmenons...");
      
      getLoader();
      setTimeout(() => {
        document.location.href = `${ROOT_URL}/project/${response['slug-name']}/${response['id']}`; 
        removeLoader();
      }, 400)
    },
    error: (result) => {
      setErrors(result.responseJSON, 'project')
    } 
  })
})


const onDeleteProjectClick = () => {
  deleteProjectBtn.click(e => {
    const isWanted = confirm('Voulez-vous vraiment supprimer ce projet ? Cette action est irresversible et supprimera tout ce qu\'elle contient');

    if (isWanted) {
      getLoader();
      $.ajax({
        url: "/api/project/delete?project="+projectId,
        method: "POST",
        data: null,
        success: (r) => {
          successToast("La suppression s'est effectuée correctement. Vous allez être redirigé.e");
          setTimeout(() => {
            document.location.href = `${ROOT_URL}/`; 
          }, 600)
        },
        error: (r) => {
          dangerToast(r)
        },
        complete: () => {
          removeLoader();
        }
      })
    }
  })
}

onDeleteProjectClick(); */