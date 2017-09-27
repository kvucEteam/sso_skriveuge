
function makeInterface() {
	console.log('\nmakeInterface - CALLED');

	var day = jsonData.day;
	var HTML = '';
	HTML += '<div id="skriveuge">';
	for (var d in day) {
		console.log('makeInterface - day['+d+']: ' + day[d]);
		HTML += '<div class="skriveuge_dag row">';
			for (var c in day[d].content) {
				console.log('makeInterface - day['+d+'].content['+c+']: ' + JSON.stringify(day[d].content[c]));
				// HTML += '<div class="skriveuge_item col-xs-12">';
					var cObj = day[d].content[c];

					switch(cObj.category) {
					    case 'card':
					    	console.log('makeInterface - A1');
					        HTML += makeCard(cObj.card);
					        break;
					    case 'checklist':
					    	console.log('makeInterface - A2');
					    	HTML += makeChecklist(cObj.checklist);
					        break;
					    case 'faq':
					    	console.log('makeInterface - A3');
					        HTML += makeFaq(cObj.faq);
					        break;
					    case 'formalia':
					    	console.log('makeInterface - A4');
					    	HTML += makeFormalia(cObj.formalia);
					        break;
					    case 'video':
					    	console.log('makeInterface - A5');
					        HTML += makeVideo(cObj.video);
					        break;
					    default:
					    	console.log('makeInterface - A6');
					        // alert('ERROR');
					}
				// HTML += '</div>';
			}
		HTML += '</div>';
	}
	HTML += '</div>';
	return HTML;
}


function makeSkriveugeSlide(dayIndex, cardIndex_start, cardIndex_end) {
	console.log('\nmakeSkriveugeSlide - CALLED');

	// var weekLookup = ['FRE','LØR','SØN','MAN','TIR','ONS','TOR','FRE'];

	var day = jsonData.day;
	var HTML = '';
	
	HTML += '<div class="skriveuge_slide">';

		// HTML += '<div class="weekNameAndNumber">';
		// 	HTML += '<div class="weekNumber">'+String(parseInt(dayIndex)+1)+'</div>';
		// 	HTML += '<div class="weekDay">'+weekLookup[dayIndex]+'</div>';
		// HTML += '</div>';

		var contentLength = day[dayIndex].content.length;
		// var itemsPrSlide = day[dayIndex].itemsPrSlide;  	// COMMENTED OUT 25/9-2017
		var itemsPrSlide = jsonData.itemsPrSlide_global;	// ADDED 25/9-2017

		// cardIndex_end = (cardIndex_end < contentLength)? cardIndex_end : contentLength;  // COMMENTED OUT 25/9-2017
		cardIndex_end = (cardIndex_end < contentLength)? cardIndex_end : contentLength;		// ADDED 25/9-2017
		console.log('makeSkriveugeSlide - cardIndex_start: ' + cardIndex_start + ', cardIndex_end: ' + cardIndex_end + ', contentLength: ' + contentLength + ', itemsPrSlide: ' + itemsPrSlide);

		var countMem = 0;

		// for (var c = cardIndex_start; c < cardIndex_end; c++) {	// COMMENTED OUT 25/9-2017
		for (var c = 0; c < cardIndex_end-cardIndex_start; c++) {		// ADDED 25/9-2017
		
			console.log('makeSkriveugeSlide - day['+dayIndex+'].content['+String(c+cardIndex_start)+']: ' + JSON.stringify(day[dayIndex].content[c+cardIndex_start]));
			// HTML += '<div class="skriveuge_item col-xs-12">';
				var cObj = day[dayIndex].content[c+cardIndex_start];

				switch(cObj.category) {
				    case 'card':
				    	console.log('makeSkriveugeSlide - A1');
				        HTML += makeCard(cObj.card);
				        break;
				    case 'checklist':
				    	console.log('makeSkriveugeSlide - A2');
				    	HTML += makeChecklist(cObj.checklist);
				        break;
				    case 'faq':
				    	console.log('makeSkriveugeSlide - A3');
				        HTML += makeFaq(cObj.faq);
				        break;
				    case 'formalia':
				    	console.log('makeSkriveugeSlide - A4');
				    	HTML += makeFormalia(cObj.formalia);
				        break;
				    case 'video':
				    	console.log('makeSkriveugeSlide - A5');
				        HTML += makeVideo(cObj.video);
				        break;
				    default:
				    	console.log('makeSkriveugeSlide - A6');
				        // alert('ERROR');
				}
			// HTML += '</div>';

			countMem = c;
		}

		if (((contentLength - itemsPrSlide) < cardIndex_end) && (cardIndex_end%itemsPrSlide!==0)){ // COMMENTED OUT 25/9-2017
		// if ((cardIndex_end%itemsPrSlide!==0)){ // ADDED 25/9-2017
			// for (var i = 0; i < contentLength - itemsPrSlide; i++) {	// COMMENTED OUT 25/9-2017
			for (var i = 0; i <= itemsPrSlide - 2 - countMem; i++) {	// ADDED 25/9-2017
				HTML += '<div class="skriveuge_item skriveuge_item_dummy"></div>';  // &nbsp;
			};
		}
	HTML += '</div>';
	
	return HTML;
}


