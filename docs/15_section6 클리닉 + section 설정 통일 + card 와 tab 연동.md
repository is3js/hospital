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
    border: none;
}
```
![img.png](../ui/308.png)


6. a안에 클리닉 기본 예시를 집어넣어 조절한다.
   - 이 때, `ul.nav`가 `flex`를 설정되어있어서, `li.nav-item`들이 flex-item이므로, **flex row의 `col-x`를 넣어줄 수 있다.**
   - 배경을 차지하는 div의 부모는 `a.nav-link`가 되므로 a태그에 height를 지정해준다.
   - 
