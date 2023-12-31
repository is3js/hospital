### section 추가 
1. .section3를 만들고, `.section-title`의 정해진 틀을 복붙한다.
```html
<div class="section3">
    <div class="section-title">
        <div>
            <p>우아 건강채널</p>
            <p>Youtue 및 블로그 연재</p>
        </div>
        <div>
            <strong>영상과 글로</strong> 우아 한의원을 만나봐요!
        </div>
    </div>
    <div class="media-box">
        
    </div>
</div>
```

2. 이미 `.section-title`은 opacity 0  밑, 위치가 잡혀있으니, scrollmagic으로 처리되게 한다
- **맨아래 컨텐츠이므로 onCenter가 안보이면 탭도 작동X -> onEnter로 수정해놓고 나중에 수정한다.**
```js
// section3 - title with Velocity
let scene6 = new ScrollMagic.Scene({
    triggerElement: ".section3",
    triggerHook: "onCenter",
});
scene6.setVelocity([".section3 > .section-title > div"], {
    top: "0px",
    opacity: "1"
}, {
    duration: "300",
});
controller.addScene(scene6);
```

3. `.media-box`에는 boostrap으로 tab예제를 붙혀넣는다.
    - https://www.devwares.com/docs/contrast/javascript/navigation/tabs/
    - 위 사이트에서 제일기본 예시를 가져온다.
    - **`ul.nav-tabs` 속 `a.href="#"`과  `div.tab-content` 속 `div.tab-pane[id=""]`를 일치시켜준다.**
```html
<div class="media-box">
    <ul class="nav nav-tabs mb-3" id="media-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active"
               id="ex1-tab-1"
               data-bs-toggle="tab"
               href="#tabs-youtube"
               role="tab"
            >
                유튜브
            </a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link"
               id="ex1-tab-2"
               data-bs-toggle="tab"
               href="#tabs-blog"
               role="tab"
            >
                블로그
            </a>
        </li>
    </ul>
    <div class="tab-content" id="media-content">
        <div class="tab-pane fade show active"
             id="tabs-youtube"
             role="tabpanel"
        >
            Tab 1 content
        </div>
        <div class="tab-pane fade"
             id="tabs-blog"
             role="tabpanel"
        >
            Tab 2 content
        </div>
    </div>
</div>
```


4. 마지막 tab만 복사해서 추가 한 뒤,
   - li의 role="" 을 삭제, li.nav-item 클래스 삭제, a.nav-link 클래스 삭제를 해주고
   - **ms-auto를 통해 우측으로 더보기 버튼을 붙인다.**
```html
<li class="ms-auto">
    <a class=""
       href="#"
    >
        더보기
    </a>
</li>
```
![img.png](../ui/217.png)


5. 먼저 tab을 싸고 있는 `div.media-box`부터 css로 조절한다. 상하패딩만 일단 준다.
```css
/* sectino3 media tab */
.section3 .media-box {
    padding: 10px 0;
}
```

6. `ul.nav-tabs > li > a`로 글자크기를 조정해준다.
   - **활성화되기 전 기본 상태를 처리한다고 생각한다.**
   - **`border:none`을 해줘야 둘러싼 border가 active/hover시에 안나타난다.**
```css
.section3 .media-box .nav {
    font-size: 13px;
}

/* 활성화되기 전, tab 글자 */
.section3 .media-box .nav-tabs > li > a {
   font-size: 13px;
   color: #999;

   border: none;
}
```
![img.png](../ui/218.png)

7. `ul.nav-tabs`의 아래border를 제거해주고, **각 `a태그`에 `rounded-pill` + `bg-gray`를 걸어준다.**
   - 추가로 `me-2`로 간격을 벌려주고, `py-1, px-3`로 padding을 좁혀준다.
