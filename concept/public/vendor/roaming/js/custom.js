(function($) {
  "use strict";
	$(document).ready(function() {
		$('#sidebarCollapse').on('click', function() {$('#sidebar').toggleClass('active'); });
		Waves.init();
		Waves.attach('.wave-effect', ['waves-button']);
		Waves.attach('.wave-effect-float', ['waves-button', 'waves-float']);
	});
	$(function() {$('.slimescroll-id').slimScroll({height: 'auto' }); });
	$(document).ready(function() {
		$("#sidebar a").each(function() {
		  var pageUrl = window.location.href.split(/[?#]/)[0];
			if (!!!(pageUrl.includes(this.href) ) ) {return;}
      $(this).addClass("active");
      $(this).parent().addClass("active"); // add active to li of the current link
      $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
      $(this).parent().parent().prev().click(); // click the item to make it drop
    });
	});

	var searchField = $('.search');
	var searchInput = $("input[type='search']");
	var checkSearch = function(){//contents
		if(searchInput.val().length !== 0){searchField.addClass('full');}
    else {searchField.removeClass('full'); }
	};

	$("input[type='search']").focus(function(){searchField.addClass('isActive');})
  .blur(function(){
		searchField.removeClass('isActive');
		checkSearch();
	});

	$(function(){
	  if (!!!($('#ms-menu-trigger')[0] ) ) {return;}
    $('body').on('click', '#ms-menu-trigger', function() {$('.ms-menu').toggleClass('toggled'); });
	});

	// ______________Full screen
	$("#fullscreen-button").on("click", function toggleFullScreen() {
    let fse_nullTest = document.fullScreenElement !== undefined && document.fullScreenElement === null
    let msfse_nullTest = document.msFullscreenElement !== undefined && document.msFullscreenElement === null
    let mzfs_nullTest = document.mozFullScreen !== undefined && !document.mozFullScreen
    let wkfs_nullTest = document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen
    
    if (fse_nullTest || msfse_nullTest || mzfs_nullTest || wkfs_nullTest) {
      let dcdce = document.documentElement;
      if (dcdce.requestFullScreen) {dcdce.requestFullScreen();}
      else if (dcdce.mozRequestFullScreen) {dcdce.mozRequestFullScreen();}
      else if (dcdce.webkitRequestFullScreen) {dcdce.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);}
      else if (dcdce.msRequestFullscreen) {dcdce.msRequestFullscreen();}
    } else {
      if (document.cancelFullScreen) {document.cancelFullScreen();}
      else if (document.mozCancelFullScreen) {document.mozCancelFullScreen();}
      else if (document.webkitCancelFullScreen) {document.webkitCancelFullScreen();}
      else if (document.msExitFullscreen) {document.msExitFullscreen();}
    }
  })
  // ______________ PAGE LOADING
	$(window).on("load", function(e) {$("#global-loader").fadeOut("slow");})

	// ______________ BACK TO TOP BUTTON
	$(window).on("scroll", function(e) {
    if ($(this).scrollTop() > 0) {$('#back-to-top').fadeIn('slow');}
    else {$('#back-to-top').fadeOut('slow');}
  });
  $("#back-to-top").on("click", function(e){
      $("html, body").animate({scrollTop: 0}, 600);
      return false;
  });

	if ($('.chart-circle').length) {
		$('.chart-circle').each(function() {
			let $this = $(this);

			$this.circleProgress({
			  fill: {color: $this.attr('data-color')},
			  size: $this.height(),
			  startAngle: -Math.PI / 4 * 2,
			  emptyFill: '#f4f5fa',
			  lineCap: 'round'
			});
		});
	}

})(jQuery);

$(function(e) {
  const DIV_CARD = 'div.card';/** Constant div card */
  $('[data-toggle="tooltip"]').tooltip();/** Initialize tooltips */
  $('[data-toggle="popover"]').popover({html: true});/** Initialize popovers */
  
  let cardTogglers = [
    {jq_obj : `[data-toggle="card-remove"]`, dfc : function(jqthis){
      let $card = $(jqthis).closest(DIV_CARD);
      $card.remove();
    } },
    {jq_obj : `[data-toggle="card-collapse"]`, dfc : function(jqthis){
      let $card = $(jqthis).closest(DIV_CARD);
      $card.toggleClass('card-collapsed');
    }},
    {jq_obj : `[data-toggle="card-fullscreen"]`, dfc : function(jqthis){
      let $card = $(jqthis).closest(DIV_CARD);
      $card.toggleClass('card-collapsed');
    }},
  ]
  for(let ct of cardTogglers){
    $(ct.jq_obj).on('click', function(e){
      ct.dfc(this)
      e.preventDefault();
      return false;
    })
  }
  //-- deprecated.d1

  $(document).on("keypress keyup blur",'input.num-only',function (event) {
      $(this).val($(this).val().replace(/[^0-9\.]/g,''));
      let evsel1 = event.which != 46 || $(this).val().indexOf('.') != -1
      let evsel2 = event.which < 48 || event.which > 57
      if (evsel1 && evsel2) {event.preventDefault();}
  });
});

function saveform(route,data) {// save form
  swal({
    title: 'Apakah Anda Yakin?',
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'Iya',
    cancelButtonText: 'Tidak',
    allowOutsideClick: false
  }).then(function(result) {
    if (!!!(result.value) ) {return;}
    swal({title:'Mohon menunggu', allowOutsideClick:false, })
    swal.showLoading()
    $.post(route, data,function(r) {
      swal({
        type: 'success',
        title: 'Data berhasil disimpan',
        showConfirmButton: false,
        timer: 1500
      })
      $('#modal').modal('hide')
      $('#list').DataTable().ajax.reload(null, false);
      $('#modal').empty()
    }, 'json').fail(function(response) {//response.responseText,
      console.log(response)
      swal('Terjadi Kesalahan!', 'Mohon Dicek Kembali', 'error')
    })
  })
}
function saverd(route,data,redirect) {// save form then redirect
  swal({
    title: 'Apakah Anda Yakin?',
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'Iya',
    cancelButtonText: 'Tidak',
    allowOutsideClick: false
  }).then(function(result) {
    if (!!!(result.value) ) {return;}
    swal({title:'Mohon menunggu', allowOutsideClick:false, })
    swal.showLoading()
    $.post(route, data,function(r) {
      swal({
        type: 'success',
        title: 'Data berhasil disimpan',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{window.location = redirect })
    }, 'json').fail(function(response) {//response.responseText,
      console.log(response)
      swal('Terjadi Kesalahan!', 'Mohon Dicek Kembali', 'error' )
    })

  })
}
function toRoman(num) {
  var result = '';
  var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
  for (var i = 0;i<=decimal.length;i++) {
    while (num%decimal[i] < num) {
      result += roman[i];
      num -= decimal[i];
    }
  }
  return result;
}

// stack modal
$(document).on('show.bs.modal', '.modal', function (event) {
	var zIndex = 1040 + (10 * $('.modal:visible').length);
	$(this).css('z-index', zIndex);
	setTimeout(function() {
		$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
	}, 0);
});
$('.modal').on('hidden.bs.modal', function (e) {
  if(!!!($('.modal').hasClass('show') ) ) {return;}
  $('body').addClass('modal-open');
});
$('#modal1').on('show.bs.modal', function (e) {$('#modal .modal-dialog').addClass('maside') });
$('#modal1').on('hidden.bs.modal', function (e) {$('#modal .modal-dialog').removeClass('maside') });


function loadshow() {
	swal({title:'Mohon menunggu', allowOutsideClick: () => !swal.isLoading() })
	swal.showLoading()
}
function loadhide() {swal.close()}

function errSwal(err){
	console.log('ERROR',err);
	swal(
		'Terjadi Kesalahan!',
		err.responseJSON.message,
		'error'
	)
}

function ajaxPost(url,data,tkn,callback) {
	$.ajax({type:"POST", dataType:"json",
		url:url, data:data,
		headers: {"token":tkn},

		success:(R)=>{callback(R);},
		error:(err)=>{errSwal(err)}
	});
}
function ajaxLoad(url,data,tkn,callback){
	$.ajax({type:"POST",
		url:url, data:data,
		headers: {"token":tkn},
		success:(R)=>{callback(R);},
	});


}
function loadshow_customText(text = ''){//exact style
	swal({title: text, allowOutsideClick: () => !swal.isLoading() })
	swal.showLoading()
}


let deprecated = {
  d1 : {
    // $('[data-toggle="card-remove"]').on('click', function(e) {/** Function for remove card */
    //     let $card = $(this).closest(DIV_CARD);
    //     $card.remove();
    //     e.preventDefault();
    //     return false;
    // });
    // $('[data-toggle="card-collapse"]').on('click', function(e) {/** Function for collapse card */
    //     let $card = $(this).closest(DIV_CARD);
    //     $card.toggleClass('card-collapsed');
    //     e.preventDefault();
    //     return false;
    // });
    // $('[data-toggle="card-fullscreen"]').on('click', function(e) {
    //     let $card = $(this).closest(DIV_CARD);
    //     $card.toggleClass('card-fullscreen').removeClass('card-collapsed');
    //     e.preventDefault();
    //     return false;
    // });
  },
  const__loader4 : `<div class="spinner4">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>`//<< the fuck is this?
}