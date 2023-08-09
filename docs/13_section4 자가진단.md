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
    <div class="dx-box">
    </div>
</div>
```
```css
.section3, .section4
{
    width: 100%;
    position: relative; /* */
    z-index: 666;
    background: #fff;
}

.section3 > div,
.section4 > div
{
    width: 70%;
    margin: 0 auto;
}

@media screen and (max-width: 991px) {
    .section3 > div,
    .section4 > div
    {
        width: 85%;
    }
}
```
```js
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
```


2. 진단관련 링크 3개를 flex가 아닌 boostrap으로 col-4로 3개를 나열한다.
    - 이 때, div>a의 구성으로서, `div로 배경` + `a로 글자크기 + my`로  배경 + 크기를 구성한다.
    - col-4는 점점 넓어지므로, `px`를 반응형으로 여백을 줘서, div>a의 폭을 줄인다.
```html
<div class="dx-box ">
        <!-- 진단 버튼 3개 -->
        <div class="row">
            <div class="col-4 px-3 px-md-4 px-lg-5">
                <div class="text-center rounded rounded-pill border shadow-sm"
                     style="background-image: url('images/dx/001.png');
                            background-repeat: no-repeat;
                            background-position: top center;
                            background-size: cover;
                            background-color: #efefef;">
                    <a href="#" class="d-inline-block text-decoration-none text-dark fw-bolder ">
                        <h6 class="fs-dx my-1 my-md-2 my-lg-3">디스크 진단</h6>
                    </a>
                </div>
            </div>
            <div class="col-4 px-3 px-md-4 px-lg-5">
                <div class="text-center rounded rounded-pill border shadow-sm"
                     style="background-image: url('images/dx/002.png');
                            background-repeat: no-repeat;
                            background-position: top center;
                            background-size: cover;
                            background-color: #efefef;">
                    <a href="#" class="d-inline-block text-decoration-none text-dark fw-bolder ">
                        <h6 class="fs-dx my-1 my-md-2 my-lg-3">체질 진단</h6>
                    </a>
                </div>
            </div>
            <div class="col-4 px-3 px-md-4 px-lg-5">
                <div class="text-center rounded rounded-pill border shadow-sm"
                     style="background-image: url('images/dx/003.png');
                            background-repeat: no-repeat;
                            background-position: top center;
                            background-size: cover;
                            background-color: #efefef;">
                    <a href="#" class="d-inline-block text-decoration-none text-dark fw-bolder">
                        <h6 class="fs-dx my-1 my-md-2 my-lg-3">문진표 작성</h6>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <p>123</p>
        </div>
    </div>
```
