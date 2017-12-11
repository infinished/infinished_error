
function splitElement(elementString){
  var pattern = /!%/;
  var elementList = elementString.split(pattern);
  return elementList;
}

function splitTeamMentor(elementString){
  var pattern = /\s*,\s*/;
  var elementList = elementString.split(pattern);
  return elementList;
}

function replaceOpen(imgString){
  var imgString = imgString.replace(/open/g, "uc");
  return imgString;
}


//https://docs.google.com/uc?id=
function processImg(imgList){
  for (j = 0; j < imgList.length; j++){
    imgList[j] = "url("+imgList[j]+")";
  }
}


//it is not unfinished. It is just a experiment
function pushNewDevelopers(developer_set){

  developer_set.delete("");

  for (let dev of developers) {

    if (developer_set.has(dev.id)){
      developer_set.delete(dev.id);
    }
  }

  for (var developer of developer_set){
    //template
    var newDeveloper = {
      id: '',
      name: '',
      profilePic: '',
      linkedIn: '',
      blurb: ''
    }
    newDeveloper.id = developer;
    console.log(developer);
    newDeveloper.name = developer;
    developers.push(newDeveloper);
  }
}

function storeDevelopers(developer_set, group){
  for (n = 0; n < group.length; n++){
    developer_set.add(group[n]);
  }
}




function getData(result){
  var metaData = result.data;
  //use unique set that that will not be repeated developer
  var developer_set = new Set();
  for (i = 0; i < metaData.length; i++){
    var data = metaData[i];

    //replace all 'open' in imgs to 'uc' in imgs
    data.imgs = replaceOpen(data.imgs);
    //replace 'open' in imgs to 'uc' in mainImg
    data.mainImg = replaceOpen(data.mainImg);

    //Split all elements into a list by !%
    data.imgs = splitElement(data.imgs);
    data.imgTxt = splitElement(data.imgTxt);
    data.info = splitElement(data.info);

    // by ,
    data.mentor = splitTeamMentor(data.mentor);
    data.team = splitTeamMentor(data.team);

    data.cat = "Project: " + data.cat;
    data.mainImg = "url("+data.mainImg+")";

    //add url to imgs list
    processImg(data.imgs);

    //add developers in the set;
    storeDevelopers(developer_set, data.team);
    storeDevelopers(developer_set, data.mentor);
    threads.push(data);
  }

  pushNewDevelopers(developer_set);


  for (i = 0; i < threads.length; i++) {
  	$('.threads').append('<div class="thread js-tilt"><a rel="leanModal" onclick="populateModal($(this)); return true;" class="threadLink mainImg" href="#modalPopup"></a><div class="threadDetails" rel="leanModal" onclick="populateModal($(this)); return true;" href="#modalPopup"><p class="threadLink threadTitle"></p><p class="threadLink threadCat" href="#"></p></div></div>');

  	$('.thread:nth-of-type('+(i+1)+')').addClass(threads[i].id).attr('id', i);
  	$('.thread:nth-of-type('+(i+1)+') .mainImg').css('background-image', threads[i].mainImg);
  	$('.thread:nth-of-type('+(i+1)+') .threadCat').html(threads[i].cat);
  	$('.thread:nth-of-type('+(i+1)+') .threadTitle').html(threads[i].title);
  }

  setupPopupWindows();


  //tilt animation
  $(function () {
      var tilt = $('.js-tilt').tilt(
  			{
  				maxTilt:        15,
  				perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
  				easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  				scale:          1.05,      // 2 = 200%, 1.5 = 150%, etc..
  				speed:          300,    // Speed of the enter/exit transition.
  				transition:     true,   // Set a transition on enter/exit.
  			}
  		);
  });

}
