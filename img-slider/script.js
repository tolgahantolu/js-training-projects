//selecting elemensts
const slideEl = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');

slideEl.forEach(function(slide, index){
	slide.style.left = `${index * 100}%`;
});

let counter = 0;
nextBtn.addEventListener('click', function(){
	counter++;
	console.log(counter);
	carousel();
});

prevBtn.addEventListener('click', function(){
	counter--;
	console.log(counter);
	carousel();
});

function carousel() {
	if (counter < slideEl.length -1){
		nextBtn.style.display = 'block';
	} else {
		nextBtn.style.display = 'none';
	}

	if (counter > 0) {
		prevBtn.style.display = "block"
	} else {
		prevBtn.style.display = "none";
	}

	slideEl.forEach(function(slide) {
		slide.style.transform = `translateX(-${counter * 100}%)`;
	});
}

prevBtn.style.display = "none";