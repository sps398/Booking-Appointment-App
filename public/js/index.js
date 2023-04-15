const form = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const msg = document.querySelector('.msg');
const userId = document.getElementById('id');
const editMode = document.getElementById('editmode');
let deleteButton=null;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

window.addEventListener('DOMContentLoaded', () => {
  render();
});

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  if(nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter the fields';

    setTimeout(() => {
      msg.remove(); 
    }, 3000);
  }
  else {
        let user = {
          name: nameInput.value,
          email: emailInput.value,
          phoneNo: phoneInput.value
        }
        
        if(editMode.value === 'true') {
          user.id=userId.value;
          await axiosInstance.post('/update-user', user);
          editMode.value = 'false';
        }
        else
          await axiosInstance.post('/add-user', user);
        
        form.reset();
        render();
      }

    }

    async function render() {
        let result;
        try {
          result = await axiosInstance.get('/users');
        } catch(err) {
          console.log(err);
          return;
        }
        
        const users = result.data;
        console.log(users);

        const ul = document.getElementById('users');
        ul.innerHTML = '';

        users.forEach(user => {
          const uid = user.id;
          const li = document.createElement('li');
          li.className = 'item';
          li.id = uid;
          const userInfo = `${user.name},${user.email},${user.phoneNo}`;
          li.appendChild(document.createTextNode(userInfo));

          deleteButton = document.createElement('button');
          editButton = document.createElement('button');

          deleteButton.style.color = 'black';
          editButton.style.color = 'black';

          deleteButton.appendChild(document.createTextNode('DELETE'));
          editButton.appendChild(document.createTextNode('EDIT'));
          li.appendChild(deleteButton);
          li.appendChild(editButton);
          ul.appendChild(li);
          
          deleteButton.addEventListener('click', (e) => {
            deleteUser(li.id);
          });

          editButton.addEventListener('click', (e) => {
            editUser(user);
          });
        });
      }

    async function editUser(user) {
      nameInput.value = user.name;
      emailInput.value = user.email;
      phoneInput.value = user.phoneNo;
      id.value=user.id;
      editMode.value='true';
    }

    async function deleteUser(id) {
      try {
        console.log(id);
        await axiosInstance.post(`/delete-user/${id}`)
        render();
      } catch(err) {
        console.log(err);
      }
    }