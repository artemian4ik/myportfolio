
(() => {
	window.addEventListener('wheel', preventDefault, { passive: false });

	window.audiobutton.addEventListener('click', () => {
		if (window.audio.paused) {
			window.audio.play();
		} else {
			window.audio.pause();
		}
	});

	const human = document.querySelector('.human');
	const moon = document.getElementById('moon');
	const watchText = document.getElementsByClassName('watch-text');
	const watchTextArray = Array.from(watchText);
	let slider = document.querySelector('.slider');
	let wrapper = document.querySelector('.wrapper-slider');
	let next = document.querySelector('.arrow-next');
	let prev = document.querySelector('.arrow-prev');
	let item = document.querySelectorAll('.item');
	let currdeg  = 0;
	let active = 0;

	moon.addEventListener('click', () => {
		const contentPage = document.querySelector('.content-page');
		const startPage = document.getElementById('start-page-block');
		
		if (contentPage && startPage) {
			slowScrollTo(contentPage, startPage);
		}
	});

	next.addEventListener('click', () => {
		slider.classList.toggle('zoom');

		currdeg = currdeg - 120;

		if (active === item.length - 1) {
			active = 0;
		} else {
			active++;
		}

		toggle();
	});

	prev.addEventListener('click', () => {
		slider.classList.toggle('zoom');

		currdeg = currdeg + 120;

		if (active === 0) {
			active = item.length - 1;
		} else {
			active--;
		}

		toggle();
	});

	let toggle = () => {
		setTimeout(() => {
			for (let i = 0; i < item.length; i++) {
				item[i].classList.remove('active');
			}

			item[active].classList.add('active')
			wrapper.style.transform = 'rotateY(' + currdeg + 'deg)';
		}, 900);

		setTimeout(() => {
			slider.classList.toggle('zoom');
		}, 1900);
	}


	human.addEventListener('mouseenter', () => {
		watchTextArray.forEach(watchText => {
            watchText.style.color = '#f5f5f5';
        });
	});

	human.addEventListener('mouseleave', () => {
		watchTextArray.forEach(watchText => {
			watchText.style.color = '';
        });
	});

	human.addEventListener('click', () => {
		const contentPage = document.querySelector('.content-page');
		const startPage = document.getElementById('present-page-block');
		
		if (contentPage && startPage) {
			slowScrollTo(contentPage, startPage);
		}
	});
})();

function slowScrollTo(container, target) {
	const root = document.documentElement;
	root.style.setProperty('--text-opacity', '0');



	const startPosition = container.scrollTop;
	const targetPosition = target.offsetTop;
	const distance = targetPosition - startPosition;
	const duration = 2000;
	let startTime = null;
  
	function animation(currentTime) {
	  if (!startTime) startTime = currentTime;
	  const timeElapsed = currentTime - startTime;
	  const run = easeInOut(timeElapsed, startPosition, distance, duration);
	  container.scrollTop = run; 
  
	  if (timeElapsed < duration) {
		requestAnimationFrame(animation); 
	  } else {
		root.style.setProperty('--text-opacity', '1');
	  }
	}
  
	function easeInOut(t, b, c, d) {
	  let time = t / (d / 2);
	  if (time < 1) return (c / 2) * time * time + b;
	  time--;
	  return (-c / 2) * (time * (time - 2) - 1) + b;
	}
  
	requestAnimationFrame(animation);
}

function preventDefault(event) {
	event.preventDefault();
}