### section 하위로서 영역 추가

1. .section2안에 `.section2-middle2`를 만들고, `.section-subtitle`을 새롭게 만들어, 첫번째 p가 없는 새로운 영역을 만든다.
    - .section-title의 구성에서 첫번째 div의 첫번째 p만 사라지고, css설정도 .section-title의 p(2)를 p(1)에 대입해준다.
    - **subtitle만 오른쪽div의 padding-top을 줄이고, `이전위치 + velocity를 적용안한다`**
        - 애니메이션때문에, 스크롤이 내려갈때 계속 작동하는 버그 발생함.

```html
<!-- 치료후기 -->
<div class="section2-middle2 mt-5">
    <div class="section-subtitle">
        <div>
            <p>치료 후기</p>
        </div>
        <div>
            <strong>자필/ 웹/ 네이버후기 등</strong> 다양한 루트의 후기를 살펴봐요!
        </div>
    </div>
    <div class="review-box">
    </div>
</div>
```

```css
/* 섹션 title 설정 */
.section-title,
.section-subtitle {
}

/* - 섹션 title 왼쪽 div 속 p 2개 설정 */
.section-title > div:nth-of-type(1) p:nth-of-type(1) {
}

.section-title > div:nth-of-type(1) p:nth-of-type(2),
.section-subtitle > div:nth-of-type(1) p:nth-of-type(1) {
}

/* - 섹션 title 오른쪽 div 설정 */
.section-title > div:nth-of-type(2),
.section-subtitle > div:nth-of-type(2) {
}

/* - 섹션 subtitle은 오른쪽의 위쪽공간을 조금 줄인다. */
.section-subtitle > div:nth-of-type(2) {
    padding-top: 2vw;
}
```

2. div.review-box에 건강채널처럼 boostrap5 tab예시를 가져온다. 일단 `tab영역`
    - ul #id | 각 tab의 a속 id + href + 텍스트 를 각각 변경해준다

```html

<ul class="nav nav-tabs mb-3" id="review-tabs" role="tablist">
    <li class="nav-item" role="presentation">
        <!--<a class="nav-link active"-->
        <a class="nav-link active rounded-pill bg-gray me-2 py-1 px-3"
           id="review-tab-1"
           data-bs-toggle="tab"
           href="#tabs-review-1"
           role="tab"
        >
            전체
        </a>
    </li>
    <li class="nav-item" role="presentation">
        <a class="nav-link rounded-pill bg-gray me-2 py-1 px-3"
           id="review-tab-2"
           data-bs-toggle="tab"
           href="#tabs-review-2"
           role="tab"
        >
            조재성 원장님
        </a>
    </li>
    <li class="nav-item" role="presentation">
        <a class="nav-link rounded-pill bg-gray me-2 py-1 px-3"
           id="review-tab-3"
           data-bs-toggle="tab"
           href="#tabs-review-3"
           role="tab"
        >
            김석영 원장님
        </a>
    </li>
    <li class="ms-auto">
        <a class=""
           href="#"
        >
            더보기
        </a>
    </li>
</ul>
```

3. content 영역은 div#id | 각각의 div.tab-pane#id (a[href]와 일치)를 변경해준다.
    - div.tab-pane 내부에는 .row>.col만 일단 남겨둔다.
    - **tab-content 2,3번째는 div.tab-pane에 `.show` 와 `.active`가 안들어가게 해준다.**

```html

<div class="tab-content" id="review-content">
    <!-- tab 1 전체 -->
    <div class="tab-pane fade show active position-relative px-0"
         id="tabs-review-1"
         role="tabpanel"
    >
        <div class="row">
            <div class="col ">
                Tab1
            </div>
        </div>
    </div>
    <!-- tab 2 원장1 -->
    <div class="tab-pane fade position-relative px-0"
         id="tabs-review-2"
         role="tabpanel"
    >
        <div class="row">
            <div class="col ">
                Tab2
            </div>
        </div>
    </div>
    <!-- tab 3 원장2 -->
    <div class="tab-pane fade position-relative px-0"
         id="tabs-review-3"
         role="tabpanel"
    >
        <div class="row">
            <div class="col ">
                Tab3
            </div>
        </div>
    </div>
</div>
```

![img.png](../ui/236.png)

4. 건강채널 tab에 설정된 css를 같이 적용되도록 해준다.

```css
/* sectino3 media tab */
.section3 .media-box,
.section2-middle2 .review-box {
    padding: 10px 0;
}

/* 탭 기본border 삭제 */
.section3 .media-box .nav-tabs,
.section2-middle2 .review-box .nav-tabs {
    border: none;
}

/* 활성화되기 전, tab 글자 */
.section3 .media-box .nav-tabs > li > a,
.section2-middle2 .review-box .nav-tabs > li > a {
    font-size: 13px;
    color: #999;

    border: none;
}

@media screen and (max-width: 991px) {
    .section3 .media-box .nav-tabs > li > a,
    .section2-middle2 .review-box .nav-tabs > li > a {
        font-size: 9px;
    }
}

/* 활성화(a.active) tab 글자 */
.section3 .media-box .nav-tabs > li > a.active,
.section2-middle2 .review-box .nav-tabs > li > a.active {
    /*border-bottom: 2px solid var(--color-main)!important;*/
    background-color: var(--color-main);

    color: #fff;
}
```

