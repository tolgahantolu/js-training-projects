const hexcolor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]; // örnek çıktı: #ff503f;

const color = document.querySelector('.color');
const btn = document.getElementById('btn');

btn.addEventListener('click', function(){
	let hex = "#";

	for (let i = 0; i < 6; i++) {
		//hex += hexcolor[0];
		hex += hexcolor[randomNumber()];
	}

	color.textContent = hex;
	document.body.style.backgroundColor = hex;
});

function randomNumber() {
	return Math.trunc(Math.random () * hexcolor.length);
}