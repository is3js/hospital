1. section2의 맨 앞에 붙여넣고, d-lg-none으로 모바일에서만 보이게 하기
```html
<!-- 섹션2: main -->
<div class="trigger-section2"></div>
<div class="section2">
    <!-- 예약 tab -->
    <div class="booking-service d-lg-none">
        <div class="booking-service-box">
```


2. `-mobile`의 css 만들기
```css
.booking-service-mobile {
    position: static;
    padding-top:10px; /* 모바일 추가*/
}
```
```css
.booking-service-box-mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: var(--booking-service-height);
}
```

```css
.booking-service-tab-mobile {
    list-style: none !important;
    display: flex;
    align-items: center;
    width: 100%;

    margin: 0;
    padding: 0 5%; /* 모바일은 tab에 패딩 추가*/
    height: var(--booking-service-tab-height);
}
```
```css
.booking-service-tab > li,
.booking-service-tab-mobile > li {
    
}
```

3. tab의 `.on이 없을 때`의 a디자인은 mobile에서 완전히 달라짐 등 tab디자인 설정
```css
.booking-service-tab-mobile > li > a {
    display: block; /* a태그를 flex-item 내 가득 채우기 */

    line-height: var(--booking-service-tab-height);
    font-size: var(--booking-service-tab-font-size);
    color: #333;

    border-radius: 5px 5px 0 0; /* 모바일 radius 약하게*/
    border: 1px solid #e5e5e5; /* 모바일 보더 추가*/

    cursor: pointer;
}
```
```css
.booking-service-tab-mobile > li.on > a {
    background-color: var(--booking-service-color);
    color: #333;
    border-bottom: 1px solid #fff; /* 모바일에서는 bottom border를 넣어서, content의 top을 넢는다*/
}
```
- mobile에서는 tab에 ::before로 border-bottom을 회색선을 넣어주되, before의 원본에는 relative / before에는 absolute를 넣어줘야한다.
```css
.booking-service-tab-mobile {
    position: relative;
}
```
```css
.booking-service-tab-mobile:before {
    content: '';
    display: block;
    width: 100%;

    height: 1px;
    background-color: #e5e5e5;

    position: absolute;
    left: 0;
    bottom: -1px; /* 원본의 border 1px과 겹치게 하기 위해 1px 내림*/
}
```
```css
.booking-service-tab-mobile > li.on > a {
    background-color: var(--booking-service-color);
    color: #333;
    
    border-bottom: 1px solid #fff; /* 모바일에서는 흰색 bottom border를 넣어서, tab의 :before 선을 덮는다*/
    position: relative; /* absolute의 before 선을 덮어쓰려면 relative로 바꿔줘야한다. */
}

.booking-service-tab-mobile > li:not(.on) > a {
    background-color: #f1f1f1;
    color: #aaaaaa;
}
```
```css
/* 예약 버튼 */
.booking-service-box .btn-bs,
.booking-service-box-mobile .btn-bs {
    
}
```
![img.png](../ui/216.png)

3. content 디자인 설정
    - 동적인 부분은 최대한 바꾸지말고, 디자인부분만 `-mobile`을 달아서 css class를 추가해준다.
4. radio는 id가 똑같은게 생기면 클릭이 안되니 id-label연결 id에 `_M`을 붙여준다
```html
  <input type="radio"
         name="GET_FirstYN"
         id="GET_FirstY_M"
         value="Y">
<label for="GET_FirstY_M">초진</label>
```

5. 모바일에서는 w100%이 되게하고 radius를 제거하자
```css
@media screen and (max-width: 991px) {
    .section2 > div {
        width: 85%;
    }

    .section2 > .booking-service-mobile {
        width: 100%;
    }
}
```
```css
.booking-service-content-mobile {
    width: 100%;

    /*border-radius: 7px;*/
    border-radius: 0;
    background: var(--booking-service-mobile-color);
}
```
```css
.booking-service-tab-mobile > li > a {
    /*border-radius:7px 7px 0 0; !* 모바일 radius 약하게*!*/
    border-radius: 15px 15px 0 0; /* 모바일 radius 약하게*/
}
```

6. jquery에 모바일버전 추가하기
```js
    // 첫번째 tab을 제외하고 hide
    $(".booking-service-content > div").eq(tabIndex).show().siblings().hide();
    // - 모바일
    $(".booking-service-content-mobile > div").eq(tabIndex).show().siblings().hide();
```
```js
    // 모바일
    $(".booking-service-tab-mobile > li > a").on('click', function () {
```
```js
    // - 모바일
    $('.select-clinic-wrapper .btn-select-mobile').on('click', function () {
        $(this).parent().toggleClass('open');
    });
```
- 클리닉에 대해서는 내부에서 text만 모바일 셀렉트 버튼에 처리해준다.
```js
    $('.select-clinic-wrapper .clinic_code').on('click', function () {
        // - 모바일
        $('.btn-select-mobile').text(currentClinicText);
```

7. **select태그는, 기존input들은 `name공통` -> 모바일에 id만 달라도 검증시, 1개만 추출되어 검사됨인데, `select태그의 경우, name으로 추출시, pc 태그까지 복수로 잡힌다`**
   - **그래서 찾아낸 방법이 `:visible`로 `현재 화면에 보이는 태그만 필터링`하도록 하면 1개만 잡히며, 모든 태그에 추가해준다.**
```js
  // 5) 상담시간 검증
  if ($('select[name="GET_ConsultTime' + namePostFix +'"]:visible').val() === "") {
      $(".validate").text("상담 시간을 선택해주세요.");
      return false;
  }
```
```js
        // 1) 클리닉 선택 검증 by hidden input
        if ($('input[name="GET_ClinicCode' + namePostFix + '"]:visible').val() == '') {
        // 2) 초/재진 radio checked 검증
        if ($('input[name="GET_FirstYN' + namePostFix + '"]:visible').is(':checked') == false) {
        // 3) 이름 검증
        if ($('input[name="GET_Name' + namePostFix + '"]:visible').val().length < 2) {
        // 4) 전화번호 검증 ( 번호최소 9글자 + 하이픈 1~3개)
        if ($('input[name="GET_Tel' + namePostFix + '"]:visible').val().length < 10) {
        // 검증다통과시 .validate 텍스트 돌려놓기
        $(".validate:visible").text("");
```
8. 추가로 pc와 모바일이 공통으로 사용되는 곳에 visible을 달아서 처리해준다.
```js
// 1. 셀렉트 버튼의 텍스트변경
$('.btn-select:visible').text(currentClinicText);
// - 모바일
$('.btn-select-mobile:visible').text(currentClinicText);
```