```css
/* 탭 기본border 삭제 */
.section3 .media-box .nav-tabs {
    border: none;
}
```
```html
<!--<a class="nav-link active"-->
<a class="nav-link active rounded-pill bg-gray me-2 py-1 px-3"
   id="ex1-tab-1"
   data-bs-toggle="tab"
   href="#tabs-youtube"
   role="tab"
>
```
```css
/* 활성화(a.active) tab 글자 */
.section3 .media-box .nav-tabs > li > a.active {
    /*border-bottom: 2px solid var(--color-main)!important;*/
    background-color: var(--color-main);

    color: #fff;
}
```
![img.png](../ui/219.png)


### 카드
8. tab content에 병원두러보기 세로 카드를 집어넣는다.
```html
<div class="card border-dark-subtle border-1 rounded-5 h-100">
    <img src="images/facilities/f1.png" class="card-img-top rounded-top-5 " alt="...">
    <div class="card-body  text-start">
        <h5 class=" card-title fw-bold">접수실</h5>
        <p class=" card-text text-truncate" style="color: darkgray">접수와 대기를 하는 공간</p>
    </div>
</div>
```
```html
<div class="card border-0">
```
- card-img-top의 radius를 제거한다
```html
<a href="#" class="position-relative">
    <img src="images/main_section/youtube-example.jpg" class="card-img-top rounded-0" alt="...">
</a>
```
- relative a태그안에 span.play태그를 만들어놓고, absolute로 만들어서 플레이버튼이 들어가게 한다.
- 이 때, w/h를 20%로 두고. bg-size를 w는 auto, h를 100%로 준다
```html
<a href="#" class="position-relative">
    <img src="images/main_section/youtube-example.jpg" class="card-img-top rounded-0" alt="...">
    <span class="play"></span>
</a>
```
```css
/* 유튜브 */
span.play {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 20%;
    height: 20%;
    font-size: 0;
    background: url('../images/main_section/btn-play.png') no-repeat 50% 50%;
    background-size: auto 100%;
}
```
![img.png](../ui/221.png)

9. 이제 밑에 글자는 2줄로 뜨고, 점점점 처리하기 위해, `글자태그h6.ellipsis-2`을 추가하고
   - w100%를 준 다음
   - height를 lh의 절반을 이용해 2줄이 되게 하고, fz도 같이 정해준다.
   - **display를 `-webkit-box`로 필수로 주고, `-webkit-line-clamp: 2;-webkit-box-orient: vertical;`을 필수로 줘야 2줄 ellipsis가 된다.**
   - `text-overflow: ellipsis;`는 단독으로 안되고 `overflow: hidden;`도 같이 줘야한다.
   - 반응형으로서 부모의 padding조절 및 h/lh/fz를 조절한다.

```html

<div class="card-body  text-start">
    <div class="card-body  text-start">
        <h6 class="card-title fw-bold ellipsis-2">
            갱년기 최고의 한약, 우아한의원에서 알려드립니다! dddd ddddddddddddddddddddddd ddddddddddddddddddddddddd
        </h6>
    </div>
</div>
```
```css
.media-box .ellipsis-2 {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
    text-overflow: ellipsis;

    height: 2.6em;
    line-height: 1.3em;
    font-size: 1em;
}

@media screen and (max-width: 991px){
    .media-box .card-body {
        padding: 10px 0;
    }

    .media-box .ellipsis-2 {
        height: 2.4em;
        line-height: 1.2em;
        font-size: .6em;
    }
}
```

### swiper 달아주기
1. .col <-> .card 사이에 swiper-container / wrapper / slide를 추가한다.
2. container 설정
```css
/* 건강채널 tab content swiper */
.tab-content .tab-pane .swiper-container {
   width: 100%;

   /* 임시 */
   background: red;
}
```
3. container의 부모에 상하 padding 설정 ( pagination 등 놓을 자리 마련?)
```css
/* 건강채널 tab content swiper */
.tab-content .tab-pane {
   padding: 5% 0;
}
```

4. slide를 relative로 만들어서, 내부요소를 absolute로 추가가능하게 만들기
```css
.tab-content .tab-pane .swiper-container .swiper-slide {
    position: relative;
}
```

