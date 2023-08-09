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

