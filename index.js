let cvbtn = document.getElementById('cvBtn');
cvbtn.addEventListener("click",function(){
alert('cv daunloded');
})
let bar = document.getElementById('bar')
let ul = document.querySelector('ul');

bar.addEventListener("click",function(){
  ul.classList.toggle('showdata');

       })