
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message');
const temp = document.querySelector('#temp');
const desc = document.querySelector('#desc');


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    message.textContent = 'Loading...'
    const location = search.value;
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            message.textContent = data.error;
        }
        else{
            message.textContent = 'The temperature in '+ data.data.city +' is '+data.data.temp;
            temp.textContent = 'Minimum temperature: '+ data.data.temp_min + ' Maximum temperature: '+ data.data.temp_max;
            desc.textContent = 'Description: ' + data.data.description;
        }
    })
})
})