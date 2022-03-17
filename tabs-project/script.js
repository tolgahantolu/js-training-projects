// Selecting elements
const btns = document.querySelectorAll('.tab-btn');
const section = document.querySelector('.section');
const contents = document.querySelectorAll('.content');

section.addEventListener('click', function(e) {
	//console.log(e.target.dataset.id);
	const id = e.target.dataset.id;
	if (id){
		btns.forEach(function(btn) {
			// remove active class from other buttons
			btn.classList.remove('active');
			// add active class
			e.target.classList.add('active');
		});
	};

	contents.forEach(function(content){
		content.classList.remove('active');
	});

	const element = document.getElementById(id);
	element.classList.add('active');
});