function generateAttrStr(attrObj) {
	console.log('\ngenerateAttrStr - CALLED - attrObj: ' + JSON.stringify(attrObj));

	var HTML = '';
	var keyArr = Object.keys(attrObj);
	for (var n in keyArr) {
		if (typeof(attrObj[keyArr[n]])!=='undefined') {
			HTML += keyArr[n]+'="'+attrObj[keyArr[n]]+'" ';
		}
	}

	HTML = HTML.trim();
	console.log('generateAttrStr - HTML: _' + HTML + '_');

	return HTML;
}


function makeCard(cObj) {
	console.log('\nmakeCard - CALLED - cObj: ' + JSON.stringify(cObj));

	var HTML = '';
	HTML += '<div '+((cObj.hasOwnProperty('attr'))?generateAttrStr(cObj.attr):'')+'>';
		HTML += '<div class="imgContainer">';
			HTML += (cObj.hasOwnProperty('imgSrc')?'<div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+cObj.imgSrc+'">':'');
		HTML += '</div>';
		HTML += '<div class="objText">';
			HTML += ((cObj.hasOwnProperty('header'))?'<h3>'+cObj.header+'</h3>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			HTML += ((cObj.hasOwnProperty('btnText'))?'<span class="btn_ghost btn_ghost_noStyle btn btn-default">'+cObj.btnText+'</span>':'');
			HTML += '<div class="Clear"></div>';
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}



//******************************************************************************
// Multi-carusel klasse fra "figurlæsningsobjektet" i geografi:
//******************************************************************************
//==============================================================================
//          Datatypes for text, images and video
//==============================================================================
// {
//     "type": "img",
//     "src": "img/06_Elna_Statistisk_aarbog_1920_side_27_js.jpg",
//     "alt": "Lokalt billede..."
// }, {
//     "type": "text",
//     "text": "Mødeindkaldelse ledsaget af artikel skrevet af Louis Pio..."
// }, {
//     "type": "video",
//     "src": "https://player.vimeo.com/video/129639593"
// }
// {   
//     "type" : "columnData",
//     "columnData": [
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
// {   
//     "type" : "columnData",
//     "columnData": [          <-----------------  It takes 1 to N columns: columns 1 to 3 gets their own columns, 4 columns and up stacks in one column.
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
carouselClass = {
    randomSlides: false,
    carouselId : 'questionCarousel',  // 20-09-2016 : This is the only change needed in the carouselClass in shared_functions.js
    bsColum: "col-10-center", // OPTIONS: "col-XX-center", "col-XX". NOTE: XX has to an even number if "center" has to work properly.
    init: function(jsonCarouselData) {
        if (this.randomSlides) {
            jsonCarouselData.carouselData.slides = this.shuffelArray(jsonCarouselData.carouselData.slides);
        }
        this.setEventListeners(jsonCarouselData);
        return this.returnCarouselHtml(jsonCarouselData);;
    },
    returnCarouselHtml: function(jsonCarouselData) {

        var HTML = '';

        var center = (this.bsColum.indexOf('center') !== -1) ? true : false;
        var colMain = parseInt(this.bsColum.split('-')[1]);
        var colSide = Math.round((12 - colMain) / 2);
        console.log("returnCarouselHtml - , center: " + center + ", colMain: " + colMain + ",colSide: " + colSide);

        HTML += (center) ? '<div class="col-md-' + colSide + '"></div>' : '';
        HTML += '<div id="'+this.carouselId+'" class="carousel slide col-xs-12 col-md-' + colMain + '" data-ride="carousel" data-interval="false">' +
            '<ol class="carousel-indicators hidden-xs">' +
            this.returnCarouselIndicators(jsonCarouselData) +
            '</ol>' +
            '<div class="carousel-inner" role="listbox">' +
            this.returnCarouselSlide(jsonCarouselData) +
            '</div>' +
            '<a class="left carousel-control" href="#'+this.carouselId+'" role="button" data-slide="prev">' +
            '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
            '<span class="sr-only">Previous</span>' +
            '</a>' +
            '<a class="right carousel-control" href="#'+this.carouselId+'" role="button" data-slide="next">' +
            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
            '<span class="sr-only">Next</span>' +
            '</a>' +
            '</div>';
        HTML += (center) ? '<div class="col-md-' + colSide + '"></div>' : '';
        return HTML;
    },


    returnCarouselIndicators: function(jsonCarouselData) {
        var HTML = '';
        for (var i in jsonCarouselData.carouselData.slides) {
            HTML += '<li data-target="#'+this.carouselId+'" data-slide-to="' + i + '"' + ((i == 0) ? ' class="active"' : '') + '></li>';
        };
        console.log("returnCarouselIndicators: " + HTML);

        return HTML;
    },
    returnCarouselSlide: function(jsonCarouselData) {
        console.log("returnCarouselItem2 - jsonCarouselData: " + JSON.stringify(jsonCarouselData));
        var slideData = jsonCarouselData.carouselData.slides;
        console.log("returnCarouselItem2 - slideData: " + slideData.length);
        var HTML = '';

        for (var i = 0; i < slideData.length; i++) {
            HTML += '<div id="slide_' + i + '" class="item' + ((i == 0) ? ' active' : '') + '">';

            HTML += (slideData[i].hasOwnProperty('header')) ? '<h2 class="columnHeading">' + slideData[i].header + '</h2>' : '';

            HTML += this.returnCarouselItem(i, slideData);

            HTML += '</div>';
        }

        console.log("returnCarouselItem2: " + HTML);

        return HTML;
    },
    returnCarouselItem: function(slideNum, slideData) {
    	console.log('returnCarouselItem - slideNum: ' + slideNum + ', slideData[slideNum].type: _' + String(slideData[slideNum].type) + '_');

        var HTML = '';

        HTML += (slideData[slideNum].hasOwnProperty('overlay')) ? '<div class="carouselOverlay">' + slideData[slideNum].overlay + '</div>' : '';

        HTML += '<div id="question_' + slideNum + '" class="question">'; // <------ ADDED 2/5-2016

        switch (String(slideData[slideNum].type)) {
            case "img":
                HTML += '<img class="img-responsive" src="' + slideData[slideNum].src + '" alt="' + slideData[slideNum].alt + '"/>';
                break;
            case "text":
                HTML += '<div class="TextHolder">' + slideData[slideNum].text + '</div>';
                break;
            case "video":
                HTML += '<div class="embed-responsive embed-responsive-16by9 col-xs-12 col-md-12">' +
                    '<iframe class="embed-responsive-item" src="' + slideData[slideNum].src + '?rel=0&iv_load_policy=3" allowfullscreen="1"></iframe>' +
                    '</div>';
                break;
            case "columnData":
                console.log("SLIDE TEST 1");
                for (var j in slideData[slideNum].columnData) {
                    if (j == 0) {
                        HTML += '<div class="analysis column col-xs-12 col-md-8 columnLeft">' + slideData[slideNum].columnData[j].column + '</div>';
                    }
                    if (j == 1) {
                        HTML += '<div class="analysis column col-xs-12 col-md-4 columnRight">' + slideData[slideNum].columnData[j].column + '</div>';
                    }
                }
                break;
            case "card":  // NEW category for the 7-day object in the SSO-project. Added d. 20/9-2017
                HTML += slideData[slideNum].card; // makeSkriveugeSlide(slideNum, itemsPrSlide);
                break;
            default:
                alert('Invalid "type"');
        }

        HTML += '</div>';

        console.log("returnCarouselItem: " + HTML);

        return HTML;
    },
    shuffelArray: function(ItemArray) {
        var NumOfItems = ItemArray.length;
        var NewArray = ItemArray.slice(); // Copy the array...
        var Item2;
        var TempItem1;
        var TempItem2;
        for (var Item1 = 0; Item1 < NumOfItems; Item1++) {
            Item2 = Math.floor(Math.random() * NumOfItems);
            TempItem1 = NewArray[Item1];
            TempItem2 = NewArray[Item2];
            NewArray[Item2] = TempItem1;
            NewArray[Item1] = TempItem2;
        }
        return NewArray;
    },
    setEventListeners: function(jsonCarouselData) {
        $(document).on('click', "#"+this.carouselId+" .item", function(event) {
            console.log('setEventListeners - CLICK - #'+this.carouselId+' .item - index: ' + $(this).prop('id'));

            // document.location.href = jsonCarouselData.carouselData.slides[$(this).index()].slideLink;        // Opens in the same window and tab

            // var win = window.open(jsonCarouselData.carouselData.slides[$(this).index()].slideLink, '_blank'); // Opens in the same window, but a new tab
            // win.focus();
        });
    }
}


//******************************************************************************
// Init multi-carusel funktion fra "figurlæsningsobjektet" i geografi:
//******************************************************************************
function initCarouselObjs(jsonData){
	console.log('\ninitCarouselObjs - CALLED');
    window.mco = {};
    var HTML = '';
    for (var n in jsonData.slideData){
    	console.log('\ninitCarouselObjs - CALLED');
        mco[n] = Object.create(carouselClass);
        mco[n].carouselId = 'carouselId_'+String(n);
        mco[n].bsColum = "col-12-center";
        HTML += '<div class="carouselPage">'+mco[n].init(jsonData.slideData[n])+'</div>';
    }
    return HTML;
}


// "slideData": [
//     {
//         "carouselData": 
//             {
//                 "slides":
//                 [
//                     { Slide 1... },
//                     { Slide 2... },
//                     { Slide 3... }
//                 ]
//             }
//     }
// ]


// DESCRIPTION:
// Each carusel takes a number of items pr slide "itemsPrSlide" 
function makeSlideData() {
	console.log('\nmakeSlideData - CALLED');

	var TjsonData = {slideData: []};
	var itemsPrSlide;
	for (var n in jsonData.day) {
		// if ((jsonData.day[n].hasOwnProperty('itemsPrSlide')) && (jsonData.day[n].itemsPrSlide!==null)) {   // COMMENTED OUT 25/9-2017
		// 	console.log('makeSlideData - A0');
		// 	itemsPrSlide = jsonData.day[n].itemsPrSlide;
		// } else {
		// 	console.log('makeSlideData - A1');
			if ((jsonData.hasOwnProperty('itemsPrSlide_global')) && (jsonData.itemsPrSlide_global!==null)) {
				console.log('makeSlideData - A2');
				itemsPrSlide = jsonData.itemsPrSlide_global;
			} else {
				console.log('makeSlideData - A3');
				itemsPrSlide = null;
			}
		// }
		console.log('makeSlideData - itemsPrSlide: ' + itemsPrSlide);

		if (itemsPrSlide!==null) {
			console.log('makeSlideData - A4');
			var slides = [];
			var cardIndex_start = 0;
			var numOfRuns = Math.ceil(jsonData.day[n].content.length/itemsPrSlide);
			console.log('makeSlideData - numOfRuns: ' + numOfRuns);
			for (var i = 0; i < numOfRuns; i++) {
				console.log('makeSlideData - cardIndex_start: ' + cardIndex_start + ', cardIndex_end: ' + String(cardIndex_start+itemsPrSlide));
				var HTML = makeSkriveugeSlide(n, cardIndex_start, cardIndex_start+itemsPrSlide);
				// console.log('makeSlideData - HTML: ' + HTML);
				cardIndex_start += itemsPrSlide;
				slides.push({"type": "card", "card": HTML});
				// console.log('makeSlideData - slides: ' + JSON.stringify(slides));
			};
			TjsonData.slideData.push({"day_no": jsonData.day[n].day_no, "carouselData": {"slides": slides}})
		}
	}
	console.log('makeSlideData - TjsonData: ' + JSON.stringify(TjsonData));

	return TjsonData;
}


// $( document ).on('click', ".carousel-control .glyphicon-chevron-right", function(event){
// // $( document ).on('click', ".right.carousel-control", function(event){
// 	var carouselPageIndex = $(this).closest('.carouselPage').index();
// 	console.log('CLICK glyphicon-chevron-right - carouselPageIndex: ' + carouselPageIndex);

// 	var numOfSlides = TjsonData.slideData[carouselPageIndex].carouselData.slides.length;
// 	console.log('CLICK glyphicon-chevron-right - numOfSlides: ' + numOfSlides);

// 	var pObj = $(this).closest('.carouselPage');
// 	var activeIndex = $('.active', pObj).index();
// 	console.log('CLICK glyphicon-chevron-right - activeIndex 1: ' + activeIndex);

// 	if ((activeIndex == 0) && (numOfSlides > 1)) {
// 		console.log('CLICK glyphicon-chevron-right - A1');
// 		++activeIndex;
// 	} else if (activeIndex < numOfSlides-1) {
// 		console.log('CLICK glyphicon-chevron-right - A2');
// 		++activeIndex;
// 	} else if (activeIndex == numOfSlides-1) {
// 		console.log('CLICK glyphicon-chevron-right - A3');
// 		activeIndex = 0;
// 	}
// 	console.log('CLICK glyphicon-chevron-right - activeIndex 2: ' + activeIndex);

// 	if (activeIndex == numOfSlides-1) {
// 		$('.right.carousel-control', pObj).hide();
// 	} else {
// 		$('.right.carousel-control', pObj).show();
// 	}
// 	$('.left.carousel-control', pObj).show();
// });


// $( document ).on('click', ".carousel-control .glyphicon-chevron-left", function(event){
// // $( document ).on('click', ".left.carousel-control", function(event){
// 	var carouselPageIndex = $(this).closest('.carouselPage').index();
// 	console.log('CLICK glyphicon-chevron-left - carouselPageIndex: ' + carouselPageIndex);

// 	var numOfSlides = TjsonData.slideData[carouselPageIndex].carouselData.slides.length;
// 	console.log('CLICK glyphicon-chevron-left - numOfSlides: ' + numOfSlides);

// 	var pObj = $(this).closest('.carouselPage');
// 	var activeIndex = $('.active', pObj).index();
// 	console.log('CLICK glyphicon-chevron-left - activeIndex 1: ' + activeIndex);

// 	if (activeIndex == 0) {
// 		console.log('CLICK glyphicon-chevron-left - A1');
// 		activeIndex = numOfSlides-1;
// 	} else if (activeIndex < numOfSlides) {
// 		console.log('CLICK glyphicon-chevron-left - A2');
// 		--activeIndex;
// 	} 
// 	console.log('CLICK glyphicon-chevron-left - activeIndex 2: ' + activeIndex);

// 	if (activeIndex == 0) {
// 		$('.left.carousel-control', pObj).hide();
// 	} else {
// 		$('.left.carousel-control', pObj).show();
// 	}
// 	$('.right.carousel-control', pObj).show();
// });


// $( document ).on('click', ".carousel-control .glyphicon-chevron-right", function(event){
$( document ).on('click', ".right.carousel-control", function(event){
	var carouselPageIndex = $(this).closest('.carouselPage').index();
	console.log('CLICK glyphicon-chevron-right - carouselPageIndex: ' + carouselPageIndex);

	var numOfSlides = TjsonData.slideData[carouselPageIndex].carouselData.slides.length;
	console.log('CLICK glyphicon-chevron-right - numOfSlides: ' + numOfSlides);

	var pObj = $(this).closest('.carouselPage');
	var activeIndex = $('.active', pObj).index();
	console.log('CLICK glyphicon-chevron-right - activeIndex 1: ' + activeIndex);

	if (activeIndex == numOfSlides-1) {
		$('.right.carousel-control', pObj).hide();
	} else {
		$('.right.carousel-control', pObj).show();
	}
	$('.left.carousel-control', pObj).show();
});


// $( document ).on('click', ".carousel-control .glyphicon-chevron-left", function(event){
$( document ).on('click', ".left.carousel-control", function(event){
	var carouselPageIndex = $(this).closest('.carouselPage').index();
	console.log('CLICK glyphicon-chevron-left - carouselPageIndex: ' + carouselPageIndex);

	var numOfSlides = TjsonData.slideData[carouselPageIndex].carouselData.slides.length;
	console.log('CLICK glyphicon-chevron-left - numOfSlides: ' + numOfSlides);

	var pObj = $(this).closest('.carouselPage');
	var activeIndex = $('.active', pObj).index();
	console.log('CLICK glyphicon-chevron-left - activeIndex 1: ' + activeIndex);

	if (activeIndex == 0) {
		$('.left.carousel-control', pObj).hide();
	} else {
		$('.left.carousel-control', pObj).show();
	}
	$('.right.carousel-control', pObj).show();
});


function addOrRemoveCarouselControles() {

	$('.left.carousel-control').hide();

	$('.carouselPage').each(function( index, element ) {
		var numOfSlides = $('.item', element).length;
		console.log('addOrRemoveCarouselControles - numOfSlides: ' + numOfSlides);

		if (numOfSlides == 1) {
			$('.right.carousel-control', element).hide();
		}
	});

	// for (var n in TjsonData.slideData) {
	// 	if (TjsonData.slideData[n].carouselData.slides.length == 1) {
	// 		$('.right.carousel-control').hide();
	// 	}
	// };
}


function insertWeekdayAndWeekNum() {

	var weekLookup = ['FRE','LØR','SØN','MAN','TIR','ONS','TOR','FRE'];

	$('.carousel').each(function( index, element ) {
		var HTML = '';
		HTML += '<span class="weekNameAndNumber">';
			HTML += '<span class="weekDay">'+weekLookup[index]+'</span>';
			HTML += '<span class="weekNumber">'+String(parseInt(index)+1)+'</span>';
		HTML += '</span>';

		$(element).prepend(HTML); 
	});
}


// IMPORTANT:
// Scaling is needed because if the width of ".skriveuge_item" is set in percent, the bootstrap slide animation breaks if only 
// one ".skriveuge_item" and two ".skriveuge_item_dummy" cards are present in the last ".skriveuge_slide".
function scale_skriveuge_item() {
	// var w = $('.skriveuge_slide').width();  // carousel-inner
	var w = $('.carousel-inner').width();  // active
	var w_weekNum = $('.weekNameAndNumber').outerWidth();
	var w_item = $('.skriveuge_item').width();
	// var w_item = $('.skriveuge_item').outerWidth();
	var m_left_item = parseInt($('.skriveuge_item').css('margin-left').replace('px', ''));
	var m_right_item = parseInt($('.skriveuge_item').css('margin-right').replace('px', ''));
	// var numOfItems = $('.skriveuge_slide:eq(0) .skriveuge_item').length;  // <----- IMPORTANT: THIS IS NOT GENERAL!
	var numOfItems = jsonData.itemsPrSlide_global;
	console.log('scale_skriveuge_item - w: ' + w + ', w_item: ' + w_item + ', m_left_item: ' + m_left_item + ', m_right_item: ' + m_right_item + ', numOfItems: ' + numOfItems);

	var w_item_new = Math.floor(w/numOfItems) - m_left_item - m_right_item - 2;				// COMMENTED 26/9-2017
	// var w_item_new = Math.floor((w - w_weekNum)/numOfItems) - m_left_item - m_right_item - 15;  // ADDED 26/9-2017  <-------- ERROR with weekNameAndNumber!!
	console.log('scale_skriveuge_item - w_item_new: ' + w_item_new);

	$('.skriveuge_item').width(w_item_new);
}


$( document ).on('mouseenter', '.objLink', function(){
	console.log('mouseover - CALLED');

	$('.cviOverlay', this).fadeIn( "fast", function() {});

	$('.btn_ghost', this).switchClass( "btn_ghost_noStyle", "vuc-primary", 300, "easeInOutQuad" );
});

$( document ).on('mouseleave', '.objLink', function(){
	console.log('mouseout - CALLED');
	
	$('.cviOverlay', this).fadeOut( "fast", function() {});

	$('.btn_ghost', this).switchClass( "vuc-primary", "btn_ghost_noStyle", 300, "easeInOutQuad" );
});


$( document ).on('click', '.skriveuge_item', function(){
	if ($('.btn', this).length) {
		var index_slider = $(this).closest('.carouselPage').index();
		var index_slide = $(this).closest('.item').index();
		var index_card = $(this).closest('.skriveuge_item').index();
		var json_index = 0;
		UserMsgBox('body', 'TEST');
	}
});



$(window).resize(function() {
	scale_skriveuge_item();
});


$(document).ready(function() {
	console.log('document.ready - jsonData: ' + JSON.stringify(jsonData));

	window.TjsonData = makeSlideData();
	console.log('document.ready - TjsonData: ' + JSON.stringify(TjsonData));

	// $('#interface').append(makeInterface());

	$('#interface').append(initCarouselObjs(TjsonData));
	insertWeekdayAndWeekNum();
	addOrRemoveCarouselControles();

	scale_skriveuge_item();
});