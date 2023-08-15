### 섹션 기본 세팅을 .section 으로 통일

1. top/middle/bottom이 없는 section3~5에 대한 설정을 따로 하지말고, .section을 class추가해서, 항상 되도록 수정

```html
<!-- 건강채널 -->
<div class="section section3 mt-5 mt-lg-3"></div>
<!-- 둘러보기 -->
<div class="section section4 mt-5 mt-lg-3"></div>
<!-- 자가진단 -->
<div class="section section5 mt-5 mt-lg-3"></div>
```

```css
/*.section3, .section5, .section4 {*/
.section {
    width: 100%;
    position: relative; /* */
    z-index: 666;
    background: #fff;
}

/*.section3 > div,*/
/*.section5 > div,*/
/*.section4 > div*/
.section > div {
    width: 70%;
    margin: 0 auto;
}

@media screen and (max-width: 991px) {
    /*.section3 > div,*/
    /*.section5 > div,*/
    /*.section4 > div {*/
    .section > div {
        width: 85%;
    }
}
```

### section추가 기본 세팅은 .section .section-x부터 시작

1. html 로 .section .section-x 추가 + 내부에는 .section-title 과 .xxx-box

```html
<!-- 클리닉 -->
<div class="section section6 mt-5 mt-lg-3">
    <div class="section-title">
        <div>
            <p>우아 클리닉</p>
            <p>클리닉별 치료과정</p>
        </div>
        <div>
            <strong>어떻게 치료하는지</strong> 한 눈에 살펴봐요!
        </div>
    </div>
    <div class="clinic-box">
    </div>
</div>
```

2. js로 .section-title에 기본 설정된 opacity를 제거하면서 나타나도록 추가

```js
    // section6 클리닉
let scene9 = new ScrollMagic.Scene({
    triggerElement: ".section6",
    triggerHook: "onCenter",
    // triggerHook: "onEnter",
    offset: -80,
});
scene9.setVelocity([".section6 > .section-title > div"], {
    top: "0px",
    opacity: "1"
}, {
    duration: "300",
});
controller.addScene(scene9);
```

3. boostrap 기본 탭을 가져온다.
    1. tab ul.`nav-tabs`의 id는 `clinic-tab` -> div.tab-content의 id는 `clinic-tab-content`로 tab에서 content로 연결가능성을 열어둔다.
    2. 각 tab의 id는 `youtube-clinic-1,2,3`, 각 content 이자 tab의 href=#의 id는 맞춰서, `contents-clinic-all or 1,2,3,`로 만들어준다.

```html

<div class="clinic-box">
    <ul class="nav nav-tabs mb-3" id="clinic-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active"
               id="clinic-tab-1"
               data-bs-toggle="tab"
               href="#contents-clinic-1"
               role="tab"
            >
                통증 클리닉
            </a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link"
               id="clinic-tab-2"
               data-bs-toggle="tab"
               href="#contents-clinic-2"
               role="tab"
            >
                피부 클리닉
            </a>
        </li>
    </ul>
    <div class="tab-content" id="clinic-tab-content">
        <div class="tab-pane fade show active"
             id="contents-clinic-1"
             role="tabpanel"
        >
            Tab 1 content
        </div>
        <div class="tab-pane fade"
             id="contents-clinic-2"
             role="tabpanel"
        >
            Tab 2 content
        </div>
    </div>
</div>
``` 

4. 일단 tab이 들어가있는 부모 `.clinic-box`에 상하패딩을 준다.

```css
/* 클리닉별 치료과정 (tab) */
.section6 .clinic-box {
    padding: 10px 0;
}
```

![img.png](../ui/307.png)

5. tab의 border 기본스타일을 제거해준다.

```css
/* - tab 기본 border 2개 제거 */
.section6 .clinic-box .nav-tabs,
.section6 .clinic-box .nav-tabs > li > a {
    border: none !important;
}
```

![img.png](../ui/308.png)

#### tab안에 row/col로 card넣기

1. a안에 클리닉 row/col/div의 card를 집어넣어야한다.
    - **이 때, `ul.nav`가 `flex`를 설정되어 있지만, `.row`를 직접 줘야 `.g-x`로 col-x를 채우면서 간격을 줄 수 있다.**
    - **`li.nav-item`들이 flex-item 이자 row의 `col-x`들로서 간격을 조절한다.**
    - 카드형태의 `div.w-100.h-100`의 부모는 `a태그`이므로, 배경을 차지하는 div의 부모는 `a.nav-link`가 되므로 a태그에 `height를 동적으로 지정`해준다.

2. ul.nav-tabs에 `.row .g-2 .g-lg-3`  / 각 li.nav-item에 `.col-3 .col-lg-2`로 4개 -> 6개짜리 칼럼 만들기
    - **.g-2의 간격은 .row를 안주면 안먹힌다.**

```html

<div class="clinic-box">
    <ul class="nav nav-tabs mb-3 row g-2 g-lg-3" id="clinic-tab" role="tablist">
        <li class="nav-item col-3 col-lg-2" role="presentation">
```

3. 각 div의 부모 a태그는 height를 지정해주되
    - 80 -> 100 (md) -> 120px (lg)로 동적으로 지정해주기

```css
/* - tab col들의 높이를 담당하는 a가 동적으로 */
.section6 .clinic-box .nav-tabs > li > a {
    height: 100px;
}

@media screen and (max-width: 991px) {
    .section6 .clinic-box .nav-tabs > li > a {
        height: 80px;
    }
}
```

