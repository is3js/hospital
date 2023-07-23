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
    let section2 = new Swiper(".section2-bottom > .swiper-container", {
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
                let offsetY = this.activeIndex * 30;
                $(".section2-bottom .swiper-name > span").animate({top: -offsetY}, 500);
                $(".section2-bottom .swiper-number > span").animate({top: -offsetY}, 500);
            }
        },

        /* 페이지 네이션 */
        pagination: {
            el: '.section2-bottom .swiper-pagination',
            bulletClass: 'my-bullet',// custom pagination bullet css
            bulletActiveClass: 'my-bullet-active',
        },


    });

    // scroll magic for sections
    let controller = new ScrollMagic.Controller();
    let scene = new ScrollMagic.Scene({
        triggerElement: ".trigger-section1",
        triggerHook: "onLeave",
        duration: "100%",
    });

    // section1이 section2에 먹히도록
    scene.setPin(".section1", {pushFollowers: false});
    // section1에 투명도 부여
    scene.setTween(".section1", 1, {opacity: .2})

    controller.addScene(scene);

})

