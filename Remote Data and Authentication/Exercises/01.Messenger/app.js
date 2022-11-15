// na Viktor reshenieto (October 2021):

const sendBtn = document.getElementById("submit");
const refreshBtn = document.getElementById("refresh");
const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');
const textarea = document.getElementById("messages");
const url = "http://localhost:3030/jsonstore/messenger";

function attachEvents(){
    refreshBtn.addEventListener('click', loadMessages);
    sendBtn.addEventListener('click', onSubmi)
}

attachEvents();

//add single message
async function onSubmi(){
    const author = authorInput.value;
    const content = contentInput.value;

    const result = await createMessage({ author, content });
    contentInput.value = '';
    textarea += '\n'+ `${author}: ${content}`;
}

//load and display all messages
async function loadMessages(){
    try {
        const response = await fetch(url);
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        const messages = Object.values(data);
        // console.log(messages);
        textarea.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
        
    } catch (error) {
        alert(error.message);
    }
}

//post message
async function createMessage(message){
    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        alert(error.message);
    }
}



// Moeto reshenie ot July 2022 : 100/100 

// function attachEvents() {
//     const baseUrl = 'http://localhost:3030/jsonstore/messenger';
//     const sendBtn = document.getElementById('submit');
//     const refreshBtn = document.getElementById('refresh');
//     sendBtn.addEventListener('click', onSend);
//     refreshBtn.addEventListener('click', onRefresh);
//     const author = document.querySelector('input[name="author"]');
//     const content = document.querySelector('input[name="content"]');
//     const textarea = document.getElementById('messages');

//     async function onSend(){
//         if (author.value == '' || content.value == '') {
//             alert('All fields are required!');
//             return;
//         }
//         try {
//             const response = await fetch(baseUrl, {
//                 method: 'post',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     author: author.value.trim(),
//                     content: content.value.trim()
//                 })
//             });
//             if (response.ok == false) {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//             const data = await response.json();
//         } catch (error) {
//             alert(error.message);
//         }

//         author.value == '';
//         content.value = '';

//         onRefresh();
//     }

//     async function onRefresh(){
//         try {
//             const response = await fetch(baseUrl);
//             if (response.ok == false) {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//             const data = await response.json();
//             const allComments = [];
//             Object.entries(data).forEach(el => allComments.push(`${el[1].author}: ${el[1].content}`));
//             textarea.value = allComments.join('\n');
//         } catch (error) {
//             alert(error.message);
//         }

//     }
// }

// attachEvents();