5. 이제 slide복사해서 여러개 만들어놓기
6. js로 swiper 돌아가게 만들기
   - container를 찝어서 객체로 만든다(7버전 이하)
   - 참고: https://www.swiper.com.cn/api/carousel/198.html
   - 이 때, **3개씩 보이게 하고, 넘어갈 때도 3개씩 넘어가게 만든다. 3개가 빠짝 붙어있으니 간격을 직접 줄 수 있다.**
```js
 /* 건강채널 swiper */
 var section3Swiper = new Swiper('.section3  .swiper-container', {
     slidesPerView: 3,
     slidesPerGroup : 3,
     spaceBetween : '2%',
 });
```
![img.png](../ui/224.png)
- **breakpoints를 활용해서, 모바일에선 2개씩 보이게 할 수 있다.**
```js
 /* 건강채널 swiper */
 var section3Swiper = new Swiper('.section3  .swiper-container', {
     slidesPerView: 3,
     slidesPerGroup : 3,
     spaceBetween : '2%',
     breakpoints: {

         991: {
             slidesPerView: 2,
             slidesPerGroup: 2,
             spaceBetween: '10%'
         },
     }
 });
```
![img.png](../ui/225.png)


7. 이제 tab의 글자를 모바일에선 작게 수정해준다.
```css
@media screen and (max-width: 991px){
    .section3 .media-box .nav-tabs > li > a {
        font-size: 9px;
    }
}
```

8. **3개를 2.5, 2개를 1.5씩 보이고 + 넘겨주면, 극적인 효과를 줄 수 있다.**
```js
    var section3Swiper = new Swiper('.section3  .swiper-container', {
        slidesPerView: 2.5,
        slidesPerGroup : 2.5,
        spaceBetween : '2%',
        breakpoints: {

            991: {
                slidesPerView: 1.5,
                slidesPerGroup: 1.5,
                spaceBetween: '10%'
            },
        }
    });
```
![img.png](../ui/226.png)

9. 1.5, 2.5에 대해 잘린 세로선을 넣어주기 위해 `container바깥에서 상하패딩을 줬던 부모`인 `.tab-pane`에 `:before`로 선을 넣어준다.
   - top0right0에서 1.1px로 width를 주고 cover로 채워준다.
   - 이 떄, swiper-container보다 앞쪽으로 나오도록 `z-index:2;`를 준다.
```css
/* slide 2.5, 1.5 slide에 따라, 상하패딩을 가진 .tab-pane에 before로 [자린 세로선] 주기 */
.section3 .tab-pane:before {
   content: '';
   position: absolute;
   top: 0;
   right: 0;

   display: block;
   width: 1.1px;
   height: 100%;

   background: url("../images/main_section/sd-line.png") no-repeat 0 50%;
   background-size: cover;

   z-index: 2;
}
```

![img.png](../ui/228.png)

- tab-pane에서는 `px-0`을 줘서 넓힌다.
```html
<div class="tab-pane fade show active position-relative px-0"
```

10. swiper가 끝이면 사라지도록 js에서 처리해주기
   - nextEl관련 문서에서 조건문을 확인한다
   - https://www.swiper.com.cn/api/navigation/304.html

- **:before의 가상요소는 jquery로 .css()를 투입못하여, display none을 동적으로 못한다**
- **그러므로 `요소.hide-before:before`를 새롭게 정의해준 뒤, 해당요소에 `.hide-before`를 add/remove class한다**

```css
.section3 .tab-pane.hide-before:before {
    display: none;
}
```
- **이 때, 1.5개를 1.5씩 넘어갈 때, 4개 중에 2에서 더이상 activeIndex가안넘어가므로, 수식을 if조건절에 추가한다**
```js
    /* 건강채널 swiper */
var section3Swiper = new Swiper('.section3  .swiper-container', {
    on: {
        slideChangeTransitionStart: function () {
            console.log(this.slides.length);
            console.log(this.activeIndex);
            console.log(this.params.slidesPerView);
            if (this.isEnd || this.slides.length - .5 === this.activeIndex + this.params.slidesPerView) {
                $('.section3 .tab-pane').addClass('hide-before');
                // this.navigation.$nextEl.css('display', 'none');
            } else {
                $('.section3 .tab-pane').removeClass('hide-before');
                // this.navigation.$nextEl.css('display', 'block');
            }
        },
    }
});
```
![img.png](../ui/229.png)
![img_1.png](../ui/230.png)
![img_2.png](../ui/231.png)

