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
        duration: "80%",
        // duration: "45%", // 모바일 고려해서 section1 duration
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
    scene2.setVelocity([".section2-top>div", ".section2-top>div>p"], {
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
        // triggerElement: ".section2",
        // triggerHook: "onEnter",
        offset: $(".section2-top").height() - 100,
        // duration: "100%"
        duration: "100%"
    });

    // scene3.setPin(".section2", {pushFollowers: false}) // 애니 시작시, pin된 현재section의 아래section(3)도 동시에 위로 드래그되어버림
    scene3.setPin(".section2") // 애니시작시, duration동안, pin 아래 section(3)가 안올라가도록 pushFollowers 취소

    let tm = new TimelineMax();
    tm.add([
        new TweenMax(".middle-left", 1, {
            // transform: "translateX(-100%)",
            transform: "translateX(-50%)",
            opacity: 0
        }),
        new TweenMax(".middle-right", 1, {
            // transform: "translateX(100%)",
            transform: "translateX(50%)",
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
        // triggerHook: "onEnter",
        offset: 50, // 안주면 너무 빨리 뜬다.
        triggerHook: "onCenter",
        //duration: "100%", // velocity조합에서는 뺀다.
    });
    scene5.setVelocity([".section2-bottom > .section-title > div"], {
        top: "0px",
        opacity: "1"
    }, {
        duration: "300",
    });
    controller.addScene(scene5);

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

    // - 첫번째 tab을 제외하고 hide
    $(".booking-service-content > div").eq(tabIndex).show().siblings().hide();
    // - 모바일
    $(".booking-service-content-mobile > div").eq(tabIndex).show().siblings().hide();

    // - 예약 tab 설정
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

        $('select[name="GET_ConsultTime' + namePostFix + '"]').prop('selectedIndex', 0); // select태그 0번째요소로 초기화

        $('input[name="GET_Name' + namePostFix + '"]').val('');
        $('input[name="GET_Tel' + namePostFix + '"]').val('');

        $('.validate').text(''); // 검증 텍스트 초기화


        // 2) li에 ".on" 추가, 나머지 삭제
        currentTabLi.addClass("on").siblings().removeClass("on");

        // 3) li의 index로, .eq(index)에 해당하는 content의 div를 show시킨다.
        currentContentDiv.show().siblings().hide();
    })

    // - 모바일 예약tab 설정
    $(".booking-service-tab-mobile > li > a").on('click', function () {
        // 1) a의 index는 무조건 0이다. 형제 없음. -> parent인 li의 index를 파악해야한다.
        let currentTabLi = $(this).parent();
        // let currentIndex = currentTabLi.index();
        tabIndex = currentTabLi.index();
        namePostFix = tabIndex > 0 ? '_' + tabIndex : '';
        // let currentContentDiv = $(".booking-service-content > div").eq(currentIndex);
        let currentContentDiv = $(".booking-service-content-mobile > div").eq(tabIndex);

        // 탭 클릭시 form요소들 초기화
        $('.btn-select-mobile').text('클리닉 선택'); // custom select btn의 텍스트 초기화
        $('input[name=GET_ClinicCode' + namePostFix + ']').val(""); // custom select hidden input value 초기화

        $('input[name="GET_FirstYN' + namePostFix + '"]').prop('checked', false); // radio checked 제거

        $('select[name="GET_ConsultTime' + namePostFix + '"]').prop('selectedIndex', 0); // select태그 0번째요소로 초기화

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
    // - 모바일
    $('.select-clinic-wrapper .btn-select-mobile').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    // 2) 클리닉 select dropdown ul > li.active > a태그.clinic_code 클릭 -> 5가지 동작
    $('.select-clinic-wrapper .clinic_code').on('click', function () {
        let currentParent = $(this).parent(); /* li.active[value=] */
        let currentClinicText = $(this).text(); /* a.clinic_code*/
        // 1. 셀렉트 버튼의 텍스트변경
        $('.btn-select:visible').text(currentClinicText);
        // - 모바일
        $('.btn-select-mobile:visible').text(currentClinicText);

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
        if ($('input[name="GET_ClinicCode' + namePostFix + '"]:visible').val() == '') {
            $(".validate").text("클리닉을 선택해주세요.");
            return false;
        }
        // 2) 초/재진 radio checked 검증
        if ($('input[name="GET_FirstYN' + namePostFix + '"]:visible').is(':checked') == false) {
            $(".validate").text("초진, 재진여부를 체크해주세요.");
            return false;
        }

        // 5) 상담시간 검증
        if ($('select[name="GET_ConsultTime' + namePostFix + '"]:visible').val() === "") {
            $(".validate").text("상담 시간을 선택해주세요.");
            return false;
        }
        // 3) 이름 검증
        if ($('input[name="GET_Name' + namePostFix + '"]:visible').val().length < 2) {
            $(".validate").text("이름을 입력해주세요.");
            return false;
        }
        // 4) 전화번호 검증 ( 번호최소 9글자 + 하이픈 1~3개)
        if ($('input[name="GET_Tel' + namePostFix + '"]:visible').val().length < 10) {
            $(".validate:visible").text("연락처를 입력해주세요.");
            return false;
        }

        // 검증다통과시 .validate 텍스트 돌려놓기
        $(".validate:visible").text("");


    });

    // section3 건강채널 - title with Velocity
    let scene6 = new ScrollMagic.Scene({
        triggerElement: ".section3",
        // triggerHook: "onEnter",
        triggerHook: "onCenter",
        offset: -80,
    });
    scene6.setVelocity([".section3 > .section-title > div"], {
        top: "0px",
        opacity: "1"
    }, {
        duration: "300",
    });
    controller.addScene(scene6);


    /* section3 건강채널 swiper */
    function initSection3Swiper(tabContentId, tabIndex) {
        // new Swiper($('.section3').find('.swiper-container').eq(tabIndex), {
        let currentTabContent = $(tabContentId);

        new Swiper(currentTabContent.find('.swiper-container').eq(tabIndex), {
            slidesPerView: 3.5,
            slidesPerGroup: 3.5,
            spaceBetween: '3%',
            breakpoints: {
                991: {
                    slidesPerView: 1.5,
                    slidesPerGroup: 1.5,
                    spaceBetween: '25%'
                },
                1440: {
                    slidesPerView: 2.5,
                    slidesPerGroup: 2.5,
                    spaceBetween: '20%',
                }

            },

            on: {
                // 시작시 preview 수보다, 주어진 slide의 갯수가 더 적으면, 잘린가로선을 hide시킨다.
                init: function () {
                    if (this.slides.length <= this.params.slidesPerView + .5) {
                        // $('.section3').find('.tab-pane').eq(tabIndex).addClass('hide-before');
                        currentTabContent.find('.tab-pane').eq(tabIndex).addClass('hide-before');
                    }
                },

                slideChangeTransitionStart: function () {
                    // var previewLength = this.params.slidesPerView * this.width;

                    if (this.isEnd || this.slides.length - .5 === this.activeIndex + this.params.slidesPerView) {
                        // 잘린 세로선 띄우기
                        // $('.section3 .tab-pane').addClass('hide-before');
                        // $('.section3').find('.tab-pane').eq(tabIndex).addClass('hide-before');
                        currentTabContent.find('.tab-pane').eq(tabIndex).addClass('hide-before');
                        // this.navigation.$nextEl.css('display', 'none');
                    } else {
                        // 잘린 세로선 삭제
                        // $('.section3 .tab-pane').removeClass('hide-before');
                        // $('.section3').find('.tab-pane').eq(tabIndex).removeClass('hide-before');
                        currentTabContent.find('.tab-pane').eq(tabIndex).removeClass('hide-before');
                        // this.navigation.$nextEl.css('display', 'block');
                    }
                },
            }

        });
    }

    // initSection3Swiper(0);
    initSection3Swiper('#youtube-tab-content', 0);
    initSection3Swiper('#blog-tab-content', 0);

    // section3 tab 클릭시 index 찾기 -> 해당index의 swiper 초기화
    // - section3안에 youtube/blog tab자체가 2개라서 시작지를 추가
    $('.section3 a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {

        var targetTabHref = $(e.target).attr('href');
        var targetPanel = $(targetTabHref)

        // var AllPanels = $('.section3 .tab-content').find('.tab-pane');
        var targetTabUlId = $(e.target).parent().parent().attr("id"); // youtube-tabs or blog-tabs
        var targetTabContentId = '#' + targetTabUlId + '-content'; //#blog-tabs-content #youtube-tabs-content

        var AllPanels = $(targetTabContentId).find('.tab-pane');
        var index = AllPanels.index(targetPanel);

        initSection3Swiper(targetTabContentId, index);
    });

    // sec2-mid2 치료후기 swiper
    function initReviewSwiper(tabIndex) {

        new Swiper($('.section2-middle2').find('.swiper-container').eq(tabIndex), {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: '3%',
            breakpoints: {
                991: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: '5%'
                },
            },

            pagination: {
                // el: '.section2-middle2  .swiper-pagination',
                el: $('.section2-middle2').find('.swiper-pagination').eq(tabIndex),
                bulletClass: 'review-bullet',// 적용될 bullet css class명 지정하기
                bulletActiveClass: 'review-bullet-active',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + ' fs-tab">' + (index + 1) + '</span>';
                },
            },
            grabCursor: true,
            navigation: {
                // nextEl: '.section2-middle2 .swiper-button-next',
                // prevEl: '.section2-middle2 .swiper-button-prev',
                nextEl: $('.section2-middle2').find('.swiper-button-next').eq(tabIndex),
                prevEl: $('.section2-middle2').find('.swiper-button-prev').eq(tabIndex),
            },
            on: {
                init: function () {
                    // activeIndex === 0 (첫번째)일때, 직접 찾아서 prevEl hide
                    // - init에서는 this.navigation.$prevEl 등이 안찾아짐.
                    if (this.activeIndex === 0) {
                        // $('.section2-middle2 .swiper-button-prev').hide();
                        $('.section2-middle2').find('.swiper-button-prev').eq(tabIndex).hide();
                    }
                    // 1page만 존재할 시, 둘다안보이기
                    if (this.slides.length < 2) {
                        // $('.section2-middle2 .swiper-button-prev').hide();
                        // $('.section2-middle2 .swiper-button-next').hide();
                        $('.section2-middle2').find('.swiper-button-prev').eq(tabIndex).hide();
                        $('.section2-middle2').find('.swiper-button-next').eq(tabIndex).hide();
                    }

                },
                // swiper 초기화시 기존 pagination 버그때문에, 업데이트 안되는 버그 해결
                slideChange: function () {
                    this.pagination.render();
                    this.pagination.update();
                },
                slideChangeTransitionStart: function () {
                    // 끝에서 next버튼 가리기
                    if (this.isEnd) {
                        this.navigation.$nextEl.css('display', 'none');
                    } else {
                        this.navigation.$nextEl.css('display', 'block');
                    }

                    // 처음시 prev버튼 가리기
                    if (this.activeIndex === 0) {
                        this.navigation.$prevEl.css('display', 'none');
                    } else {
                        this.navigation.$prevEl.css('display', 'block');
                    }
                },
            }
        });
    }

    initReviewSwiper(0);

    // section2-middle2 치료후기 tab 클릭시 index 찾기 -> 해당index의 swiper 초기화
    $('.section2-middle2 a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var targetTabHref = $(e.target).attr('href');
        var targetPanel = $(targetTabHref)
        var AllPanels = $('.section2-middle2 .tab-content').find('.tab-pane');

        var index = AllPanels.index(targetPanel);

        initReviewSwiper(index);
    });


    // tab draggable
    // // - 1) ul의 부모공간(scroll 공간)을 먼저 따로 찾고,
    // var $tabScroll = $(".tab-scroll");
    // // - 2) 내부 tab의 ul태그를 찾은 뒤
    // var $tabTarget = $tabScroll.find("ul");
    // // - 3) Draggable.create 해주되, bounds 옵션에 부모공간 변수를 넣어준다.
    // new Draggable.create($tabTarget, {
    //     type: "x",
    //     bounds: $tabScroll,
    //     throwProps: true,
    //     onClick: function (e) {
    //     },
    //     onDragEnd: function () {
    //         // console.log("drag ended");
    //     }
    // });
    // 5) .tab-scroll이 여러개인 경우를 대비해서, 아래와 같이 each -> 내부 this로 처리
    $(".tab-scroll").each(function () {
        var $tabScroll = $(this);
        var $tabTarget = $tabScroll.find("ul");
        new Draggable.create($tabTarget, {
            type: "x",
            bounds: $tabScroll,
            throwProps: true,
            onClick: function (e) {
            },
            onDragEnd: function () {
                // console.log("drag ended");
            }
        });



        // - 4) tab에서 클릭되는 a들을 find로 찾은 뒤. click 리스너를 걸어서, 중간/우측가장자리에 있을 때 이동시켜준다.
        var scrollInnerWidth = $tabScroll.width();
        var targetOuterWidth = $tabTarget.outerWidth();

        $tabTarget.find("a").on("click", function (event) {
            var offsetLeft = $(this).offset().left;
            var aOuterWidth = $(this).outerWidth();
            var eventPoint = offsetLeft - aOuterWidth / 2;
            var textEndPoint = offsetLeft + aOuterWidth / 2;


            if ((scrollInnerWidth > targetOuterWidth) || scrollInnerWidth / 2 > textEndPoint) {
                // 왼쪽 가장자리
            } else if ((scrollInnerWidth < targetOuterWidth) && (targetOuterWidth - scrollInnerWidth / 2 < eventPoint)) {
                // 오른쪽 가장자리
                new TweenMax.to($tabTarget, .1, {x: -(targetOuterWidth - scrollInnerWidth)});
            } else {
                // 중간 자리
                new TweenMax.to($tabTarget, .1, {x: -((offsetLeft - scrollInnerWidth / 2))});
            }
        });
    })



    // section4 건강채널 - title with Velocity
    let scene7 = new ScrollMagic.Scene({
        triggerElement: ".section4",
        // triggerHook: "onCenter",
        triggerHook: "onEnter",
        offset: -80,
    });
    scene7.setVelocity([".section4 > .section-title > div"], {
        top: "0px",
        opacity: "1"
    }, {
        duration: "300",
    });
    controller.addScene(scene7);


    /* dx 진단 swiper */
    let $dxFirstBtn = $('.dx-box #step-first');
    let $dxNextBtn = $(".dx-box #step-next");
    let $dxResultBtn = $(".dx-box #step-result");

    let dxSwiper = new Swiper(".dx-box .swiper-container", {
        spaceBetween: 5, // 다음 slide의 before가 삐져나와서
        pagination: {
            el: '.dx-box .swiper-pagination',
            type: 'custom',
            clickable: true,
            renderCustom: function (swiper, current, total) {
                return '<span class="fs-tab fw-bold">' + current + ' / ' + total + ' 페이지</span>';
            },
        },
        on: {
            slideChangeTransitionStart: function () {
                if (this.isEnd) {
                    $dxNextBtn.css('display', 'none');
                    $dxResultBtn.css('display', 'block');
                } else {
                    $dxNextBtn.css('display', 'block');
                    $dxResultBtn.css('display', 'none');
                }
            }
        }
    });

    $dxFirstBtn.on('click', function() {
        dxSwiper.slideTo(0);
    });

    $dxNextBtn.on('click', function (e) {
        dxSwiper.slideNext();
    })

    function isInputChecked(oField) {
        var checked = false;

        if (typeof(oField.length) != 'undefined') {
            for (var i=0; i<oField.length; i++)
                if (oField[i].checked)
                    checked = true;
        } else {
            checked = oField.checked;
        }
        return checked;
    }

    $dxResultBtn.on('click', function (e) {
        // 성별/연령대
        var dx = document.dx;
        // console.log(eval("document.dx.kodi1"));
        // input#kodi1-1.blind
        // input#kodi1-2.blind
        // input#kodi1-3.blind
        // input#kodi1-4.blind
        // input#kodi1-5.blind
        // input#kodi1-6.blind
        // length : 6
        // value : ""

        if (!isInputChecked(eval("document.dx.kodi2"))) {
            alert('2번 문항이 체크되지 않았습니다.')
            console.log($(eval("document.dx.kodi2")[0]));
            console.log($("input[name='kodi2']"));
            // $(eval("document.dx.kodi1")[0]).parent().focus();

            var swiperSlideIndex = $(eval("document.dx.kodi2")[0]).closest('.swiper-slide').index();
            console.log(swiperSlideIndex);
            // swiper slide로 이동
            dxSwiper.slideTo(swiperSlideIndex);
        }
    })

})

