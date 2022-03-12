const menu = [
  {
    id: 1,
    title: "pancakes monster",
    category: "breakfast",
    price: 12.90,
    img: "./img/item-1.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
  {
    id: 2,
    title: "double hamburger",
    category: "lunch",
    price: 17.90,
    img: "./img/item-2.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
  {
    id: 3,
    title: "double eggzilla",
    category: "breakfast",
    price: 8.90,
    img: "./img/item-3.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit.`,
  },
  {
    id: 4,
    title: "hamburger mushroom",
    category: "breakfast",
    price: 20.90,
    img: "./img/item-4.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
  {
    id: 5,
    title: "milkshake attack",
    category: "shakes",
    price: 11.90,
    img: "./img/item-5.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
  {
    id: 6,
    title: "dream pancake",
    category: "breakfast",
    price: 14.90,
    img: "./img/item-6.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
  {
    id: 7,
    title: "crazy milkshake",
    category: "shakes",
    price: 16.90,
    img: "./img/item-7.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
  {
    id: 8,
    title: "spaghetti monster",
    category: "lunch",
    price: 18.90,
    img: "./img/item-8.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
  {
    id: 9,
    title: "classic cake",
    category: "cake",
    price: 26.90,
    img: "./img/item-9.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit.`,
  },
  {
    id: 10,
    title: "steak dream",
    category: "dinner",
    price: 31.90,
    img: "./img/item-10.jpg",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore Lorem ipsum dolor sit. `,
  },
];

const menuContainer = document.querySelector('.menu-items');
const btnContainer = document.querySelector('.btn-container');

// Load Items
window.addEventListener('DOMContentLoaded', function() {
	displayMenuItems(menu);
	displayFilterButtons();
});

function displayMenuItems(menuItems){
	let displayMenu = menuItems.map(function(item){
		return `<article class="menu-item">
				<img src="${item.img}" alt="${item.title}" class="image" />
				<div class="item-info">
					<header>
						<h4>${item.title}</h4>
						<h4 class="price">${item.price}</h4>
					</header>
					<p class="item-text">
						${item.desc}
					</p>
				</div>
			</article>`;
	}).join('');
	menuContainer.innerHTML = displayMenu;
	//menuContainer.insertAdjacentHTML('afterbegin', displayMenu); // BUNU KULLANMA !!!

	console.log(displayMenu);
};

function displayFilterButtons(){
	const categories = menu.reduce(function(value, item) {
		if(!value.includes(item.category)) {
			value.push(item.category);
		}
		return value;
	}, ['all']); // 'all' değerinden başlayacak!

	const categoryButtons = categories.map(function(category) {
		return `<button type="button" class="filter-btn" data-id="${category}">${category}</button>`;
	}).join('');
	btnContainer.innerHTML = categoryButtons;

	// burada kullanılmaz ise hata verir!
	const filterButtons = btnContainer.querySelectorAll('.filter-btn');

	// filter items
	filterButtons.forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			const category = e.currentTarget.dataset.id;
			const menuCategory = menu.filter(function(menuItem) {
				if(menuItem.category === category) {
					return menuItem;
				}
			})

			if(category === 'all') {
				displayMenuItems(menu);
			} else {
				displayMenuItems(menuCategory);
			}
		})
	})
}