11. **boostrap tab클릭시마다, swiper를 새롭게 초기화해줘야한다.**
    1. .section3안의 tab의 클릭요소인 `a[data-bs-toggle="tab"]`요소에 .on() 이벤트리스너를 다는데
    2. **boostrap5에서 탭이 보일때 작동하는 `shown.bs.tab`를 .on()에 달고, e를 받는다.**
    3. `e.target`으로 걸리는 a태그에서 **tab의 id가 달린 `href` attr**값을 가져온다.
    4. 이제, .section3안의 .tab-pane들을 .find()를 찾은 뒤, **`.index()`의 값으로 `$` + `tabHref == #tab-panel-id` == `targetTab element`가 나오므로 index를 찾아낼 수 있다.**
```js
 $('.section3 a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
     var targetTabHref = $(e.target).attr('href');
     var targetPanel = $(targetTabHref)
     var AllPanels = $('.section3 .tab-content').find('.tab-pane');

     var index = AllPanels.index(targetPanel);
     console.log(index)
 });
```

12. **이제 swiper들도 여러개 찾아 낸 뒤, index를 입력받아 초기화할 수 있게 한다.**
   - 이 때, 사라지게 하는 `.tab-panel:before`도 특정index를 지정해줘야할 것이다.
   - **swiper를 index에따라 초기화하는 함수 `initSection3Swiper(index)`를 정의하고**
   - **css가 아니므로 `복수를 찾을 때는 .find()`를 사용해서 찾고  `.eq( index )`로 선택하게 한다.**
   - 해당인덱스로 [잘린 세로선]도 .find도 찾은 뒤, add/removeClass `hide-before`를 처리해준다.
   - **`클릭리스너가 작동하기 전인 index 0은 최초로 직접 호출`해줘야한다.**
```js
function initSection3Swiper(tabIndex) {
   // console.log(tabIndex)
   // console.log($('.section3').find('.swiper-container').eq(tabIndex))
   new Swiper($('.section3').find('.swiper-container').eq(tabIndex), {
      slidesPerView: 2.5,
      slidesPerGroup: 2.5,
      spaceBetween: '3%',
      breakpoints: {
         991: {
            slidesPerView: 1.5,
            slidesPerGroup: 1.5,
            spaceBetween: '10%'
         },
      },

      on: {
         slideChangeTransitionStart: function () {

            if (this.isEnd || this.slides.length - .5 === this.activeIndex + this.params.slidesPerView) {
               // 잘린 세로선 띄우기
               // $('.section3 .tab-pane').addClass('hide-before');
               $('.section3').find('.tab-pane').eq(tabIndex).addClass('hide-before');
               // this.navigation.$nextEl.css('display', 'none');
            } else {
               // 잘린 세로선 삭제
               // $('.section3 .tab-pane').removeClass('hide-before');
               $('.section3').find('.tab-pane').eq(tabIndex).removeClass('hide-before');
               // this.navigation.$nextEl.css('display', 'block');
            }
         },
      }

   });
}

initSection3Swiper(0);
```
```js
// section3 tab 클릭시 index 찾기 -> 해당index의 swiper 초기화
$('.section3 a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    var targetTabHref = $(e.target).attr('href');
    var targetPanel = $(targetTabHref)
    var AllPanels = $('.section3 .tab-content').find('.tab-pane');

    var index = AllPanels.index(targetPanel);

    initSection3Swiper(index);
});
```
![img.png](../ui/232.png)

13. **swiper 초기화 실행시, 슬라이드 갯수(`this.slides.length`)가 preview갯수(`this.params.slidesPerView`)보다 적으면 [잘린 세로선]을 숨긴다**
   - on 파라미터에서 init 함수에 짜면 된다.
   - **이 때, preview == perview는 1.5, 2.5, 3.5이므로 `0.5를 더해서 비교해준다.`**
