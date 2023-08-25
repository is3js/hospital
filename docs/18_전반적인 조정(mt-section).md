1. 각 섹션당 최대 mt인 5를 커스텀 css로 더 넓힌다
```css
/* margin 마진 */
.mt-section {
   margin-top: 7.5rem !important;
}

@media screen and (max-width: 991px){
   .mt-section {
      margin-top: 4rem !important;
   }
}
```

2. mt-5들을 전부 mt-section으로 고치고, 으로 고쳐 준다.
```html
<!-- 섹션2: main -->
<div class="trigger-section2 mt-section"></div>
<div class="section2">
```
```html
<!-- 치료후기 -->
    <div class="section2-middle2">
        <div class="section-subtitle mt-section">
```



### 한약 소개 수정
1. 기존 .section2 > .section-bottom 을, `.section .section7 > .section-bottom`으로 변경

```html

<div class="section section7">
    <!-- 한약 소개-->
    <div class="section7">
```

2. index.css의 .section2-bottom을 .section7으로 바꾸면서, html 제거
```css
/* 섹션7 - 한약소개 */
/* 새 옵션은 직접 가져가야함. */
.section7 {
    padding: 10vw 0;
}
```
```html
<!-- 한약 소개-->
<div class="section7">
```

3. index.js의 swiper 설정 등 `.section2-bottom` 을 모두 `.section7`으로 변경

4. div.medicine-box를 만들어, title 밑에 배치하고, swiper-container를 내부에 넣어주기
```html
<!-- 한약 소개-->
<div class="section section7">
    <div class="section-title">
    </div>
    <div class="medicine-box">
    </div>
</div>
```

5. 기존 .section7 > .swiper-container의 swiper설정을, 중간에 삽입된 `.medicine-box`를 추가 변경
    - index.css도 .section7 이후 `.medicine-box`  경로에 입력

```js
 let medicineSwiper = new Swiper(".section7 > .medicine-box > .swiper-container", {
```
```css
.section7 .medicine-box .swiper-container {

```

6. **section 중 .medicine-box만 모바일 85%가 아닌 100%로 변경 + swiper-container의 border제거**
```css
@media screen and (max-width: 991px) {
    .section > div:not(.medicine-box) {
        width: 85%!important;
    }
    /* 한약소개 배너공간만, 모바일에서 100% */
    .section > div.medicine-box {
        width: 100%!important;
    }
}
```
```css
@media screen and (max-width: 991px) {
    .section7 .medicine-box .swiper-container {
        /*height: 42vw;*/
        /*border-radius: 8px;*/
        height: 55vw;
        border-radius: 0;
    }
}
```
![img.png](../ui/355.png)
