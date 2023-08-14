### 섹션 기본 세팅

```html
<!-- 자가진단 -->
<div class="section4">
    <div class="section-title">
        <div>
            <p>우아 자가진단</p>
            <p>허리 디스크 등</p>
        </div>
        <div>
            <strong>스스로 체크</strong>할 수 있는 우아한의원 시스템!
        </div>
    </div>
    <div class="facility-box">
    </div>
</div>
```

```css
.section3, .section4, .section5 {
    width: 100%;
    position: relative; /* */
    z-index: 666;
    background: #fff;
}

.section3 > div,
.section4 > div,
.section5 > div
{
    width: 70%;
    margin: 0 auto;
}

@media screen and (max-width: 991px) {
    .section3 > div,
    .section4 > div,
    .section5 > div {
        width: 85%;
    }
}
```

```js
// section5 둘러보기 - title with Velocity
let scene8 = new ScrollMagic.Scene({
    triggerElement: ".section5",
    triggerHook: "onCenter",
    // triggerHook: "onEnter",
    offset: -80,
});
scene8.setVelocity([".section5 > .section-title > div"], {
    top: "0px",
    opacity: "1"
}, {
    duration: "300",
});
controller.addScene(scene8);
```

### 병원 둘러보기 with boostrap card
1. 부트스트랩으로 `.card-img-top`으로 위쪽에 사진배치하는 예시카드를 넣는다.
    - **이 때, .card의 전체 rounded-x 와 .card-img-top의 .rounded-top-x가 동일해야한다.**
```css
/* 글자 투명도 */
.text-white-70 {
    --bs-text-opacity: 1;
    color: rgba(255, 255, 255, 0.7) !important;
}
```
```html

<div class="facility-box">
    <div class="row">
        <div class="col">
            <div class="card border-0 bg-main rounded-5">
                <img src="images/facility/main-fac1.jpg" class="card-img-top rounded-top-5 " alt="...">
                <div class="card-body text-start ps-3 ps-md-4 ps-lg-5">
                    <h5 class="card-title text-white ">접수실</h5>
                    <p class="card-text text-truncate text-white-70">접수와 대기를 하는 공간</p>
                </div>
            </div>
        </div>
    </div>
</div>
```
2. font를 정해준다.
```css
.fs-facility-title {
    font-size: 25px;
    font-weight: bold;
}

.fs-facility-text {
    font-size: 16px;
    font-weight: bold;
}


@media screen and (min-width: 992px) and (max-width: 1399px) {
    .fs-facility-title {
        font-size: 20px;
        letter-spacing: -.01rem;
    }
    .fs-facility-text {
        font-size: 16px;
        letter-spacing: -.01rem;
    }
}

@media screen and (max-width: 991px) {
    .fs-facility-title {
        font-size: 17px;
        letter-spacing: -.01rem;
    }
    .fs-facility-text {
        font-size: 13px;
        letter-spacing: -.01rem;
    }
}
```

```html
<div class="card-body text-start ps-3 ps-md-4 ps-lg-5">
    <h5 class="card-title fw-bold text-white fs-facility-title">
        01 접수실
    </h5>
    <p class="card-text text-truncate text-white-50 fs-facility-title fs-facility-text">
        접수와 대기를 하는 공간
    </p>
</div>
```

![img.png](../ui/300.png)
