### 모양 잡기
![img.png](../ui/182.png)
![img_1.png](../ui/183.png)

1. .section1를 relative로 만들고, 내부 swiper-container 아래형제로 예약tab `div.booking-service`를 `lg`일때만 보이게, `absolute`로 만든다.
    - swiper의 스크롤바 등이 60% + left 5% -> 총 70%를 먹는다고 치고 `right: 5% + width 20% (총 30%)`로 지정해준다.

```css
/* 예약 */
.section1 {
    position: relative;
}
```

```html

<div class="section1 ">
    <div class="swiper-container">
    </div>
    <!-- 예약 tab -->
    <div class="booking-service d-none d-lg-block">
    </div>
</div>
```

```css
.booking-service {
    position: absolute;
    width: 20%;
    right: 5%;
}
```

2. .section1을 `모바일에서만 h-100vh`로 맞추고, lg일때는 content만큼만 차지하게 두어, `bottom:5%`로 위치를 잡는다

```css
@media screen and (max-width: 991px) {
    .section1 {
        height: 100vh;
    }
}
```

- bottom5%, right5%시작하는 `전체 height`를 `280px`로 변수로 따로 빼서 지정한다.
- 이제 `:before`로 뒤에 깔릴 `content ~ 끝`까지의 높이 = 전체 - tab높이를 `230px`로 잡되 **더 판하게 `tab높이`를 `50px`로 변수로 뺀다**
- 그렇다면 content높이는 `전체높이(280px)` - `tab높이(50px)` = 230px로 계산하게 되어 `:before`를 block으로 잡아준다.
- before는 absolute로 만들고 bottom0으로 잡아준다.

```css
:root {
    /* 예약 tab 탭 */
    --booking-service-height: 280px;
    --booking-service-tab-height: 50px;
}
```

```css
/* 예약 투명색 전체 박스 box 280 */
.booking-service {
    position: absolute;
    width: 20%;
    right: 5%;

    bottom: 5%;
    height: var(--booking-service-height);
    z-index: 9999;

    /* 임시 */
    background: #ddd;
    opacity: .6;
}
```

```css
/* 예약 전체-tab 높이만큼, 뒤에 깔린 배경 */
.booking-service:before {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0; /* 만약, content의 left여백이 있다면 그만큼 주기?! */

    display: block;
    width: 300%; /* block이어도 화면 끝까지 안감. 직접 크게 줘야한다.*/
    height: calc(var(--booking-service-height) - var(--booking-service-tab-height));

    /* 임시 */
    background: red;
}
```

![img.png](../ui/184.png)

- right와 bottom을 수시로 조정할 수 있게 변수로 빼준다.

```css
:root {
    --booking-service-right : 3%;
    --booking-service-bottom : 5%;
}
```
3. **이제 전체에서 `tab` + `content`를 flex-column으로 나열할 div `booking-service-box`를 만든다.**

```html

<div class="booking-service d-none d-lg-block">
    <div class="booking-service-box">
```

```css
.booking-service-box {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: var(--booking-service-height);
}
```

4. `ul.tab`과 `div.content`를 나눠서 div를 만든다.

```html    <div class="booking-service d-none d-lg-block">

<div class="booking-service-box">
    <!-- tab (50px)-->
    <ul class="booking-service-tab">
    </ul>
    <!-- content (230px)-->
    <div class="booking-service-content">
```

5. ul태그인 tab은 스타일제거 + 가로나열을 위한 `w-100 + flex ul`로 만들어주고, `m-0,p-0의 h50px`로 고정해준다.

```css
.booking-service-tab {
    list-style: none !important;
    display: flex;
    align-items: center;
    width: 100%;

    margin: 0;
    padding: 0;
    height: var(--booking-service-tab-height);
}
```

- li태그는 아직 없지만, **w-100을 각 영역마다 채울 `flex:1` + 텍스트 가운데정렬을 해준다.**

```css
.booking-service-tab > li {
    flex: 1;
    text-align: center;
}
```

6. content도 w-100에 height는 before처럼 전체높이-tab높이로 계산해준다.
    - 아래쪽에만 radius를 15px로 잡아준다.

