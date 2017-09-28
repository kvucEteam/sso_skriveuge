
// function makeInterface() {
// 	console.log('\nmakeInterface - CALLED');

// 	var day = jsonData.day;
// 	var HTML = '';
// 	HTML += '<div id="skriveuge">';
// 	for (var d in day) {
// 		console.log('makeInterface - day['+d+']: ' + day[d]);
// 		HTML += '<div class="skriveuge_dag row">';
// 			for (var c in day[d].content) {
// 				console.log('makeInterface - day['+d+'].content['+c+']: ' + JSON.stringify(day[d].content[c]));
// 				// HTML += '<div class="skriveuge_item col-xs-12">';
// 					var cObj = day[d].content[c];

// 					switch(cObj.category) {
// 						case 'card':
// 					    	console.log('makeInterface - A1');
// 					        HTML += makeAudio(cObj.card);
// 					        break;
// 					    case 'card':
// 					    	console.log('makeInterface - A1');
// 					        HTML += makeCard(cObj.card);
// 					        break;
// 					    case 'checklist':
// 					    	console.log('makeInterface - A2');
// 					    	HTML += makeChecklist(cObj.checklist);
// 					        break;
// 					    case 'dagensOpgaver':
// 					    	console.log('makeInterface - A2');
// 					    	HTML += makeChecklist(cObj.dagensOpgaver);
// 					        break;
// 					    case 'faq':
// 					    	console.log('makeInterface - A3');
// 					        HTML += makeFaq(cObj.faq);
// 					        break;
// 					    case 'formalia':
// 					    	console.log('makeInterface - A4');
// 					    	HTML += makeFormalia(cObj.formalia);
// 					        break;
// 					    case 'video':
// 					    	console.log('makeInterface - A5');
// 					        HTML += makeVideo(cObj.video);
// 					        break;
// 					    default:
// 					    	console.log('makeInterface - A6');
// 					        // alert('ERROR');
// 					}
// 				// HTML += '</div>';
// 			}
// 		HTML += '</div>';
// 	}
// 	HTML += '</div>';
// 	return HTML;
// }


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
					case 'audio':
				    	console.log('makeSkriveugeSlide - A0');
				        HTML += makeAudio(cObj.audio);
				        break;
				    case 'card':
				    	console.log('makeSkriveugeSlide - A1');
				        HTML += makeCard(cObj.card);
				        break;
				    case 'checklist':
				    	console.log('makeSkriveugeSlide - A2');
				    	HTML += makeChecklist(cObj.checklist);
				        break;
				    case 'dagensOpgaver':
				    	console.log('makeSkriveugeSlide - A3');
				    	HTML += makeDagensOpgaver(cObj.dagensOpgaver);
				        break;
				    case 'dagensMaal':
				    	console.log('makeSkriveugeSlide - A3');
				    	HTML += makeDagensMaal(cObj.dagensMaal);
				        break;
				    case 'faq':
				    	console.log('makeSkriveugeSlide - A4');
				        HTML += makeFaq(cObj.faq);
				        break;
				    case 'formalia':
				    	console.log('makeSkriveugeSlide - A5');
				    	HTML += makeFormalia(cObj.formalia);
				        break;
				    case 'gaaet_i_staa':
				    	console.log('makeSkriveugeSlide - A5');
				    	HTML += makeNoProgress(cObj.gaaet_i_staa);
				        break;
				    case 'video':
				    	console.log('makeSkriveugeSlide - A6');
				        HTML += makeVideo(cObj.video);
				        break;
				    default:
				    	console.log('makeSkriveugeSlide - A7');
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
			HTML += ((cObj.hasOwnProperty('header'))?'<h4>'+cObj.header+'</h4>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			HTML += ((cObj.hasOwnProperty('btnText'))?'<span class="btn_ghost btn_ghost_noStyle btn btn-default">'+cObj.btnText+'</span>':'');
			HTML += '<div class="Clear"></div>';
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}