4. 각 영역은 텍스트 좌측정렬 `.text-start`이면서 **lg에서 `.text-lg-center`를 넣어주기 전까진 좌측 여백 / 위쪽여백은 항상 넣어주기**
    - w100, h100으로 영역전체를 차지하면서 배경주기
    - **배경은 `-color`가 더 아래 깔리며, `-image`를 `no-repeat + bottom right + contain`으로 `우측하단에 위치`시키기**
    - 글자는 small태그에 주되, 공백+클리닉 단어는, md부터 보이도록 만들기
    - 글자체는 `.fs-clinic` 구현해서, 11 -> 13-> 15-> 18px로 세세하게 조정해주기

```css
.fs-clinic {
    font-size: 18px;
}

@media screen and (min-width: 992px) and (max-width: 1399px) {
    .fs-clinic {
        font-size: 15px;
        letter-spacing: -.005rem;
    }
}

@media screen and (min-width: 576px) and (max-width: 991px) {
    .fs-clinic {
        font-size: 13px;
        letter-spacing: -.01rem;
    }
}

@media screen and (max-width: 575px) {
    .fs-clinic {
        font-size: 11px;
        letter-spacing: -.01rem;
    }
}
```

```html

<div class="clinic-box">
    <ul class="nav nav-tabs mb-3 row g-2 g-lg-3" id="clinic-tab" role="tablist">
        <li class="nav-item col-3 col-lg-2" role="presentation">
            <a class="nav-link active"
               id="clinic-tab-1"
               data-bs-toggle="tab"
               href="#contents-clinic-1"
               role="tab"
            >
                <div class="text-start ps-2 pt-1 ps-sm-3 text-lg-center ps-lg-0 pt-lg-3  w-100 h-100 rounded text-white shadow"
                     style="background-image: url('images/clinic/001_AB90CD.png');
                            background-repeat: no-repeat;
                            background-position: bottom right;
                            background-size: contain;
                            background-color: #AB90CD;
                            "
                >
                    <small class="fs-clinic text-shadow">
                        통증
                        <span class="d-none d-md-inline-block">&nbsp;클리닉</span>
                    </small>
                </div>
            </a>
        </li>
```

5. tab active == `a.active`일 시, 자식 div의 배경과 글자색 변환 + 애니메이션 .5s 를 !important로

```css
/* - tab active일시, 자식div의 배경과 글자색 변경하기 */
.section6 .clinic-box .nav-tabs > li > a.active > div {
    background-color: var(--color-main-light) !important;
    color: #ddd !important;
    transition: all .5s !important;
}
```

- 이제 탭4개를 복사해서 색깔을 지정해주기
  ![img.png](../ui/309.png)


6. **div의 배경 지정 중에, `공통되면서 css`로 되는 부분은 css로 넘기기**

- 기존

```html

<div class="text-start ps-2 pt-1 ps-sm-3 text-lg-center ps-lg-0 pt-lg-3  w-100 h-100 rounded text-white shadow"
     style="background-image: url('images/clinic/001_AB90CD.png');
                            background-repeat: no-repeat;
                            background-position: bottom right;
                            background-size: contain;
                            background-color: #AB90CD;
                            "
>
    <small class="fs-clinic text-shadow">
        통증
        <span class="d-none d-md-inline-block">&nbsp;클리닉</span>
    </small>
</div>
```

- 변경

```css
/* - tab a>div의 공통 성질만 정리 */
.section6 .clinic-box .nav-tabs > li > a > div {
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
}
```

```html

<div class="text-start ps-2 pt-1 ps-sm-3 text-lg-center ps-lg-0 pt-lg-3  w-100 h-100 rounded text-white shadow"
     style="background-image: url('images/clinic/001_AB90CD.png');
            background-color: #AB90CD;
            "
>
    <small class="fs-clinic text-shadow">
        통증
        <span class="d-none d-md-inline-block">&nbsp;클리닉</span>
    </small>
</div>
```

7. **색은 변수로 지정해놓고, 한약carousel색을 활용하여 clinic까지 처리되게 하기**
   - carousel이랑 clinic이랑 따로 관리한다.
   - **clinic은 `li의 순서를 기준`으로 div에 색을 부여한다.**

```css
:root {
    /* 한약 carousel 및 clinic 색*/
    --color-carousel-1: #ffdbc6;
    --color-carousel-1-bolder: #ff6b29;

    --color-clinic-1: #AB90CD;

}
```

```css
.section2-bottom .swiper-container .swiper-slide:nth-child(1) {
    background: var(--color-carousel-1);
}

/* - 1번째 bullet */
.section2-bottom .swiper-container .swiper-pagination .my-bullet:nth-child(1) {
    color: var(--color-carousel-1-bolder); /* 글자색(표기안됨) or box-shadow 색 */
    background: var(--color-carousel-1-bolder); /* 배경색 */
}
```

```css
/* - div의 li 순서대로 div 색 배정 */
.section6 .clinic-box .nav-tabs > li:nth-child(1) > a > div {
   background-color: var(--color-clinic-1);
}

.section6 .clinic-box .nav-tabs > li:nth-child(2) > a > div {
   background-color: var(--color-clinic-2);
}
```
```html

<div class="text-start ps-2 pt-1 ps-sm-3 text-lg-center ps-lg-0 pt-lg-3  w-100 h-100 rounded text-white shadow"
     style="background-image: url('images/clinic/001_AB90CD.png');"
>
    <small class="fs-clinic text-shadow">
        통증
        <span class="d-none d-md-inline-block">&nbsp;클리닉</span>
    </small>
</div>
```
![img.png](../ui/310.png)