```css
.booking-service-content {
    width: 100%;
    height: calc(var(--booking-service-height) - var(--booking-service-tab-height));
    border-radius: 0 0 15px 15px;
    /* 임시 */
    background-color: blue;
}
```

![img.png](../ui/185.png)

- 전체:before가 radius만든 것을 덮어쓰므로 left 20%정도만 밀어준다.

```css
.booking-service:before {
    /*left: 0;*/ /* content의 border radius를 뒤에서 삐져나와서 약간 이동*/
    left: 20%;
}
```

![img.png](../ui/186.png)

7. content 높이도 root에서 미리 계산해놓는다.

```css
:root {
    --booking-service-content-height: calc(var(--booking-service-height) - var(--booking-service-tab-height));
}
```

8. **이제 ul.tab에 li들을 정의해놓는다.**
    - `tab용 li`는 `on`을 **첫번쨰 요소에 미리 줘놓고, content가 처리**되게 한다.
    - li안에 `a태그`로 스타일을 결정되게 하고, a태그에는 `href="#추후 구현될 content box id"`를 미리 지정해놓는다.
    - `a태그`의 스타일은 `.tab1` `.tab2`로 일단 처리해놓는다.
    - **즉, `li.on`는 tab-content 전체 처리, `a#content_id.tab`으로 tab스타일**
```html
<!-- tab (50px)-->
<ul class="booking-service-tab">
    <li class="on">
        <a href="#booking-service1" class="tab1">예약 신청</a>
    </li>
    <li>
        <a href="#booking-service2" class="tab2">SNS 상담</a>
    </li>
</ul>
```

9. tab의 li속 a태그는 `기본적으로`, `block`으로 가로나열flex-item의 내부를 꽉 채우고, fz/colo를 정해준다.
   - radius를 위쪽에만 주고, **`lh를 tab높이로`줘서, a태그가 tab높이 전체를 차지하게 한다.**
   - 배경을 줘야 radius가 보이게 되는데 `.on`여부에 달라지도록 해야한다. **일단 임시로 red로 줘서 확인한다.**
```css
.booking-service-tab > li > a {
    display: block; /* a태그를 flex-item 내 가득 채우기 */

    line-height: var(--booking-service-tab-height);
    font-size: 20px;
    color: #fff;

    border-radius: 15px 15px 0 0;

    /* 임시 */
    background: red;
}
```
- 변수로 뺄 건 빼준다.
```css
.booking-service-tab > li > a {
    display: block; /* a태그를 flex-item 내 가득 채우기 */

    line-height: var(--booking-service-tab-height);
    font-size: var(--booking-service-tab-font-size);
    color: #fff;

    border-radius: 15px 15px 0 0;
}
```
![img.png](../ui/187.png)

10. li>a의 임시배경을 지우고, `.on`여부에 따라 `배경 + 글자색`이 달라지게 작성한다.
- **`.on`일때의 색은 `content 배경` + `:before 여분`과 같아야하므로 변수로 따로 빼야한다.**
- 전체 회색 + 투명도를 제거해준다.

```css
:root {
    /* 예약 tab 탭 */
    --booking-service-width: 20%;
   
    --booking-service-tab-font-size: 16px;
   
    --booking-service-color: #ddd;
    --booking-service-opacity: .8;
}
```
```css
.booking-service {
    /* 임시 */
    /*background: #ddd;*/
    /*opacity: .6;*/
   opacity: var(--booking-service-opacity);
}
```
- 사실상의 배경은 전체의 before + content
```css
.booking-service:before {
    background: var(--booking-service-color);
}
```
```css
.booking-service-content {
    background: var(--booking-service-color);
}
```

- **이제 li의 .`on`여부에 따라서 a의 스타일을 바꿔준다.**
```css
/* 예약  tab 글자 - .on일 때 */
.booking-service-tab > li.on > a {
    background-color: var(--booking-service-color);
    color: #333;
}

/* 예약  tab 글자 - .on이 아닐 때 */
.booking-service-tab > li:not(.on) > a {
    background-color: #00b3b2;
    color: #fff;
}
```
![img.png](../ui/188.png)


### tab 갯수에 따라 content 속 `div#service` 잡기 
1. content 내부에` #service1,2 div`를 만든다. 이 때 `좌우 padding을 %`로 주기위해 `.content-box` 클래스를 추가한다.
   - 내부에 h3로 생략되는 `.blind` 태그를 제목으로 준다.
   - 2번째 content는 display:none으로 준다.
   - h3 형제로 form을 감쌀 `빈div`를 만들어준다.
