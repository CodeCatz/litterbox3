var Memory = (function () {
	//var a = performance.now();
	var poteze = 0;
	var r = {
		images: [
			'images/image1.jpg',
			'images/image2.jpg',
			'images/image3.jpg',
			'images/image4.jpg',
			//'images/image5.jpg',
			//'images/image6.jpg',
			//'images/image7.jpg',
			//'images/image8.jpg'
		],
		//colors: ['#99b433', '#1e7145', '#ff0097', '#9f00a7', '#7e3878', '#603cba', '#1d1d1d', '#00aba9', '#eff4ff', '#2d89ef', '#2b5797', '#ffc40d', '#e3a21a', '#da532c', '#ee1111', '#b91d47'],
		colors: ['#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc','#ff99cc'],
		draw: function () {			
			var game = $('#game'),
				shuffledPairs = [];
				shuffledColors = r.shuffle(r.colors);

			$.each(r.images, function (i, imageUrl) {
				var elm = '<div class="memory-element" data-url="' + imageUrl + '"><img width="150" height="150" src="' + imageUrl + '" alt="Am I the correct one?" /></div>';

				shuffledPairs.push(elm);
				shuffledPairs.push(elm);
			});
			
			$.each(r.shuffle(shuffledPairs), function (i, imageElm) {
				imageElm = $(imageElm);
				imageElm.css('background-color', shuffledColors[i]);
				game.append(imageElm);
			});
		},
		shuffle: function (array) { // http://stackoverflow.com/a/6274398
			var counter = array.length,
				temp = null,
				index = 0;

			// While there are elements in the array
			while (counter > 0) {
				// Pick a random index
				index = Math.floor(Math.random() * counter);

				// Decrease counter by 1
				counter -= 1;

				// And swap the last element with it
				temp = array[counter];
				array[counter] = array[index];
				array[index] = temp;
			}
			

			return array;
		},
		handleResolving: function () {
			$('#game').on('click', '.memory-element:not(.solved)', function () {
				var elm = $(this),
					activatedElms = [],
					pair = [];

				elm.addClass('activated');

				activatedElms = $('.activated');

				if (activatedElms.length === 1) {
					// For the time being, do nothing
				} else if (activatedElms.length > 1) {
					poteze += 1;
					r.resolvePair(activatedElms);
				}
				
				if ($('.solved').length === $('.memory-element').length - 2) {
					//$.each(.memory-element:not(.solved)) {
					//	activatedElms.addClass('solved');
					//}
					//var b = performance.now();
					//var time = b - a;
					//var min = Math.floor(time/(3600*60));
					//var sec = Math.floor((time % (3600*60))/3600);
					alert('Igro ste rešili v -- in ' + poteze + ' potezah.');
					poteze = 0
					if (confirm('You win! Click OK to play another game.')) {
						$('.memory-element').remove();
						//var a = performance.now();
						r.draw();
					}
				}
			});
			
		},
		resolvePair: function (activatedElms) {
			var pair = [];

			activatedElms.each(function (i, elm) {
				elm = $(elm);

				pair[i] = elm.data('url');
			});

			if (pair[0] === pair[1]) {
				activatedElms.addClass('solved');
				activatedElms.removeClass('activated');
			} else {
				activatedElms.addClass('failed');
				setTimeout(function () {
					activatedElms.removeClass('failed');
					activatedElms.removeClass('activated');
				}, 500);
			}
		}
	},
	u = {
		initialize: function () {
			r.draw();
			r.handleResolving();
		}
	};
	
	return u;
}());

$(function () {
	Memory.initialize();
});