$(function () {

    /* 햄버거 버튼 토글 */
    $(".navbar-toggler").click(function () {
        $(this).toggleClass("on")
    });

    /* 로그인 버튼 - PC용 hover */
    $(".login").hover(function () {
        $(this).addClass("on")
    }, function () {
        $(this).removeClass("on")
    });
    // 로그인 버튼 - 모바일용 click 이벤트
    $(".login").on("click", function () {
        $(this).toggleClass("on");
    });


    /* header fixed만큼 offsetY scroll */
    /* 2. 숨길 top, middle의 높이를 구함 */
    let $headerTop = $(".header-top");
    let $headerBottom = $(".header-bottom");
    let headerHeight = $headerTop.height() + $headerBottom.height()

    let $headerMiddle = $(".header-middle");

    $(window).scroll(function () {
        /* 1. (body태그 스크롤 내려간 높이 + ) html전체태그의 스크롤 내려간 높이(top에서부터 얼마) */
        /* - 현재 body는 html에 붙어있으므로 스크롤이 없어서, 항상 0이고 */
        /* - html의 scrollTop은 fixed된 header를 제외하고 스크롤 움직일시 내릴시, top에서부터의 높이가 나온다*/
        let offsetY = $("body").scrollTop() + $("html").scrollTop();
        // console.log(offsetY)

        /* 3. offsetY이 숨겨야할 2 header의 높이보다 더 내려가면, 진짜 숨김*/
        /* - 그게 아니라면 계속 보여야함(내려갔다 올 떄 )*/
        if (offsetY >= headerHeight) {
            // $headerTop.hide();
            $headerTop.removeClass("d-lg-block");
            // $headerBottom.hide();
            $headerBottom.removeClass("d-flex");
            $headerBottom.hide();

            // hover 효과 주기(배경색 변경 + 글자색)
            $headerMiddle.addClass("on")
        } else {
            $headerTop.addClass("d-lg-block");
            // $headerBottom.show();
            $headerBottom.addClass("d-flex");
            $headerBottom.show();

            $headerMiddle.removeClass("on")
        }
    })

    // mega-dropdown hover 이벤트
    $(".mega-dropdown").hover(
        function () {
            if ($(window).width() >= 992) {
                var toggleElement = $('a[data-bs-toggle="dropdown"]', this);
                var dropdownMenu = $('.dropdown-menu', this);

                toggleElement.attr('data-bs-toggle', '');

                // dropdownMenu.addClass('show');
                dropdownMenu.stop(true, true).slideDown(222);
                dropdownMenu.attr('data-bs-popper', 'static');
                dropdownMenu.attr("aria-expanded", "true");
            }
        },
        function () {
            if ($(window).width() >= 992) {
                var toggleElement = $('a[data-bs-toggle="dropdown"]', this);
                var dropdownMenu = $('.dropdown-menu', this);

                // dropdownMenu.removeClass('show');
                dropdownMenu.stop(true, true).slideUp(150);
                dropdownMenu.attr('data-bs-popper', '');
                dropdownMenu.attr("aria-expanded", "false");

                toggleElement.attr('data-bs-toggle', 'dropdown');
            }
        }
    );

    // 모바일로 크기변경시, dropdown-menu의 style을 제거해야 제대로 작동한다.
    // - 추가로 hover 마침작동이 안돼, data-bs-toggle이 사라진 상태라면, 다시 넣어준다.
    $(window).on('resize', function () {
        if ($(window).width() < 992) {
            // $(".mega-dropdown").removeClass('show');
            // 필수.. 이게 없어야 mobile 복귀시 작동한다
            $(".mega-dropdown .dropdown-menu").removeAttr('style');
            $(".mega-dropdown a").attr('data-bs-toggle', 'dropdown');


        }
    });

    // header-middle hover시
    $(".header-middle").hover(function () {
        $(this).addClass("on");
    }, function () {
        $(this).removeClass("on");
    });

    // splidejs for left-banner
    var splide;
    // window.document.addEventListener('DOMContentLoaded', () => {
    splide = new Splide('#leftBanner', {
        // vertical
        arrows: false,
        direction: 'ttb', // 슬라이드방향 -> height or heightRatio필수
        // heightRatio: .25, // direction 바뀔 때 height or heightRatio필수
        height: 60, // header content 높이 + pagination 위치도 결정됨.
        paginationDirection: 'ttb', // 페지네이션 방향
        // pagination: false,
        // 기본설정 'loop' 무한반복, 'slide' 1회석
        type: 'loop',
        perPage: 1,
        perMove: 1,
        start: 0,
        wheel: true,
        autoplay: true,
        interval: 4000,
        // speed: 100,
        breakpoints: {
            // 992(lg) 미만
            991: {
                height: 45,
            },
            //
            550: {
                height: 40,
            },
        },
    }).mount();

    // });

    // swiper js for section2-bottom
    let section2Swiper = new Swiper(".section2-bottom > .swiper-container", {
        /* 실행옵션 */
        autoplay: {
            delay: 3000,
        },

        /* 애니메이션 및 같이 움직이는 name + number */
        on: {
            init: function () { //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(this); //隐藏动画元素
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function () {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                // console.log(this.activeIndex)
                // let offsetY = this.activeIndex * 30;
                // $(".section2-bottom .swiper-name > span").animate({top: -offsetY}, 500);
                // $(".section2-bottom .swiper-number > span").animate({top: -offsetY}, 500);
                let fontLineHeightVw = 3.3;
                let offsetY = this.activeIndex * fontLineHeightVw;
                $(".section2-bottom .swiper-name > span").animate({top: -offsetY + "vw"}, 500);
                $(".section2-bottom .swiper-number > span").animate({top: -offsetY + "vw"}, 500);
            }
        },

        /* 페이지 네이션 */
        pagination: {
            el: '.section2-bottom .swiper-pagination',
            bulletClass: 'my-bullet',// custom pagination bullet css
            bulletActiveClass: 'my-bullet-active',
        },
    });

    // - 일단 정지(scrollmagic에서 화면에 오면 시작 처리)
    section2Swiper.autoplay.stop();
    // - 자동재생 추가옵션: 마우스 올릴 때 일시중지 / 떼면 시작
    section2Swiper.el.onmouseover = function () {
        section2Swiper.autoplay.stop();
    }
    section2Swiper.el.onmouseout = function () {
        section2Swiper.autoplay.start();
    }

    // ScrollMagic
    let controller = new ScrollMagic.Controller();

    // section1 with TweenMax
    let scene = new ScrollMagic.Scene({
        // triggerElement: ".trigger-section1",
        triggerElement: ".section1",
        triggerHook: "onLeave",
        // duration: "100%",
        duration: "45%", // 모바일 고려해서 section1 duration
    });
    // section1이 section2에 먹히도록
    scene.setPin(".section1", {pushFollowers: false});
    // section1에 투명도 부여
    scene.setTween(".section1", 1, {opacity: .2})
    controller.addScene(scene);

    // section2 - top with Velocity
    let scene2 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section2",
        // triggerHook: "onEnter",
        triggerHook: "onCenter",
        //duration: "100%", // velocity조합에서는 뺀다.
    });
    // title velocity 설정
    scene2.setVelocity([ ".section2-top>div", ".section2-top>div>p"], {
        top: "0px",
        opacity: "1"
    }, {
        duration: "300",
    });
    controller.addScene(scene2);


    // section2 - middle with TimelineMax
    let scene3 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section2",
        triggerHook: "onLeave",
        offset: $(".section2-top").height() + 30,
        // duration: "100%"
        duration: "100%"
    });

    // scene3.setPin(".section2", {pushFollowers: false}) // 애니 시작시, pin된 현재section의 아래section(3)도 동시에 위로 드래그되어버림
    scene3.setPin(".section2") // 애니시작시, duration동안, pin 아래 section(3)가 안올라가도록 pushFollowers 취소

    let tm = new TimelineMax();
    tm.add([
        new TweenMax(".middle-left", 1, {
            transform: "translateX(-100%)",
            opacity: 0
        }),
        new TweenMax(".middle-right", 1, {
            transform: "translateX(100%)",
            opacity: 0
        }),
        new TweenMax(".middle-text", 1, {
            opacity: 1,
            delay: .2,
        }),
    ]);
    tm.add(
        new TweenMax(".middle-center", 1, {
            opacity: 1,
        }),
    )
    scene3.setTween(tm);

    controller.addScene(scene3);

    // section4 - bottom swiper
    let scene4 = new ScrollMagic.Scene({
        triggerElement: ".section2-bottom",
        triggerHook: "onCenter",
    });
    // scene4가 시작되면, 일시중지된 swiper 시작
    scene4.on("start", function (event) {
        // console.log("swiper 시작")
        // section2Swiper.autoplay.start();
        // 추가) 내리는 스크롤("FORWARD")인지 아닌지 판단해서 play/stop
        if (event.scrollDirection === "FORWARD") {
            // console.log("내림")
            section2Swiper.autoplay.start();
        } else {
            // console.log("올림")
            section2Swiper.autoplay.stop();
        }
    });

    controller.addScene(scene4);

    // section2 - bottom  title with Velocity
    let scene5 = new ScrollMagic.Scene({
        triggerElement: ".section2-bottom",
        triggerHook: "onEnter",
        //duration: "100%", // velocity조합에서는 뺀다.
    });
    scene5.setVelocity([".section2-bottom > .section-title > div"], {
        top: "0px",
        opacity: "1"
    }, {
        duration: "300",
    });
    controller.addScene(scene5);

    // 예약하기
    let scene6 = new ScrollMagic.Scene({
        triggerElement: ".booking-service-mobile",
        triggerHook: "onEnter",
        offset: 50,
    });
    scene6.setVelocity([".booking-service-mobile"], {
        top: "0px",
        opacity: "1"
    }, {
        duration: "300",
    });
    controller.addScene(scene6);



    // section1 swiper
    let titles = ["드리는 말", "자가진단 프로그램", "7월 한방성형 이벤트"];
    var section1Swiper = new Swiper('.section1 > .swiper-container', {
        pagination: {
            el: '.section1  .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + '" >' + titles[index] + '</div>';
            },
        },
        scrollbar: {
            el: '.section1 .swiper-scrollbar',
            // hide: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });


    // booking service tab
    let tabIndex = 0;
    let namePostFix = '';

    // 첫번째 tab을 제외하고 hide
    $(".booking-service-content > div").eq(tabIndex).show().siblings().hide();

    // 예약 tab 설정
    $(".booking-service-tab > li > a").on('click', function () {
        // 1) a의 index는 무조건 0이다. 형제 없음. -> parent인 li의 index를 파악해야한다.
        let currentTabLi = $(this).parent();
        // let currentIndex = currentTabLi.index();
        tabIndex = currentTabLi.index();
        namePostFix = tabIndex > 0 ? '_' + tabIndex : '';
        // let currentContentDiv = $(".booking-service-content > div").eq(currentIndex);
        let currentContentDiv = $(".booking-service-content > div").eq(tabIndex);

        // 탭 클릭시 form요소들 초기화
        $('.btn-select').text('클리닉 선택'); // custom select btn의 텍스트 초기화
        $('input[name=GET_ClinicCode' + namePostFix + ']').val(""); // custom select hidden input value 초기화

        $('input[name="GET_FirstYN' + namePostFix + '"]').prop('checked', false); // radio checked 제거

        $('select[name="GET_ConsultTime' + namePostFix +'"]').prop('selectedIndex', 0); // select태그 0번째요소로 초기화

        $('input[name="GET_Name' + namePostFix + '"]').val('');
        $('input[name="GET_Tel' + namePostFix + '"]').val('');

        $('.validate').text(''); // 검증 텍스트 초기화


        // 2) li에 ".on" 추가, 나머지 삭제
        currentTabLi.addClass("on").siblings().removeClass("on");

        // 3) li의 index로, .eq(index)에 해당하는 content의 div를 show시킨다.
        currentContentDiv.show().siblings().hide();
    })


    // 1) 클리닉 select btn -> wrapper .open toggle
    $('.select-clinic-wrapper .btn-select').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    // 2) 클리닉 select dropdown ul > li.active > a태그.clinic_code 클릭 -> 5가지 동작
    $('.select-clinic-wrapper .clinic_code').on('click', function () {
        let currentParent = $(this).parent(); /* li.active[value=] */
        let currentClinicText = $(this).text(); /* a.clinic_code*/
        // 1. 셀렉트 버튼의 텍스트변경
        $('.btn-select').text(currentClinicText);

        // 2. li태그의 value="" -> hidden input으로 입력
        // $('input[name=GET_ClinicCode]').val(currentParent.val()); // tab 1 hidden input
        $('input[name=GET_ClinicCode' + namePostFix + ']').val(currentParent.val()); // tab 1 hidden input

        // 3. 모든 a태그의부모인 li태그에 .active 삭제 후, 현재 li에만 active 추가
        // $('.select-clinic-wrapper .clinic_code').parent().removeClass('active');  // 모든 li에 .active 삭제
        // currentParent.toggleClass('active');            // 현재 li에만 .active 추가
        currentParent.addClass('active').siblings().removeClass('active');

        // 4. 마지막으로 wrapper의 .open 삭제하여 닫기
        $('.select-clinic-wrapper').removeClass('open');
    });

    // 예약 버튼 with valdiate
    $('.reserve').on('click', function () {

        // 1) 클리닉 선택 검증 by hidden input
        if ($('input[name="GET_ClinicCode' + namePostFix + '"]').val() == '') {
            $(".validate").text("클리닉을 선택해주세요.");
            return false;
        }
        // 2) 초/재진 radio checked 검증
        if ($('input[name="GET_FirstYN' + namePostFix + '"]').is(':checked') == false) {
            $(".validate").text("초진, 재진여부를 체크해주세요.");
            return false;
        }
        // 5) 상담시간 검증
        if ($('select[name="GET_ConsultTime' + namePostFix +'"]').val() === "") {
            $(".validate").text("상담 시간을 선택해주세요.");
            return false;
        }
        // 3) 이름 검증
        if ($('input[name="GET_Name' + namePostFix + '"]').val().length < 2) {
            $(".validate").text("이름을 입력해주세요.");
            return false;
        }
        // 4) 전화번호 검증 ( 번호최소 9글자 + 하이픈 1~3개)
        if ($('input[name="GET_Tel' + namePostFix + '"]').val().length < 10) {
            $(".validate").text("연락처를 입력해주세요.");
            return false;
        }

    });



})

