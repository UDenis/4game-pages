$(function() {

	$('.pL2Ertheia_bPlanets').delay(300).fadeIn(300).addClass('pL2Ertheia_bPlanets_mStart');

	/* --------------- [ Modal Window ]  ---------- */

	// --- Main Setup

	// close
	$('.pL2Ertheia_bModalDialog__eCloseBtn').on('click', function() {
		$('.pL2Ertheia_bOverlay').fadeOut(400);
		$('.pL2Ertheia_bPlanets').removeClass('pL2Ertheia_bPlanets_mOpened');
		$('.pL2Ertheia_bModalDialog__eContainer').hide(0);
		$('.pL2Ertheia_bModalDialog__eContainerGlow').hide(0);
		$('.pL2Ertheia_bModalDialog__eContent > div').hide(0);
		$('.pL2Ertheia_bPlanets__ePlanet').removeClass('active');
		$('.pL2Ertheia_bVideoPopup .bTabField img.active').removeClass('active');
	});
	// open
	$('.pL2Ertheia_bPlanets__ePlanet').on('click', function() {
		var activePlanet__Index = $(this).index();
		if ($('.pL2Ertheia_bPlanets').hasClass('pL2Ertheia_bPlanets_mOpened')) {
			if ($(this).hasClass('active') === false) {
				$(this).addClass('active');
				$(this).addClass('active').siblings().removeClass('active');
				$('.pL2Ertheia_bModalDialog__eContent > div').stop(true, true).hide(0).eq(activePlanet__Index).fadeIn(500);
				if ($(this).hasClass('pL2Ertheia_bPlanets__ePlanet_mVideo')) {
					$('.pL2Ertheia_bVideoPopup .pL2Ertheia_bTabFieldPopup img:eq(0)').click();
				} else {
					$('.pL2Ertheia_bVideoPopup .pL2Ertheia_bTabFieldPopup img.active').removeClass('active');
				}
			}
		} else {
			$('.pL2Ertheia_bOverlay').show(0, function() {
				$('.pL2Ertheia_bModalDialog__eContainer').delay(1300).fadeIn(400, function() {
					$('.pL2Ertheia_bModalDialog__eContent > div').eq(activePlanet__Index).fadeIn(300);
				});
				$('.pL2Ertheia_bModalDialog__eContainerGlow').delay(1600).fadeIn(400);
			});

		}
		$(this).addClass('active');
	});

	// --- Inner

	// Location
	$('.pL2Ertheia_bLocationPopup .pL2Ertheia_bTabFieldPopup img').on('click', function() {
		if ($(this).hasClass('active') == false) {
			var srcBigPic = $(this).attr('data-src');
			$('.pL2Ertheia_bLocationPopup__ePopupBigContainerPick').attr({
				data: srcBigPic
			});
			$('.pL2Ertheia_bFlashCurrent').attr({
				value: srcBigPic
			});
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	// Video
	$('.pL2Ertheia_bVideoPopup .pL2Ertheia_bTabFieldPopup img').on('click', function() {
		if ($(this).hasClass('active') == false) {
			var srcBigVideo = $(this).attr('data-src');
			$('.pL2Ertheia_bVideoPopup__ePopupBigContainerVideo iframe').attr({
				src: srcBigVideo
			});
			$(this).addClass('active').siblings().removeClass('active');
		}
	});



	$('.pL2Ertheia_bPlanets__ePlanet').on('mouseover', function() {
		if ($('.pL2Ertheia_bPlanets').hasClass('pL2Ertheia_bPlanets_mOpened') == false) {
			$('.pL2Ertheia_bPlanets').addClass('pL2Ertheia_bPlanets_mPause');
			if ($(this).hasClass('pL2Ertheia_bPlanets__ePlanet_mClasses')) {
				$('.pL2Ertheia_bPersonages').addClass('pL2Ertheia_bPersonages_mHoverEffect');
			} else if ($(this).hasClass('pL2Ertheia_bPlanets__ePlanet_mAlchemy')) {
				$('.pL2Ertheia_bAlchemyAction').addClass('pL2Ertheia_bAlchemyAction_mStart');
			} else if ($(this).hasClass('pL2Ertheia_bPlanets__ePlanet_mVideo')) {
				$('.pL2Ertheia_bPersonage1').addClass('pL2Ertheia_bPersonage1_mHoverEffect');
			} else if ($(this).hasClass('pL2Ertheia_bPlanets__ePlanet_mLocation')) {
				$('.pL2Ertheia_bMainContent__eBackground').addClass('pL2Ertheia_bMainContent__eBackground_mHoverEffect');
			}
		}
	});
	$('.pL2Ertheia_bPlanets__ePlanet').on('mouseout', function() {
		$('.pL2Ertheia_bPlanets').removeClass('pL2Ertheia_bPlanets_mPause');
		$('.pL2Ertheia_bMainContent__eBackground').removeClass('pL2Ertheia_bMainContent__eBackground_mHoverEffect');
		$('.pL2Ertheia_bPersonages').removeClass('pL2Ertheia_bPersonages_mHoverEffect');
		$('.pL2Ertheia_bPersonage1').removeClass('pL2Ertheia_bPersonage1_mHoverEffect');
		$('.pL2Ertheia_bAlchemyAction').removeClass('pL2Ertheia_bAlchemyAction_mStart');
	});

	$('.pL2Ertheia_bPlanets')
		.on('mouseover', function() {
			$(this).find('.pL2Ertheia_bPlanets__ePlanet').each(function() {
				var transformPlanet = $(this).css('transform');
				$(this).css('transform', transformPlanet);
			});
		});
	$('.pL2Ertheia_bPlanets__ePlanet').on('click', function() {
		$('.pL2Ertheia_bPlanets__ePlanet').css('animation', 'none');
		setTimeout(function() {
			if ($('.pL2Ertheia_bPlanets').hasClass('pL2Ertheia_bPlanets_mOpened') == false) {
				$('.pL2Ertheia_bPlanets').addClass('pL2Ertheia_bPlanets_mOpened');
			}
		}, 100);
		setTimeout(function() {
			$('.pL2Ertheia_bPlanets').addClass('bg-active-show');
		}, 1500);
	});

	$('.pL2Ertheia_bModalDialog__eCloseBtn').on('click', function() {
		$('.pL2Ertheia_bPlanets__ePlanet').css({
			transform: '',
			animation: 'orbit 20s linear infinite'
		});
		$('.pL2Ertheia_bPlanets').removeClass('bg-active-show');
	});
});
