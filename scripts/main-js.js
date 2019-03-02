$(window).on("load", function() {
  $(".preloader").fadeOut("slow");
  $("body").removeClass("no-scroll");
});
$(document).ready(function() {
  var imgSlideTimer = null;

  $(".section-head").on("click", function() {
    if (
      $(this)
        .next()
        .css("display") == "none"
    ) {
      $(".section-content").hide();
      $("div.sec-title").removeClass("active");
      //To make the images in the gallery section to auto-slide when the section is opened
      if (
        $(this)
          .children(".sec-title")
          .text() == "GALLERY"
      ) {
        //alert("You're now viewing my GALLERY!");
        //imgSlideTimer = setInterval(autoSlideRight, 1500);
      }
      $(this)
        .next()
        .slideDown("slow");
      $(this)
        .find(".sec-title")
        .addClass("active");
    } else {
      $(this)
        .next()
        .slideUp();
      $(this)
        .find(".sec-title")
        .removeClass("active");
      //clearInterval(imgSlideTimer);
    }
  });
  //Move the current section head to the top edge of the window
  $(".section-head").on("click", function() {
    $("html, body").animate(
      {
        scrollTop: $(this).offset().top
      },
      1000
    );
  });

  /* MY IMAGE SLIDE SHOW CODE */
  var imgWidth = $(".img-view").width();
  var storedImgWidth = imgWidth; //backup the image width to be used when the window is resized.
  var imgNum = $("#image-holder > .img-div").length;
  var imgListWidth = imgWidth * imgNum;
  $("#image-holder").css({ width: imgListWidth });
  var w = 0; //left edge of the current image

  $("#right").on("click", scrollImgRight);
  $("#left").on("click", scrollImgLeft);

  /*====== ON WINDOW RESIZE ======*/
  $(window).resize(function() {
    imgWidth = $(".img-view").width();
    imgNum = $("#image-holder > .img-div").length;
    imgListWidth = imgWidth * imgNum;
    $("#image-holder").css({ width: imgListWidth });
    w = (w * imgWidth) / storedImgWidth; //adjust the value of w to match the new image size after window resize.
    storedImgWidth = imgWidth;
    scrollImgLeft();
  });

  /* FUNCTIONS TO MANUALLY OR AUTOMATICALLY SLIDE THE IMAGES LEFT OR RIGTH */
  function scrollImgLeft() {
    if (w < -5) {
      w += imgWidth;
      $("#image-holder").css({
        transform: "translate(" + w + "px, 0px)",
        transition: ".5s ease-in-out"
      });
    }
  }
  function scrollImgRight() {
    if (w > -(imgListWidth - imgWidth - 5)) {
      w -= imgWidth;
      $("#image-holder").css({
        transform: "translate(" + w + "px, 0px)",
        transition: ".5s ease-in-out"
      });
    }
  }
  function autoSlideRight() {
    if (w > -(imgListWidth - imgWidth)) {
      w -= imgWidth;
      $("#image-holder").css({
        transform: "translate(" + w + "px, 0px)",
        transition: ".5s ease-in-out"
      });
    } else {
      w = 0;
      //Yet to upgrade you
    }
  }

  /* Proficiency Level bar Coloring. For each reload, the bars takes on random colors, though the blue component of the color is constant at 100 */
  $(".skill").each(function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var level = $(this)
      .find("div.progress-level")
      .text();
    $(this)
      .find("div.progress-level")
      .css({ width: level, background: "rgb(" + r + "," + g + ",100)" });
  });

  $(".proficiency-open").on("click", function() {
    $(".proficiency-div").slideDown("slow");
    $(".overlay").fadeIn();
    $("body").addClass("no-scroll");
  });
  $(".proficiency-close").on("click", function() {
    closeProficiency();
  });
  $(".overlay").on("click", function() {
    closeProficiency();
  });

  function closeProficiency() {
    $(".proficiency-div").fadeOut("slow");
    $(".overlay").fadeOut();
    $("body").removeClass("no-scroll");
  }
}); //End of document.ready