![img.png](../ui/237.png)

5. 의료진명 tab들은 많아질 수 있으니 **me(마진right) + 더보기존재여부 + '원장님'텍스트 여부는 `-md-`이상부터 나타나게 해준다.**

```html

<li class="nav-item" role="presentation">
    <a class="nav-link rounded-pill bg-gray me-lg-2 py-1 px-3"
       id="review-tab-3"
       data-bs-toggle="tab"
       href="#tabs-review-3"
       role="tab"
    >
        김석영 <span class="d-none d-md-inline-block">원장님</span>
    </a>
</li>
<li class="ms-auto d-none d-md-block">
    <a class=""
       href="#"
    >
        더보기
    </a>
</li>
```

![img.png](../ui/238.png)

6. content의 첫번째로, card + card-img(img태그) + card-img-overlay를 사용한다
    - w-25, w-75를 줘놓고, 25%는 d-none으로 작은화면에서 안보이게 하고, 75%는 flex-grow-1로 25%가 사라지면 다차도록 만들어준다.
    - 안쪽 `.card-img-overlay`에는 `p-0`을 줘서, img.card-img와 동일한 크기로 준다.

```html
<!-- tab 1 전체 -->
<div class="tab-pane fade show active position-relative px-0"
     id="tabs-review-1"
     role="tabpanel"
>
    <div class="row">
        <div class="col">
            <div class="card border-0 w-100">
                <img class="card-img " src="images/main_section/review-bg.png" alt="">
                <div class="card-img-overlay d-flex flex-row p-0">
                    <div class="w-25 d-none d-lg-block">의료진img</div>
                    <div class="w-75 flex-grow-1 ">후기</div>
                </div>
            </div>
        </div>
    </div>
</div>
```

7. 이제 w-25안에 width를 꽉채우는 `img.img-fluid`를 줘서, height는 `배경그림보다 더 높은 원장이미지`로 넘치게 만든다.

```html

<div class="w-25 d-none d-lg-block">
    <img class="img-fluid " src="images/doctors/doctor001.png" alt="">
</div>
```

![img.png](../ui/239.png)

8. 이제 `.w-25`만 mt을 -로 만들어서, 넘친 height에 대한 높이를 맞춘다.
    - **이 떄, 이미지가 약간 내려가게 만들어놓는다.**

```html

<div class="w-25 d-none d-lg-block" style="margin-top: -60px;">
    <img class="img-fluid" src="images/doctors/doctor001.png" alt="">
</div>
```

![img.png](../ui/240.png)

9. 이제 넘치는 부분을 `.w-25`에서 `.overflow-hidden`을 통해 자리게 만든다.

```html

<div class="w-25 d-none d-lg-block overflow-hidden" style="margin-top: -60px;">
    <img class="img-fluid" src="images/doctors/doctor001.png" alt="">
</div>
```

![img.png](../ui/241.png)

- 이제 위쪽으로 넘치게 될 것이다.
  ![img.png](../ui/242.png)

10. 이미지가 위로 넘친 부분보다 약간 더 위로, **25/75의 전체 부모인** `div.card`에 `mt`를 준다.

```html

<div class="card border-0 w-100" style="margin-top: 80px;">
    <img class="card-img " src="images/main_section/review-bg.png" alt="">
    <div class="card-img-overlay d-flex flex-row p-0">
        <div class="w-25 d-none d-lg-block overflow-hidden" style="margin-top: -60px;">
            <img class="img-fluid" src="images/doctors/doctor001.png" alt="">
        </div>
        <div class="w-75 flex-grow-1 ">후기</div>
    </div>
</div>
```

![img.png](../ui/243.png)

- **하지만 w-25 이미지가 없는 lg전까지 모바일 화면은, card에 mt 80px이 필요없게 되므로 css로 `992이상에서만 mt:80px`지정해줘야한다.**
  ![img.png](../ui/244.png)

```html

<div class="card border-0 w-100">
```

```css
/* section2-middle2 치료후기 */
@media screen and (min-width: 992px) {
    /* w-25에서 위로 넘치는 img가 나타나는 구간에서 mt 추가 */
    .section2-middle2 .review-box .tab-content .card {
        margin-top: 80px;
    }
}
```

![img_1.png](../ui/255.png)
![img.png](../ui/256.png)

11. div.review-box의 padding을 0으로 만들어서, 밑에 공지사항과 그림을 붙인다(lg에서만 그림 등장 생각)

```html

<div class="review-box p-0">
```

![img.png](../ui/257.png)

12. 후기란에는 1개의 review를 예전프로젝트 mobile review를 가져온 뒤 swiper를 붙히고, 2개씩 -> 모바일에서 1개씩 나오게 할 것이다.

- 일단 텍스트 그림자 css를 추가한다

