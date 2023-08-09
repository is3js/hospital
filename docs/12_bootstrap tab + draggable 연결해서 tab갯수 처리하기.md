1. 더보기를 li에서 div로 바꿔서 뺄 준비를 하고, **ul.nav-tabs를 `div.tab-scroll`안에 가둔다. div.tab-scroll + 더보기를 `div.tab-wrapper`로 감싼다.**
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

2. `.tab-scroll`과 `더보기`를 
    - 가로나열하기 위해 `flex`
    - **수직정렬을 위쪽으로 몰아서 더보기도 같이 위쪽에 나타나도록 `start`로 수직정렬**
    - w-100
    - 더보기의 글자가 아래줄로 안내려가도록 `white-space: nowrap;`
```css
/* tab 스크롤을 위한 설정 */
.tab-wrapper {
    display: flex;
    align-items: start;

    width: 100%;
    /*height: 32px;*/

    white-space: nowrap; /* 더보기의 글자가 다음줄 안넘어가게 함.*/
}
```

3. `.tab-scroll`은 w-100해야하는데, 
    - 더보기 왼쪽을 꽉채우기 위해, flex-item으로서 `flex-grow: 1;`로 늘려주고
    - 더보기와의 간격을 위해 `margin-right: 10%`를 주고
    - 2줄 -> 1줄로 넘칠 때, 가려주기 위해 `overflow: hidden;`를 넣어준다.
    - **scroll될 공간자체는 무조건 `display:flex;`로 만들어놔야 드래그가 되게 된다.**
```css
.tab-wrapper > .tab-scroll {
    flex-grow: 1; /* flex-item으로서 w-100% */
    margin-right: 10%;  /* ms-auto로 우측에 몰린 더보기에 대해, 간격을 유지하기 위해 */
    
    overflow: hidden;

   /* scroll 공간은 무조건 display:flex로 만들어놔야한다. */
   display: flex;
}
```
4. `.tab-scroll > ul`의 원래 flex인 .nav-tabs는 flex-item들이 2줄로 넘어가지 않게
    - `flex-wrap:nowrap;`으로 hidden에 갖히는 1줄로 만들어준다
```css
.tab-wrapper > .tab-scroll > ul {
    /* 가로가 넘쳐 부모 height를 넘치는 경우, flex를 다 가로로 넘치게 함 */
    flex-wrap: nowrap;
}
```

```css
.tab-wrapper > .tab-scroll {
    /* 가리개 absolute를 위함 */
    position: relative;
}
```

5. 이제 양쪽에 gradient로 흰색 가리개를 `.tab-scroll`에 before/after로 주기 위해
   - gradient 참고: https://codepen.io/kidd1118/pen/qxQwvE
   - **`.scroll-opacity`를 선택자를 만들고, before/after에 대한 `relative`가 되게 한다.**
```html
<div class="tab-scroll scroll-opacity">
```

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

