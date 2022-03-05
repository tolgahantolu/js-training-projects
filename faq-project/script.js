// DOM traversing ***********************************
const questionBtns = document.querySelectorAll('.question-btn');

questionBtns.forEach(function(btn) {
	btn.addEventListener('click', function(e) {
		//console.log(e.currentTarget.parentElement.parentElement);
		const question = e.currentTarget.parentElement.parentElement;
		question.classList.toggle('show-text');
	})
})