```html
<!-- content (230px)-->
<div class="booking-service-content">
    <div id="booking-service1" class="content-box">
        <h3 class="blind">온라인 예약</h3>
       <div></div>
    </div>
    <!-- content 2 -->
    <div id="booking-service2" class="content-box" style="display: none;">
        <h3 class="blind">SNS 상담</h3>
       <div></div>
    </div>
``` 

- content 전체는 w-100을 css로 + height는 content높이로 준다. 아래쪽만 raidus를 준다.
```css
.booking-service-content {
    width: 100%;
    height: var(--booking-service-content-height);
    border-radius: 0 0 15px 15px;
    background: var(--booking-service-color);
}
```

- 제목은 안보이도록 visible hidden + abosolute+left -5000px w0h0 fz0lh0 으로 아예 안보이게 만든다.
```css
.blind {
    visibility: hidden;
    position: absolute;
    left: -5000px;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
}
```

- content-box는 `좌우 padding` 각 `5%`씩 + `상하패딩은 좀 더 작게` 준다.
```css
.booking-service-content .content-box {
    /*display: none;*/
    padding: 2% 5%;
}
```

### content 내부 구성요소 자리잡기
1. 빈div에 `div.bs-form-wrapper` + (`div.bs-validate`>`p.validate` + `button.btn-bs`) + `p.bs-time`으로 4가지 구성을 해준다.

```html

<div id="booking-service1" class="content-box">
    <h3 class="blind">온라인 예약</h3>
    <div>
        <div class="bs-form-wrapper">
        </div>
        <div class="bs-validate">
            <!-- show/hide -->
            <p class="validate"></p>
        </div>
        <button type="button" class="btn-rev">예약</button>
        <p class="bs-time">7월 26일(수) 진료시간은 9시~19시 입니다.</p>
    </div>
</div>
```

2. `div.bs-validate`는 **`height` + `중간요소로서 pt`**를 입력해준다.
```css
.bs-validate {
    height: 35px;
    padding-top: 5px;
    box-sizing: border-box;
}
```
3. **내부 p.validate에는 `임시 예시텍스트`를 넣어주고, color+fz+lh를 지정해준다.이 때, div.bs-validate보다 작게 lh를 지정하고 그것보다 작게 fz를 지정해준다.**
```html

<div class="bs-validate">
    <!-- show/hide -->
    <p class="validate">예시입니다.</p>
</div>
```
```css
/* validate 자리 */
.bs-validate {
    height: 35px;
    padding-top: 5px;
}

.bs-validate .validate {
    color: #fd4d4d;
    line-height: 20px;
    font-size: 13px;
}
```
![img.png](../ui/189.png)

- **이제 p태그에 padding-left + background `가로0% 세로x%`조합으로 아이콘을 입력한다.**
```css
.bs-validate .validate {
    color: #fd4d4d;
    line-height: 20px;
    font-size: 13px;

    background: url("../images/main_section/ico-i.png") no-repeat 0 2%;
    padding-left: 7%;
}
```
![img.png](../ui/190.png)

- 이제 임시텍스트를 뺀다. **p태그에 글자가 빠지면 w0이 되어버려서, background icon도 안나오게 된다.**

```html
<div class="bs-validate">
   <!-- show/hide -->
   <p class="validate"></p>
</div>
```

4. 이제 `button.btn-bs`의 스타일을 정해준다.
   - w100% + h + bg조합으로 크기와 색을 정하고, border 0 + radius + cursor:pointer를 넣어준다.
   - 이후 fz설정을 해준다.
```css
/* 예약 버튼 */
.booking-service-box .btn-bs {
   width: 100%;
   height: var(--booking-service-tab-height);
   background: #82a8ff;

   border: 0;
   border-radius: 8px;
   cursor: pointer;

   font-size: var(--booking-service-tab-font-size);
   font-weight: 700;
   color: #fff;
}
```
![img.png](../ui/191.png)


