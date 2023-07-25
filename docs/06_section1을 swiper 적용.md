1. 명옥헌 을 참고하여, swiper 기본예시에서 `div.swiper-scrollbar`를 pagination밑에 추가한다
    - **추가로 각 slide 내부에 `a태그`로 감싸서 img를 넣어준다**
```html
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <a href="#">
                <picture class="p-0 m-0">
                    <source media="(max-width: 991px)" srcset="images/main_carousel/carouse_main_mobile.png">
                    <img src="images/main_carousel/carouse_main.png" class="img-fluid w-100" alt="..."
                         style="filter: brightness(.9)"
                    >
                </picture>
            </a>
        </div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 페이지네이션 -->
    <div class="swiper-pagination"></div>
    <!-- 스크롤바 -->
    <div class="swiper-scrollbar"></div>
</div>
```
2. css로 container 설정을 해준다.
```css
.section1 .swiper-container {
    width: 100%;
}
```

3. index.js에 js로 section1의 swiper객체를 만들고, `pagination`, `scrollbar`의 옵션으로 `el`을 div.xxx를 지정해준다
    - **이 때, pagination 옵션 중 `clickable`을 true로, `renderBullet`에서는 span태그로 글자title을 넘겨주면, 점 대신 글자가 뜬다.**
    - `title 리스트`를 titles로 선언해서 **pagination의 renderBullet에 function걸시 인자로 넘어오는 `index`와 `className`를 사용해서 span태그를 작성한다**
```js
// section1 swiper
let titles = ["드리는 말씀", "7월 다이어트 패키지", "12월 겨울 통증"];
var section1Swiper = new Swiper('.section1 > .swiper-container', {
    pagination: {
        el: '.section1  .swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + titles[index] + '</span>';
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
```
![img.png](../ui/178.png)

4. 이제 pagination과 scrollbar를 css로 만들어준다.

- scrollbar는 carousel전체가 아니라 92%정도로 width를 준다.
- `albsolute`로서, 8%가 남는데 left:4%를 줘서 가운데 정렬한다.