```js
on: {
    // 시작시 preview 수보다, 주어진 slide의 갯수가 더 적으면, 잘린가로선을 hide시킨다.
    init: function () {
        if (this.slides.length <= this.params.slidesPerView + .5) {
            $('.section3').find('.tab-pane').eq(tabIndex).addClass('hide-before');
        }
    }
,
    slideChangeTransitionStart: function () {
    }
}
```

![img.png](../ui/235.png)

14. 이제 youtube, blog 모두  `span.play` 대신 `span.category`를 만들어준다.
    - `height를 18%`로 주되, 큰 화면에 너무 커지지 않도록, `max-height를 30px`로 지정해준다.
    - 글자를 가운데 정렬하고, `lh:100%`에 padding2%를 준 뒤, fz를 13px -> 모바일 11px로 준다.
```html
<div class="swiper-slide">
    <div class="card border-0">
        <a href="#" class="position-relative">
            <img src="images/main_section/youtube-example.jpg"
                 class="card-img-top rounded-0"
                 alt="...">
            <span class="play"></span>
            <span class="category">피부 미용</span>
        </a>
        <div class="card-body  text-start">
            <h6 class="card-title fw-bold ellipsis-2">
                갱년기 최고의 한약, 우아한의원에서 알려드립니다! dddd ddddddddddddddddddddddd
                ddddddddddddddddddddddddd
                ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
            </h6>
        </div>
    </div>
</div>
```
```css
span.category{
    position: absolute;
    content: "";
    top:8%;
    right:-4%;
    width: 50%;
    height: 18%;
    max-height: 30px;
    background: var(--color-main);
    box-shadow: 4px 4px 15px rgba(0, 181, 178, .5);
    
    color: white;
    text-align: center;
    line-height: 100%;
    padding: 2%;
    font-size: 13px;
}

@media screen and (max-width: 991px){
    span.category{
        font-size: 11px;
    }
}
```
15. 이제 tab마다 활성화된 tab과 category 커스텀해줄 수 있다. 여기선 youtube만 해본다.
- 카테고리는 추가 class를 만든 뒤, 배경만 따로 지정해준다.
```html
<span class="category category-youtube">한약 치료</span>
```
```css
/* 유튜브 카테고리는 따로 색깔 */
span.category.category-youtube {
    background: #f63232!important;
    box-shadow: 2px 2px 7px rgba(246, 50, 50, .4);
}
```
- **tab 중에서 a태그의 tab-content 겨냥 id를 추출해서 active된 a태그의 배경을 바꾼다.**
```css
/* 활성화(a.active) tab 글자 */
.section3 .media-box .nav-tabs > li > a.active {
    background-color: var(--color-main);

    color: #fff;
}
/* - youtube content를 겨냥하는 tab은 빨간색으로 활성화 */
.section3 .media-box .nav-tabs > li > a.active[href="#tabs-youtube"] {
    background-color: #f63232;
    color: #fff;
}
```
![img.png](../ui/234.png)

16. swiper js의 breakpoints를 활용해서, 1440까지는 2.5, 더 커지면 3.5로 준다.
```js
function initSection3Swiper(tabIndex) {
        // console.log(tabIndex)
        // console.log($('.section3').find('.swiper-container').eq(tabIndex))
        new Swiper($('.section3').find('.swiper-container').eq(tabIndex), {
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
        }
}
```
![img.png](../ui/233.png)


### 유튜브/블로그  세로로 2개의 탭으로 구현
- tab의 종류는 전체 + 카테고리들로 한다.
1. `div.media-box` 내부에  ul.nav-tabs + div.tab-content 를 복사해서 2개로 만든다.
    - 각 id를 media-tabs / media-content를 -> youtube-, blog- 로 변경한다.
2. 각 `ul.nav.nav-tabs`의 `tab속 a태그의 id`를 `youtube-tab`, `blog-tab`로 정하고,
    - **tab으로 연결된 tab-content을 찾을 수 있도록 `div.tab-content`의 id를 이어 붙인 `youtube-tab-content`, `blog-tab-content`로 변경한다**
    - mb-4로 전체 tab끝에 아래쫏 마진을 각각 준다.