5. 맨 아래 p태그는, 중간요소로서 `mt`를 넣어주면서 글자크기를 조절해준다.
```css
/* 예약 진료시간 p태그  */
.bs-time {
    font-size: calc(var(--booking-service-tab-font-size) * .8);
    margin-top: 5px;
    letter-spacing: -0.04rem;
}
```
![img.png](../ui/192.png)


### content form wrapper내부 form 작성하기
1. .bs-form-wrapper속에 `flex between`으로 `2개의 input`을 배치할 수 있도록 `div.d-flex.between`을 만든다
   - **2개씩 flex-item을 배치하는 부모 flex+between이 반복되기 때문에`.bs-form`에 css로 정의한다.**
   - **추가로 각 row별로 .bs-form을 구성할 것이므로 mt도 5px씩 준다**
```html

<div class="bs-form-wrapper">
    <div class="bs-form">
    </div>
</div>
```
```css
.booking-service-content .bs-form {
    display: flex;
    justify-content: space-between;

    margin-top: 5px;
}
```


2. 이제 .bs-form안에 flex-item을 `width %`로 주는데, 양쪽벌려지는 상태니, **`사이여백은 2개를 100% 안채워서, 벌어지게` 한다.**
   - 이때 **select태그 대신, `div.select-clinic-wrapper` > `button.btn-select` + `div.select-clinic`의 드롭다운 형태를 가져가며**
   - **wrapper `.open`시  자식의 `div`가 보이도록 설정한다.**

```html
<div class="bs-form">
    <!-- 클리닉 선택-->
    <!-- 자식 button click -> 부모 wrapper  .open시 -> 화살표회전 + select-clinic display:block-->
    <div class="select-clinic-wrapper">
        <button type="button" class="btn-select">
            통증 클리닉
        </button>
        <div class="select-clinic">
        </div>
    </div>
</div>
```

3. 드랍다운 button, div를 포함하는 wrapper는 w100을 씌워둔다.
```css
.select-clinic-wrapper {
    /*position: relative;*/
    z-index: 13;
    width: 100%;
}
```
4. button은 select로서 40%를 차지하게 둔다.(나머지를 60%보다 모자라게 준다.)
   - select button으로서 absolute bg icon을 넣기 위해 `relative`로 준다.
   - height는 tab크기로 일괄준다
   - border설정을 주고
   - text는 left로 정렬해주고, padding-left로 간격을 준다.
   - bg를 흰색으로 주고, cursor를 pointer로 준다.
```css
/* 예약 between 1 드랍다운 버튼 */
.select-clinic-wrapper .btn-select {
    /*display: inline-block;*/
    position: relative;
    width: 40%;
    height: var(--booking-service-tab-height);

    border: 1px solid #ddd;
    border-radius: 6px;

    padding-left: 5%;
    text-align: left;
    font-size: calc(var(--booking-service-tab-font-size) * .8);
    color: #333;
    letter-spacing: -0.09rem;
    
    background: #fff;
    cursor: pointer;
}
```

5. 버튼의 dropdown icon을 `:after` + `top 0 right0`으로 지정한 후, `block` + `w/h`를 지정한 뒤, bg의 위치를 조정한다
- w/h는 높이(tab높이)의 .8을 calc()한다
- bg의 position를 `50% 50%`로 줘서,**가로는 50%시작, 세로도 50% 다써서 중앙에잇는 화살표로 시작하게 한다**

```css
/* 드랍다운 화살표 */
.select-clinic-wrapper .btn-select:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;

    display: block;
    width: calc(var(--booking-service-tab-height) * .8);
    height: calc(var(--booking-service-tab-height) * .8);
    border-radius: 6px;

    background: url(../images/main_section/sel-arrb.png) no-repeat 50% 50%;
}
```

6. 이제 부모 wrapper가 `.open`을 획득시, :after에 달린 icon bg img를 180도 회전시켜준다. 
   - **이 때, 50% 100%의 bg position을 지정해줘야한다.**
```css
/* 예약 부모 wrapper .open시 자식button의 :after bg icon는 180도 뒤집어서 */
.select-clinic-wrapper.open .btn-select:after {
   transform: rotate(180deg);
   background-position: 50% 100%;
}
```

- 부모 wrapper를 open시킨 뒤 확인해본다.

```html
<div class="select-clinic-wrapper open">
```
![img.png](../ui/193.png)
