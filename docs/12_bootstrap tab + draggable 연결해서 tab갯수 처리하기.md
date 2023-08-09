```html

<div class="review-box p-0">
    <div class="tab-wrapper d-flex align-items-start">
        <div class="tab-scroll">
            <ul class="nav nav-tabs mb-2 gap-1 column-gap-2" id="review-tabs" role="tablist">
            </ul>
        </div>
        <div class="ms-auto ">
            <a class="fs-tab"
               href="#"
            >
                더보기
            </a>
        </div>
    </div>
```
```css
/* tab 스크롤을 위한 설정 */
.tab-wrapper {
    width: 100%;
    /*height: 32px;*/
    white-space: nowrap; /* 더보기의 글자가 다음줄 안넘어가게 함.*/
}

.tab-wrapper > .tab-scroll {
    flex-grow: 1; /* flex-item으로서 w-100% */
    /* 우측 더보기에 대한 우측간격은 남겨두기*/
    margin-right: 10%;


    /*height: 32px;*/
    flex-wrap: nowrap;
    overflow: hidden;

    /* 가리개를 위해 row방향용 flex로 만들어 놓기 */
    display: flex;
}

.tab-wrapper > .tab-scroll > ul {
    /* 가로가 넘쳐 부모 height를 넘치는 경우, flex를 다 가로로 넘치게 함 */
    flex:none;
}
```



```css
.tab-wrapper > .tab-scroll {
    /* 가리개 absolute를 위함 */
    position: relative;
}
```

- gradient 참고: https://codepen.io/kidd1118/pen/qxQwvE
```html
<div class="tab-scroll">
    <ul class="nav nav-tabs mb-2 gap-1 column-gap-2 scroll-opacity" id="review-tabs" role="tablist">
```
```css
.nav-tabs.scroll-opacity::before {
    content: '';

    opacity: .8;

    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width:5%;

    background: linear-gradient(to left, rgba(255, 255, 255, 0.08), white);
    /* draggable(1004)보다 더 위에*/
    z-index: 2000;
}

.nav-tabs.scroll-opacity::after {
    content: '';

    opacity: .8;

    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width:5%;

    /*background: white;*/
    background: linear-gradient(to right, rgba(255, 255, 255, 0.08), white);


    /* draggable(1004)보다 더 위에*/
    z-index: 2000;
}
```
![img_1.png](../ui/283.png)
```css
.tab-wrapper > .tab-scroll {
    /* 좌측 absolute 가리개의 width만큼 패딩 주기 */
    padding-left: 5%;
}
```
![img.png](../ui/284.png)



- draggable.js 및 없으면 TweenMax.js 추가
```html
<!-- draggable js for tab -->
<script src="js/Draggable.min.js"></script>

<script src="js/index.js"></script>
```