```css
/* 글자 그림자 */
/* - 배경 어두울 때 */
.text-shadow {
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
}

/* - 하얀바탕일 때 */
.text-shadow-sm {
    text-shadow: .5px .5px 3px rgba(0, 0, 0, 0.3);
}

/* - 배경 밝을 때 */
.text-shadow-lg {
    text-shadow: 1px 1px 1px #000000;
}
```

```css
.text-gray-bolder {
    color: #adadad !important;
    font-weight: bold;
}
```

```html
<!-- 치료후기 -->
<div class="w-75 flex-grow-1 ">
    <!-- 후기1. 좌측정렬 -->
    <div class="d-flex rounded w-100 py-1 ">
        <div class="flex-shrink-0 mx-1">
            <img src="images/doctors/d001.png" class="rounded"
                 alt=""
                 style="max-width: 45px"
            >
        </div>
        <div class="flex-grow-1 mx-1 text-start text-truncate ">
            <!--클리닉 명-->
            <p class="d-inline-block rounded-pill shadow-sm px-2  bg-submain m-0">
                <a href="#"
                   class="font-gs text-decoration-none fs-13 text-truncate text-white text-shadow-sm ">
                    디스크 클리닉
                </a>
                <span class="fs-13 text-white-50"> | 20대/남성</span>
            </p>

            <!--날짜와 평가점수-->
            <div class="d-flex flex-row justify-content-between fs-13 py-1 px-1">
                <div class="small text-gray-bolder">2023-07-05 | 자필스캔</div>
                <div class="small text-danger ">❤❤❤❤❤</div>
            </div>

            <!--후기 -->
            <p class="w-100 bg-gray rounded small p-2 m-0 text-wrap fs-13 border-1 border-dark">
                친절하시고 좋았습니다^^
                dddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋ
                asdfasdfasdfsadf
            </p>
        </div>

    </div>
</div>
```

![img.png](../ui/258.png)

- **문제점**
    1. 글자크기가 모바일에서 작아지도록 -> tab과 엮어서 style.css에 지정해놓고 공용으로 쓰자.
    2. **말풍선을 2줄 제한으로 -> ellipsis-2를 활용하자. 혹은 3줄으로** 


13. tab용 전용폰트를 css로 style.css에 정의해놓고 쓴다.
- 기존 스타일
```css
/* 활성화되기 전, tab 글자 */
.section3 .media-box .nav-tabs > li > a,
.section2-middle2 .review-box .nav-tabs > li > a {
    font-size: 13px;
    color: #999;

    border: none;
}

@media screen and (max-width: 991px) {
    .section3 .media-box .nav-tabs > li > a,
    .section2-middle2 .review-box .nav-tabs > li > a {
        font-size: 9px;
    }
}
```
- 새로운 css 정의 후 적용
```css
.fs-tab {
    font-size: 13px;
}

@media screen and (max-width: 991px) {
    .fs-tab {
        font-size: 9px;
    }
}
```
```css
/* 활성화되기 전, tab 글자 */
.section3 .media-box .nav-tabs > li > a,
.section2-middle2 .review-box .nav-tabs > li > a {
    /*font-size: 13px;*/
    color: #999;

    border: none;
}

/*@media screen and (max-width: 991px) {*/
/*    .section3 .media-box .nav-tabs > li > a,*/
/*    .section2-middle2 .review-box .nav-tabs > li > a {*/
/*        font-size: 9px;*/
/*    }*/
/*}*/
```
```html
<div class="media-box">
    <ul class="nav nav-tabs mb-3" id="media-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <!--<a class="nav-link active"-->
            <a class="nav-link active rounded-pill bg-gray me-2 py-1 px-3 fs-tab"
               id="ex1-tab-1"
               data-bs-toggle="tab"
               href="#tabs-youtube"
               role="tab"
            >
                우아 TV
            </a>
        </li>

        <li class="ms-auto">
            <a class="fs-tab"
               href="#"
            >
                더보기
            </a>
        </li>
```
```html
<div class="review-box p-0">
    <ul class="nav nav-tabs mb-3 gap-2" id="review-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <!--<a class="nav-link active"-->
            <a class="nav-link active rounded-pill bg-gray me-lg-2 py-1 px-3 fs-tab"
```
```html
    <!--클리닉 명-->
<p class="d-inline-block rounded-pill shadow-sm px-2  bg-submain m-0">
    <a href="#"
       class="font-gs text-decoration-none fs-tab text-truncate text-white text-shadow-sm ">
        디스크 클리닉
    </a>
    <span class="fs-tab text-white-50"> | 20대/남성</span>
</p>

<!--날짜와 평가점수-->
<div class="d-flex flex-row justify-content-between fs-tab py-1 px-1">
    <div class="small text-gray-bolder">2023-07-05 | 자필스캔</div>
    <div class="small text-danger ">❤❤❤❤❤</div>
</div>

<!--후기 -->
<p class="w-100 bg-gray rounded small p-2 m-0 text-wrap fs-13 border-1 border-dark fs-tab">
    친절하시고 좋았습니다^^
    dddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋdddddddddddddddddㅋㅋㅋ
    asdfasdfasdfsadf
</p>
```
