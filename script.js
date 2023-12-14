const input  = document.getElementById('input');
const errorMsg = document.querySelector('.error');
const hintMsg = document.querySelector('.hint');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.querySelector('.downloadBtn');
const qrbox = document.querySelector('.qr-code-box');
let img = document.getElementById('qr-img');

function generateOrCode () {
    if(!input.value){
        errorMsg.innerHTML = 'Please enter a Text or Url';
        setTimeout(() => {
            errorMsg.innerHTML = ''; 
        }, 2000);
        return;
    }
    generateBtn.innerText = "Generating...";
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;

    img.onload = () => {
        generateBtn.innerText = "Generate";
        qrbox.classList.remove('hide');
        hintMsg.innerHTML = 'Here is your QR Code';
    };
}

generateBtn.addEventListener('click', () => {
    generateOrCode();
});

function downloadOrCode(){
    fetch(img.src).then(response => {
        return response.blob();
    }).then(blob =>{
        let imgUrl = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = imgUrl;
        a.download = 'OrCode';
        a.click()
    });
}

downloadBtn.addEventListener('click', ()=> {
    downloadOrCode();
});