const menuIcon = document.querySelector('.fa-bars');
const navList = document.querySelector('header nav ul');
menuIcon.addEventListener('click', () => {
  navList.classList.toggle('show');
});
