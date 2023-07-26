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

4. 이제 pagination과 scrollbar의 위치를 잡아주기 위해, container를 relative로 만든다.
```css
.section1 .swiper-container {
    width: 100%;

    position: relative;
}
```

5. `.swiper-scrollbar`와 그 내부 요소인 `.swiper-scrollbar-drag`를 css로 지정해준다.
- .swiper-scrollbar는 `width를 90%`로 차지했다면, 양옆에 10%가 남으므로 `left:5%`로 왼쪽에 여백을 준다.
- 나 같은 경우, 전체 중 `왼쪽 70%`를 차지하고 나머지 30%로는 비워둘 것이므로, `width:60%` + `left:5%` 로 잡아준다.
- 바닥에서는 5%만 띄워준다. top은 auto로 줘서 미리 잡힌 top을 제거한다.
- scrollbar의 높이는 vw로 잡아서 작은모드에선 작아지게 한다.
- 기본 둥근 모서리인데 radius를 0으로 제거한다.
```css
.section1 .swiper-container .swiper-scrollbar {
    width: 60%;

    position: absolute;
    left: 5%; /* 100-90 = 10%에서 가운데 정렬을 위해 5%만 */

    bottom: 5%;
    top: auto;
    height: .4vw;
    border-radius: 0;
}
```
- drag되는 부분은 배경색과 투명도 및 radius를 설정해준다.
```css
.section1 .swiper-container .swiper-scrollbar .swiper-scrollbar-drag {
    background: #ddd;
    opacity: .6;

    border-radius: 0;
}
```

6. pagination은 `.swiper-pagination` 아래 `.swiper-pagination-bullet`를 같이 설정해줘야한다.
- 일단 absolute로 만들고, scrollbar의 `width와 left는 동일`하게 주고 `bottom은 약간 위`로 준다.
- **이후 bullet들에 대한 `flex` + `between` + `수직정렬` 옵션을 준다.**
```css
.section1 .swiper-container .swiper-pagination {
    width: 60%;
    position: absolute;
    left: 5%; /* 100-90 = 10%에서 가운데 정렬을 위해 5%만 */

    bottom: 8%;
    top: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
}
```
- bullet들은 between으로 갈라지는 flex-item으로서 `flex:1`을 줘서 **각 공간에서 최대한 펼치게** 만들어줘야한다.(필수)
- 글자들은 다음줄로 내려가도록 `flex-wrap:wrap`을 줘야한다. height auto로 줘서 알아서 맞춰지게 한다.
- font 설정 및 shadow도 같이 주자. 텍스트들은 가운데 정렬한다
- 배경과 border radius는 삭제한다.
```css

```