```html
<!-- 유튜브 -->
<ul class="nav nav-tabs mb-3" id="youtube-tab"
<!-- 블로그 -->
<ul class="nav nav-tabs mb-3" id="blog-tab"
```
```html
<div class="tab-content mb-4" id="youtube-tab-content">

<div class="tab-content mb-4" id="blog-tab-content">
```
3. content 와 연결되는 a태그의 href를 #content-tabs-all, -1, -2,  ... 로 변경한다.
    - content의 id도 맞춰서 변경한다.
```html
<ul class="nav nav-tabs mb-3" id="youtube-tab" role="tablist">
    <li class="nav-item" role="presentation">
        <!--<a class="nav-link active"-->
        <a class="nav-link active rounded-pill bg-gray me-2 py-1 px-3 fs-tab "
           id="youtube-tab-1"
           data-bs-toggle="tab"
           href="#contents-youtube-all"
           role="tab"
        >
            전체
        </a>
    </li>
```
```html
<div class="tab-content" id="youtube-tab-content">
    <!-- tab all -->
    <div class="tab-pane fade show active position-relative px-0"
         id="contents-youtube-all"
         role="tabpanel"
    >
```

4. 기존 tab의 href를 가지고 a.active의 색을 정했는데, `ul#xxx-tabs`의 id를 바탕으로 active 색을 정해준다.
```css
/* tab active color */
/* - ul.nav-tabs 의 id를 기준으로 판단 */
/*.section3 .media-box .nav-tabs > li > a.active[href="#tabs-youtube"] {*/
.section3 .media-box ul.nav-tabs#youtube-tabs > li > a.active {
    background-color: var(--color-pink)!important;
    color: #fff;
}
/*.section3 .media-box .nav-tabs > li > a.active[href="#tabs-blog"] {*/
.section3 .media-box ul.nav-tabs#blog-tabs > li > a.active {
    background-color: var(--color-green)!important;
    color: #fff;
}
```
![img.png](../ui/281.png)

5. 각각의 tab예시에서 category-xxx를 일괄통일하도록 변경해준다.
6. **js에서 tabIndex를 찾을 때, 서로 다른 범주에서 찾아야하므로 div.tab-content에 달아둔 `id="youtube-content"` 와 `id="blog-content"`를 활용한다**
- tab안의 a태그를 클릭 후 -> ul.nav-tabs의 `#xxx-tab`의 아이디를 찾고
- **해당 tab의 id에 `-content`를 붙여서 div.tab-content의 id `xxx-tab-content`로 youtube vs blog의 content를 구분할 수 있게 한다.**
```js
$('.section3 a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {

    var targetTabHref = $(e.target).attr('href');
    var targetPanel = $(targetTabHref)
    
    // var AllPanels = $('.section3 .tab-content').find('.tab-pane');
    var targetTabUlId = $(e.target).parent().parent().attr("id"); // youtube-tabs or blog-tabs
    var targetTabContentId = '#' + targetTabUlId + '-content'; //#blog-tabs-content #youtube-tabs-content
```
- tabcontent의 id로 element를 찾은 뒤, tab내용인 `.tab-pane들`을 찾은 뒤, targetPanel의 index인 tabIndex를 찾는다.
- **swiper 초기화 함수에 해당 `targetContentId를 추가`해서 넘겨줘서, 특정 tab content내에서 특정 index로 .swiper-container내부요소들을 찾는다.**
```js
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
```
- swiper 초기화함수에서 **기존에 `.section3`에서 찾는게 아니라 `특정tabContentId`로 요소들을 찾도록 변경한다.**
```js
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
```

- 0번째 index를 미리 초기화할 때도, 특정tabContentId를 건네주고, youtube/blog 각각을 초기화한다
```js
initSection3Swiper('#youtube-tab-content',0);
initSection3Swiper('#blog-tab-content',0);
```
![img.png](../ui/282.png)
