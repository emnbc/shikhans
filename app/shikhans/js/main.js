$(window).on("load", function () {
  $(".preloader").fadeOut(300);
});

$(document).ready(function() {

$(".lazy").addClass("hidden").viewportChecker({
  classToAdd: "visible",
  offset: 50
});

$("h1, .controls").animate({ opacity: "1" }, 300);
setTimeout(function() { $(".cost").hide(); $(".content").show(); }, 100);
setTimeout(function() { $(".google").show(); }, 1500);

var vh,
    sldInd,
    frameIndP,
    frameIndM;

function res () {
  vh = $(window).height() - 120;
  if ($(window).width() < 800) {
    sldInd = "20px";
    frameIndP = "2000px";
    frameIndM = "-2000px";
    $(".slider").css("height", (vh + 60) + "px");
  }
  else {
    sldInd = "50px";
    frameIndP = "5000px";
    frameIndM = "-5000px";
    $(".slider").css("height", vh + "px");
  }
  $(".cost").css("height", vh + "px");
}
res ();
$(window).resize(res);


// main Slider BEGIN ########################################

var TIME_INT = 9000, // time between change frame
    tog = false,
    x = 0,
    fr = "#fr_" + x,
    tn = " .title-name",
    td = " .title-desc",
    lh = ($(".frame").length - 1);

function slideAway (idFrame, title) {
  $(idFrame + title).animate({ left: frameIndM }, 500);
  $(idFrame + title).queue(function () {
    $(this).css("left", frameIndP);
    $(this).dequeue();
  });
}
function interval() {
  changeFrame ();
  irv = setTimeout(interval, TIME_INT);
}

for (var i = 0; i <= lh; i++) {
  $(".frame").get(i).setAttribute("id", "fr_" + i);
  $("#fr_" + i).css({"background-image": "url(" + $("#fr_" + i + " img").attr("src") + ")",
                      "background-size": "cover",
                  "background-position": "center center"
                });
}

$(fr).fadeIn(300);
setTimeout(function() {
  $(fr + " .include").fadeIn(300);
  $(fr + tn).animate({ left: sldInd }, 500);
  setTimeout(function() {
    $(fr + td).animate({ left: sldInd }, 500);
  }, 100);
}, 300);

var irv = setTimeout(interval, TIME_INT);

function changeFrame () {
if (lh == 0) return;
slideAway(fr, tn);
setTimeout(function() {
  slideAway(fr, td);
}, 50);
setTimeout(function() {
  $(fr + " .include").fadeOut(300);
  setTimeout(function() {
    $(fr).fadeOut(500);
    x < lh ? x++ : x=0;
    fr = "#fr_" + x;
    $(fr).fadeIn(500);
    setTimeout(function() {
      $(fr + " .include").fadeIn(300);
      $(fr + tn).animate({ left: sldInd }, 500);
      setTimeout(function() {
        $(fr + td).animate({ left: sldInd }, 500);
      }, 100);
    }, 400);
  }, 100);
}, 100);
}
// main Slider END ########################################

// mainSlider controls BEGIN ########################################
$(".pause").click(function() {
  clearTimeout(irv);
  tog = true;
  $(this).hide();
  $(".play").show();
});

$(".play").click(function() {
  irv = setTimeout(interval, 400);
  tog = false;
  $(this).hide();
  $(".pause").show();
});

$(".next").click(function() {
  if (tog) {changeFrame ();}
  else {clearTimeout(irv); interval();}
});

$(".previous").click(function() {
  if (x == 0 && tog) {x = (lh - 1); changeFrame ();}
  else if (x > 0 && tog) {x = (x - 2); changeFrame ();}
  else if (x == 0 && !tog) {x = (lh - 1); clearTimeout(irv); interval();}
  else {x = (x - 2); clearTimeout(irv); interval();}
});
// mainSlider controls END ########################################

// gallery BEGIN ########################################
var shi = new Object();
shi.mySlider = function (id) {
  if(!id) return;
  var s = 0,
      sg = id + " div[data-slide-number ='" + s + "']",
      sh = $(id + " .slider-gallery").length;
  for (i = 0; i < sh; i++) {
    $(id + " .slider-gallery").get(i).setAttribute("data-slide-number", i);
    $(id + " div[data-slide-number ='" + i + "']").css({"background-image": "url(" + $(id + " div[data-slide-number ='" + i + "'] img").attr("src") + ")",
                                                        "background-size": "cover",
                                                        "background-position": "center center"
    });
    $(id + " .gallery-nav ul").append("<li data-pic-number='" + i + "' class='fa'></li>");
  }
  $(id + " li").click(function() {
    var qwe = $(this).attr("data-pic-number");
    if (s != qwe) {
      s = qwe;
      changePicture();
    }
  });
  $(id + " .next-picture").click(function() {
    if (s < (sh - 1)) { s++; changePicture(); }
    else { s = 0; changePicture(); }
  });
  $(id + " .previous-picture").click(function() {
    if (s == 0) { s = sh - 1; changePicture(); }
    else { s--; changePicture(); }
  });
  function galleryNav () {
    for (i = 0; i < sh; i++) {
      $(id + " li[data-pic-number ='" + i + "']").removeClass("fa-circle-o fa-dot-circle-o");
      if (i == s) { $(id + " li[data-pic-number ='" + i + "']").addClass("fa-dot-circle-o"); }
      else { $(id + " li[data-pic-number ='" + i + "']").addClass("fa-circle-o"); }
    }
  }
  function changePicture () {
    $(sg).fadeOut(300);
    sg = id + " div[data-slide-number ='" + s + "']";
    $(sg).fadeIn(300);
    galleryNav();
  }
  galleryNav();
  $(sg).show();
}
shi.mySlider("#mySlider-1");
// gallery END ########################################


// mobile menu BEGIN ########################################
$(".bars").click(function() {
  $(".min-menu").fadeToggle(300);
  $(".backplane").fadeIn(300);
  $(".min-menu a, .backplane").click(function() {
    $(".min-menu").fadeOut(300);
    $(".backplane").fadeOut(300);
  });
});
// mobile menu END ########################################


// button "Scroll to Top" BEGIN ########################################
$("body").append("<div id='button-up'><span>Scroll To Top <i class='fa fa-angle-up fa-lg'></i></span></div>");
$("#button-up").css({
  "display": "none",
  "right": "50px",
  "margin": "0",
  "position": "fixed",
  "bottom": 0,
  "outline":"none",
  "color": "#fff",
  "z-index": "50",
  "background-color": "#000",
  "border-radius": "10px 10px 0 0",
  "text-decoration": "none",
  "padding": "10px",
  "opacity": "0.5",
  "box-shadow": "0 0 20px rgba(0,0,0,0.7)",
  "font-weight": "bold",
  "cursor": "pointer"
});
$(window).scroll(function () {
  $(this).scrollTop() > 200 ? $("#button-up").fadeIn(400) : $("#button-up").fadeOut(400);
});
$("#button-up").click(function () {
    $("body,html").animate({
        scrollTop: 0
    }, 500);
    return false;
});
// button "Scroll to Top" END ########################################


// smooth scroll BEGIN ########################################
$("a[href^='#']").click(function() {
  var el = $(this).attr("href");
  $("html, body").animate({scrollTop: $(el).offset().top + "px"}, 500);
  return false;
});
// smooth scroll END ########################################

});
