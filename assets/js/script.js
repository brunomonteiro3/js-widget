/*
	@title: Technical Challenge for Chaordic 
	@date: 01/28/2015
	@author: Bruno Monteiro | brunomonteiro3@gmail.com
	@URL: http://brunomontei.ro/
*/

// Storing main item DOM - for a cleaner code
var referenceDetailUrl = document.getElementById('reference-detailUrl');
var referenceImage = document.getElementById('reference-image');
var referenceTitle = document.getElementById('reference-title');
var referencePrice = document.getElementById('reference-price');
var referenceOldPrice = document.getElementById('reference-oldPrice');
var referencePaymentConditions = document.getElementById('reference-paymentConditions');
var listRecommendations = document.getElementById('list-recommendations');

// Requesting the JSON File
load('assets/js/recommendations.json', function(xhr) {
	var data = xhr.response;

	// The JSON provided is invalid - that's why I'm removing a few things with regex below
	var str = data.replace(/^X\(|\);/g, '');

	// Converting data to a valid JSON format
	obj = JSON.parse(str);

	// Creating a shortname
	objData = obj.data.reference.item;

	// Writing data on main item
	referenceDetailUrl.href = objData.detailUrl;
	referenceImage.src = 'http:' + objData.imageName;
	referenceTitle.innerHTML = objData.name;
	referencePrice.innerHTML = objData.price;
	referencePaymentConditions.innerHTML = objData.productInfo.paymentConditions;

	// Checking if oldPrice is available
	if (objData.oldPrice != null) {
		referenceOldPrice.innerHTML = 'de: ' + objData.oldPrice;
	};

	// Storing recommendations info
	var recommendations = obj.data.recommendation;

	// Writing recommendations items
	var content = "";

	for (var i in recommendations) {
		item = recommendations[i];

		// Checking if oldPrice is available
		if (item.oldPrice != null) {
			var oldPrice = 'de: ' + item.oldPrice;
		} else {
			var oldPrice = '';
		}

		content+= 
			'<div class="item">' +
				'<a href="'+ item.detailUrl +'" target="_blank">' + 
					'<div class="imageName">' +
						'<img src="http:'+ item.imageName +'" />' +
					'</div>' + 
					'<div class="productInfo">' +
						'<h3 class="title">'+ item.name +'</h3>' +
						'<span class="oldPrice">'+ oldPrice +'</span>' + 
						'<div class="price">' +
							'Por: ' +
							'<span class="newPrice">'+ item.price +'</span>' +
							'<span class="paymentConditions">'+ item.productInfo.paymentConditions +'</span>' +
							'sem juros' +
						'</div>' +
					'</div>' + 
				'</a>' + 
			'</div>';
	};

	// Since I can't guarantee the recommendations will be always 10 items,
	// it's better check the children widths and set to parent
	document.getElementById('list-recommendations').innerHTML = content;

	// Checking the width of all children items
	var children = document.getElementById('list-recommendations').children;
	var childrenWidth = 0;

	for (var i = 0; i < children.length; i++) {
		childrenWidth += children[i].offsetWidth;
	}

	// Adding margin and padding
	var totalWidth = childrenWidth + 290

	// Applying the total width size to the parent div
	listRecommendations.style.width = totalWidth + 'px';

	// Slider
	listRecommendations.style.left = 0;

	// Previous button
	document.getElementById("btn-prev").onclick = function() {
		// Making sure this functions will not run if it's the 0px of the slider
		if (parseInt(listRecommendations.style.left) != 0) {
			var currentPosition = parseInt(listRecommendations.style.left) + 292;
			listRecommendations.style.left = currentPosition + 'px';
		}
	}

	// Next button
	var num = 292;

	document.getElementById("btn-next").onclick = function() {
		// Setting a limit
		if (listRecommendations.style.left != '-1168px') {
			var currentPosition = parseInt(listRecommendations.style.left) - 292;
			num = currentPosition;
			listRecommendations.style.left = num + 'px';
		};
	}
});

// Creating a function to load the JSON file
function load(url, callback) {				
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		// Checking if it's still loading
		if (xhr.readyState < 4) {
			return;
		}

		// If it's everything OK, deliver all data
		if (xhr.readyState === 4) {
			callback(xhr);
		}
	};

	xhr.open('GET', url, true);
	xhr.send('');
}