function makeAudio(cObj) {
	console.log('\nmakeAudio - CALLED - cObj: ' + JSON.stringify(cObj));

	var HTML = '';
	HTML += '<div '+((cObj.hasOwnProperty('attr'))?generateAttrStr(cObj.attr):'')+'>';
		HTML += '<div class="imgContainer">';
			HTML += (cObj.hasOwnProperty('imgSrc')?'<div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+cObj.imgSrc+'">':'');
		HTML += '</div>';
		HTML += '<div class="objText">';
			HTML += ((cObj.hasOwnProperty('header'))?'<h4>'+cObj.header+'</h4>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			HTML += ((cObj.hasOwnProperty('audioSrc'))?returnAudioMarkup_sso(cObj.audioSrc):'');
			HTML += '<div class="Clear"></div>';
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}


function makeChecklist(cObj) {
	console.log('\nmakeChecklist - CALLED - cObj: ' + JSON.stringify(cObj));

	var HTML = '';
	HTML += '<div '+((cObj.hasOwnProperty('attr'))?generateAttrStr(cObj.attr):'')+'>';
		HTML += '<div class="imgContainer">';
			HTML += (cObj.hasOwnProperty('imgSrc')?'<div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+cObj.imgSrc+'">':'');
		HTML += '</div>';
		HTML += '<div class="objText">';
			HTML += ((cObj.hasOwnProperty('header'))?'<h4>'+cObj.header+'</h4>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			HTML += ((cObj.hasOwnProperty('btnText'))?'<span class="btn_ghost btn_ghost_noStyle btn btn-default">'+cObj.btnText+'</span>':'');
			HTML += '<div class="Clear"></div>'; 
		HTML += '</div>';
	HTML += '</div>';

	return HTML; 
}


function makeDagensOpgaver(cObj) {
	console.log('\nmakeDagensOpgaver - CALLED - cObj: ' + JSON.stringify(cObj));

	var HTML = '';
	HTML += '<div '+((cObj.hasOwnProperty('attr'))?generateAttrStr(cObj.attr):'')+'>';
		HTML += '<div class="imgContainer">';
			HTML += (cObj.hasOwnProperty('imgSrc')?'<div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+cObj.imgSrc+'">':'');
		HTML += '</div>';
		HTML += '<div class="objText">';
			HTML += ((cObj.hasOwnProperty('header'))?'<h4>'+cObj.header+'</h4>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			
			HTML += ((cObj.hasOwnProperty('btnText'))?'<span class="btn_ghost btn_ghost_noStyle btn btn-default">'+cObj.btnText+'</span>':'');
			
			// HTML += ((cObj.hasOwnProperty('btn'))?'<span class="btn_ghost btn_ghost_noStyle btn btn-default"'+((cObj.btn.hasOwnProperty('jsonRef'))?' data-btnRef="'+cObj.btn.jsonRef+'"':'')+'>'+((cObj.btn.hasOwnProperty('btnText'))?cObj.btn.btnText:'')+'</span>':'');
			
			// if (cObj.hasOwnProperty('list')) {
			// 	HTML += '<ul class="dagensOpgaver_list">';
			// 	for (var n in cObj.list) {
			// 		HTML += '<li>'+cObj.list[n]+'</li>';
			// 	}
			// 	HTML += '</ul>';
			// }
			HTML += '<div class="Clear"></div>';
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}


function makeDagensMaal(cObj) {
	console.log('\nmakeDagensMaal - CALLED - cObj: ' + JSON.stringify(cObj));

	var HTML = '';
	HTML += '<div '+((cObj.hasOwnProperty('attr'))?generateAttrStr(cObj.attr):'')+'>';
		HTML += '<div class="imgContainer">';
			HTML += (cObj.hasOwnProperty('imgSrc')?'<div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+cObj.imgSrc+'">':'');
		HTML += '</div>';
		HTML += '<div class="objText">';
			HTML += ((cObj.hasOwnProperty('header'))?'<h4>'+cObj.header+'</h4>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			
			HTML += ((cObj.hasOwnProperty('btnText'))?'<span class="btn_ghost btn_ghost_noStyle btn btn-default">'+cObj.btnText+'</span>':'');
			
			HTML += '<div class="Clear"></div>';
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}


function makeNoProgress(cObj) {
	console.log('\nmakeNoProgress - CALLED - cObj: ' + JSON.stringify(cObj));

	var HTML = '';
	HTML += '<div '+((cObj.hasOwnProperty('attr'))?generateAttrStr(cObj.attr):'')+'>';
		HTML += '<div class="imgContainer">';
			HTML += (cObj.hasOwnProperty('imgSrc')?'<div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+cObj.imgSrc+'">':'');
		HTML += '</div>';
		HTML += '<div class="objText">';
			HTML += ((cObj.hasOwnProperty('header'))?'<h4>'+cObj.header+'</h4>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			
			HTML += ((cObj.hasOwnProperty('btnText'))?'<span class="btn_ghost btn_ghost_noStyle btn btn-default">'+cObj.btnText+'</span>':'');
			
			HTML += '<div class="Clear"></div>';
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}


function makeVideo(cObj) {
	console.log('\nmakeDagensOpgaver - CALLED - cObj: ' + JSON.stringify(cObj));

	var HTML = '';
	HTML += '<div '+((cObj.hasOwnProperty('attr'))?generateAttrStr(cObj.attr):'')+'>';
		HTML += '<div class="imgContainer">';
			// HTML += (cObj.hasOwnProperty('imgSrc')?'<div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+cObj.imgSrc+'">':'');
			HTML += ((cObj.hasOwnProperty('videoSrc'))?makeVideoPlayThumbnail((cObj.hasOwnProperty('thumbnail')?cObj.thumbnail:''), cObj.videoSrc):'');
		HTML += '</div>';
		HTML += '<div class="objText">';
			HTML += ((cObj.hasOwnProperty('header'))?'<h4>'+cObj.header+'</h4>':'');
			HTML += ((cObj.hasOwnProperty('text'))?'<p>'+cObj.text+'</p>':'');
			
			HTML += '<div class="Clear"></div>';
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}


function makeVideoPlayThumbnail(thumbnail, videoSrc){
	console.log('makeVideoPlayThumbnail - thumbnail: ' + thumbnail + ', videoSrc: ' + videoSrc);
	return '<div class="videoPlayThumbnail" role="button" data-videoSrc="'+videoSrc+'">'+((thumbnail.length>0)?'<img class="img-responsive" src="'+thumbnail+'">':'')+'</div>';  // ((thumbnail.length>0)?thumbnail:'')
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

// ========================================================================================================================
// 													AUDIO FRA KS 
// ========================================================================================================================
// $('#audioPlayerContainer').html(returnAudioMarkup(stepNo));

function returnAudioMarkup(stepNo){
	// $('#audioPlayer').hide();
	var audio = jsonData.steps[stepNo].audioFiles;
	var audioSrc;
	for (var n in audio){
		if (audio[n].type == 'mpeg'){  // We only use mpeg files - this makes the array of objects in jsonData.steps[stepNo].audioFiles obsolete.
			audioSrc = audio[n].name;
			break;
		}
	} 
	console.log("returnAudioMarkup - audioSrc: " + audioSrc);
	var HTML = '';
	HTML += '<div>';
	HTML += 	'<audio src="'+audioSrc+'" id="audioPlayer" controls="controls" autoplay="autoplay">';
    // HTML += 	'<source src="" type=""/>';
    HTML += 		'Your browser does not support the audio element';
    HTML += 	'</audio>';
    HTML += '</div>';
    return HTML;
}

function returnAudioMarkup_sso(audioSrc){
	// $('#audioPlayer').hide();
	// var audio = jsonData.steps[stepNo].audioFiles;
	// var audioSrc;
	// for (var n in audio){
	// 	if (audio[n].type == 'mpeg'){  // We only use mpeg files - this makes the array of objects in jsonData.steps[stepNo].audioFiles obsolete.
	// 		audioSrc = audio[n].name;
	// 		break;
	// 	}
	// } 

	var numOfSlides = jsonData.itemsPrSlide_global;
	var index_day = String($(this).closest('.carouselPage').index());
	var index_slide = String($(this).closest('.item').index());
	var index_card = String($(this).closest('.skriveuge_item').index());
	
	console.log("returnAudioMarkup - audioSrc: " + audioSrc);
	var HTML = '';
	HTML += '<div>';
	// HTML += 	'<audio src="'+audioSrc+'" id="audioPlayer" controls="controls" autoplay="autoplay">';
	HTML += 	'<audio src="'+audioSrc+'" id="audioPlayer_'+index_day+'_'+index_slide+'_'+index_card+'" controls="controls" autoplay="autoplay" style="width: 100%">';
    // HTML += 	'<source src="" type=""/>';
    HTML += 		'Your browser does not support the audio element';
    HTML += 	'</audio>';
    HTML += '</div>';
    return HTML;
}

function setJsAudioEventLitsner2(){
	if (typeof(autoPlayNew) === 'undefined'){
		window.autoPlayNew = true;
		console.log("setJsAudioEventLitsner2 - autoPlay - SET");

		// autoPlayNew = (isiniFrame())? false : true;  // COMMENTED OUT 27/9-2017
		autoPlayNew = false;							  // ADDED 27/9-2017
	}

	// alert('setJsAudioEventLitsner2 - autoPlayNew: ' + autoPlayNew);
	console.log('setJsAudioEventLitsner2 - isiniFrame - autoPlayNew: ' + autoPlayNew);

	// var audioObj = document.getElementById("audioPlayer");  // COMMENTED OUT 27/9-2017

	window.audioObj = $('audio')[0];

	$('audio').each(function( index, element ) {
		audioObj = element;
		if (autoPlayNew){
			console.log("setJsAudioEventLitsner2 - NO EVENT - PLAY");
			audioObj.play();
		} else {
			console.log("setJsAudioEventLitsner2 - NO EVENT - PAUSE");
			audioObj.pause(); 
		}
	});

	$( document ).on('click', 'audio', function(){
		window.audioObj = $(this)[0];
	});
	

    audioObj.onpause = function() {
    	console.log("setJsAudioEventLitsner2 - PAUSE");
    	if (!audioObj.ended){
    		autoPlayNew = false; 
    	}
    	
    }
    audioObj.onplay = function() {
    	console.log("setJsAudioEventLitsner2 - PLAY");
    	autoPlayNew = true;
    	
    }
}

// ========================================================================================================================


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
		console.log('click - A0');
		var numOfSlides = jsonData.itemsPrSlide_global;
		var index_day = $(this).closest('.carouselPage').index();
		var index_slide = $(this).closest('.item').index();
		var index_card = $(this).closest('.skriveuge_item').index();
		var json_index = numOfSlides*index_slide + index_card; 
		console.log('click - index_day: ' + index_day + ', index_slide: ' + index_slide + ', index_card: ' + index_card + ', json_index: ' + json_index);

		var cardObj = jsonData.day[index_day].content[json_index];
		console.log('click - cardObj: ' + JSON.stringify(cardObj));

		if (cardObj.hasOwnProperty('userMsgBox_data')) {
			console.log('click - A1');
			var displayMode = cardObj.userMsgBox_data.displayMode;
			var HTML = '';

			switch (displayMode) {
	            case "html":
	            	console.log('click - A2');
	                HTML += '<div id="UserMsgBox_text">'+cardObj.userMsgBox_data.html+'</div>';
	                break;
	            case "text":
	            	console.log('click - A3');
	                HTML += '<div id="UserMsgBox_text">'+cardObj.userMsgBox_data.text+'</div>';
	                break;
	            default:
	            	console.log('click - A4');
	                alert('Invalid "type"');
			}

			UserMsgBox('body', HTML);

			html(cardObj.userMsgBox_data);
		}
	}
});



function UserMsgBox_video(src) {

    var HTML = '<div class="video embed-responsive embed-responsive-16by9 col-xs-12 col-md-12"><iframe class="embed-responsive-item" src="'+src+'?iv_load_policy=3&amp;modestbranding=1&amp;showinfo=0&amp;autohide=1&amp;rel=0" allowfullscreen="1" frameborder="0"></iframe></div>';
    UserMsgBox_xclick('body', HTML);

    $('.MsgBox_bgr').addClass('MsgBox_bgr_video');
    $('#UserMsgBox').attr('id', 'UserMsgBox_video');
    // $('.CloseClass').addClass('glyphicon-remove-circle').removeClass('glyphicon-remove');

    // $('.CloseClass').html('<span class="CloseClass_inner right glyphicon glyphicon-remove"></span>');  // TEST to see if it is possible to place a inner glyphicon-remove inside another...

    // $('MsgBox_bgr_video').hide().fadeIn();
}

// =====================================================================================================
// 		This function is a copy of the "html" method from writeProcessClass.js in danA_skriveproces
// =====================================================================================================
// This method fetches markup (BUT INTENDED FOR TEXT PRIMERALY) from the DOM by use of a source-selector, and inserts it into the target fields by use of a target-selector.
//
// ARGUMENTS:
// ==========
// 		"html(sourceSelector, targetSelector)" or "html('sourceSelector', 'targetSelector')"
//
// EXAMPLE OF USE: 
// ===============
// 		To use this method, one writes e.g. "html(#step3_instruction, .instruction)" in the JSON-file
function html(json){
	console.log('\nhtml - CALLED');
	// var stepObj = jsonData.step[this.api.currentStepNo];

	var stepObjStr = JSON.stringify(json);
	console.log('html - stepObjStr: ' + stepObjStr);

	var pos_start = stepObjStr.indexOf('html(');

	var count = 0;

	while ((pos_start!==-1) && (count < 25)) {
		console.log('html - A0');

		console.log('html - count: ' + count);

		var pos_end = stepObjStr.indexOf(')"', pos_start);

		if (pos_end!==-1) {
			console.log('html - A1');

			var argArr = stepObjStr.substring(pos_start+6, pos_end).replace(/\'/g, '').split(',');
			console.log('html - argArr: ' + JSON.stringify(argArr));

			if (argArr.length == 2) {
				console.log('html - A2');

				var source = argArr[0].trim();
				var target = argArr[1].trim();
				console.log('html - source: "' + source + '", target: "' + target + '"');
				
				$(target).html($(source).html());
				// $(source).before('<h4 class="step_clipborad_header">'+source+'</h4>');
				
			} else {
				console.log('html - A3');

				alert('FEJL FRA: "html('+stepObjStr.substring(pos_start+6, pos_end)+')", som ikke rummer det rigtige antal selectors, som skal være 2.');
			}
		}

		pos_start = stepObjStr.indexOf('html(', pos_end); 
		console.log('html - pos_start: ' + pos_start);

		++count;
	}
}





function scaleAndPosition_sliderContainer() {

	window.scrollHeight = $('body').height();
	window.windowHeight = $(window).height();
	console.log('document.ready - scrollHeight: ' + scrollHeight + ', windowHeight: ' + windowHeight + ', windowHeight/scrollHeight: ' + windowHeight/scrollHeight);


	$('#sliderContainer').width($('#outerContainer').width());

	window.sliderContainerWidth = $('#sliderContainer').width();

	var height = $('#sliderContainer').height();
	var off = $('#outerContainer').offset();
	console.log('scaleAndPosition_sliderContainer - height: ' + height + ', off: ' + JSON.stringify(off));

	$('#sliderContainer').css({top: off.top - height});

	$('#slider').height(height);

	// $('#slider').width($('#sliderContainer').width()*windowHeight/(scrollHeight));
	// $('#slider').height(height);
}


//==========================================================================================
//										SLIDER
//==========================================================================================


scrollCallback = function() {
	console.log('scrollCallback - CALLED');

	window.bodyPos = $(window).scrollTop();

	var posPercent = (bodyPos + 0)/scrollHeight;
	console.log('onScroll - bodyPos: ' + bodyPos + ', scrollHeight: ' + scrollHeight + ', posPercent: ' + posPercent);

	$('.slider').css({left: posPercent*sliderContainerWidth});
}


// Denne event-litsner virker men "document" og "window" som samme referance kan der måske opstå problemer med i nogle browsere...
$( document ).on('scroll', window, scrollCallback);


$( document ).on('mousedown', '#slider', function(){
	console.log('mousedown - CALLED');
	// $( document ).off('scroll', window, scrollCallback);
	$(this).addClass('slider_off').removeClass('slider'); 
});

$( document ).on('mouseup', 'body', function(){  // <---  IMPORTANT: "body" is nessary because the user may click on "#slider" and loose the cursor position ontop of the "#slider" as they drag - when mouseup performed, the cursor will no longer be ontop of the "#slider", and therefore the event "mouseup" will not work
	console.log('mouseup - CALLED');
	// $( document ).on('scroll', window, scrollCallback);
	$('#slider').addClass('slider').removeClass('slider_off');
});


$( "#slider" ).draggable({ 
	containment: "#sliderContainer", 
	// scroll: false,
	start: function(event, ui) {
        console.log('slider - START - CALLED');
    },
	drag: function(event, ui) {
        console.log('slider - DRAG - CALLED');

        var pos = $(this).position();
        var off = $(this).offset();

        console.log('slider - DRAG - pos: ' + JSON.stringify(pos) + ', offset: ' + JSON.stringify(off));

        var widthPercent = pos.left/($(this).parent().width() - $(this).width());
        console.log('slider - widthPercent: ' + widthPercent);

        widthPercent = widthPercent*(scrollHeight - windowHeight);
        // $( "body" ).scrollTop( widthPercent);
        $( window ).scrollTop( widthPercent);

        // $('#sliderContainer').css({top: widthPercent});

    },
    stop: function(event, ui) {
        console.log('slider - STOP - CALLED');
    }
});


$( document ).on('click', ".weekNum_number", function(event){
	console.log('click - CALLED - SCROLL');
	var scrollTo = $(this).attr('data-scrollTo');
	console.log('click - SCROLL - scrollTo: ' + scrollTo + ', offset().top: ' + $("#"+scrollTo).offset().top + ', height()/2: ' + $("#"+scrollTo).height()/2);
	// var pos = Math.round($("#"+scrollTo).offset().top - $("#"+scrollTo).height()/2);
	// var pos = Math.round($("#"+scrollTo).offset().top + $("#"+scrollTo).outerWidth( true )/2);
	var ajust = {
		'carouselId_0': -200, 
		'carouselId_1': -200, 
		'carouselId_2': -200, 
		'carouselId_3': -200, 
		'carouselId_4': -200, 
		'carouselId_5': -200, 
		'carouselId_6': -200, 
		'carouselId_7': -200
	}
	// var pos = Math.round($("#"+scrollTo).offset().top + 0);
	var pos = Math.round($("#"+scrollTo).offset().top + ajust[scrollTo]);
	// $('#outerContainer').append('<div style="background-color:#F00; width: 20px; height: 20px; position: absolute; top:'+pos+'px;"></div>');
	$('html, body').animate({  // See: https://stackoverflow.com/questions/6677035/jquery-scroll-to-element
        scrollTop: pos
    }, 1000);
});


//==========================================================================================
//							OBJECT EVENT-LITSNERS
//==========================================================================================




$( document ).on('click', '.videoPlayBtn', function(){
	console.log('videoPlayBtn - CLICK - CALLED');
	var videoSrc = $(this).attr('data-videoSrc');

	// UserMsgBox_video('https://www.youtube.com/embed/-Go7min716I');
	UserMsgBox_video( videoSrc );
});


$( document ).on('click', '.videoPlayThumbnail', function(){
	console.log('videoPlayThumbnail - CLICK - CALLED');
	var videoSrc = $(this).attr('data-videoSrc');

	// UserMsgBox_video('https://www.youtube.com/embed/-Go7min716I');
	UserMsgBox_video( videoSrc );
});



$(window).resize(function() {
	scale_skriveuge_item();
	scaleAndPosition_sliderContainer();
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
	setJsAudioEventLitsner2();

	scaleAndPosition_sliderContainer();
});