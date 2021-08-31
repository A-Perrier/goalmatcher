import { contributors } from '../../../helpers/autocomplete'
import { successToast } from '../../../helpers/Toast';
import { create, edit, remove } from './Api/Project';
import { getLoader, removeLoader } from '../../../helpers/functions'
import { ROOT_URL } from '../../../config'
const projectForm = document.querySelector('form[name=project]');
const isEditing = document.querySelector('.centered-form').classList.contains('editing');
const deleteProjectBtn = document.querySelector('.project-delete');

const url = window.location.href.split('/')
const projectId = parseInt(url[url.length - 1]);

projectForm.addEventListener('submit', async e => {
  e.preventDefault();
  document.querySelectorAll('.form-error').forEach(e => e.remove())

  const data = {
    name: document.getElementById('project_name').value,
    description: document.getElementById('project_description').value,
    deadline: document.getElementById('project_deadline').value,
    stdContributors: Object.assign({}, contributors)
  }
  
  const { id, slug } = !isEditing ? await create(data) : await edit(data, projectId)
  if (id) /** On obtient ID que s'il n'y a pas eu d'erreur dans le formulaire */ {
    !isEditing ?
    successToast('Le projet a correctement été créé ! On y va !') :
    successToast("Le projet a correctement été modifié ! Rejoignons-le !");
    getLoader()
    setTimeout(() => {
      document.location.href = `${ROOT_URL}/project/${slug}/${id}`; 
      removeLoader();
    }, 700)
  }
})


const onDeleteProjectClick = () => {
  deleteProjectBtn.addEventListener('click', (async e => {
    const isWanted = confirm('Voulez-vous vraiment supprimer ce projet ? Cette action est irresversible et supprimera tout ce qu\'il contient');

    if (isWanted) {
      const status = await remove(projectId)
      if (status === 200) {
        document.location.href = ROOT_URL
      }
    }
  }))
}

onDeleteProjectClick()