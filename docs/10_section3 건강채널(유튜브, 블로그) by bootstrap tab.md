1. .section3를 만들고, `.section-title`의 정해진 틀을 복붙한다.
```html
<div class="section3">
    <div class="section-title">
        <div>
            <p>우아 건강채널</p>
            <p>Youtue 및 블로그 연재</p>
        </div>
        <div>
            <strong>영상과 글로</strong> 우아 한의원을 만나봐요!
        </div>
    </div>
    <div class="media-box">
        
    </div>
</div>
```

2. 이미 `.section-title`은 opacity 0  밑, 위치가 잡혀있으니, scrollmagic으로 처리되게 한다
- **맨아래 컨텐츠이므로 onCenter가 안보이면 탭도 작동X -> onEnter로 수정해놓고 나중에 수정한다.**
```js
// section3 - title with Velocity
let scene6 = new ScrollMagic.Scene({
    triggerElement: ".section3",
    triggerHook: "onCenter",
});
scene6.setVelocity([".section3 > .section-title > div"], {
    top: "0px",
    opacity: "1"
}, {
    duration: "300",
});
controller.addScene(scene6);
```

3. `.media-box`에는 boostrap으로 tab예제를 붙혀넣는다.
    - https://www.devwares.com/docs/contrast/javascript/navigation/tabs/
    - 위 사이트에서 제일기본 예시를 가져온다.
    - **`ul.nav-tabs` 속 `a.href="#"`과  `div.tab-content` 속 `div.tab-pane[id=""]`를 일치시켜준다.**
```html
<div class="media-box">
    <ul class="nav nav-tabs mb-3" id="media-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active"
               id="ex1-tab-1"
               data-bs-toggle="tab"
               href="#tabs-youtube"
               role="tab"
            >
                유튜브
            </a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link"
               id="ex1-tab-2"
               data-bs-toggle="tab"
               href="#tabs-blog"
               role="tab"
            >
                블로그
            </a>
        </li>
    </ul>
    <div class="tab-content" id="media-content">
        <div class="tab-pane fade show active"
             id="tabs-youtube"
             role="tabpanel"
        >
            Tab 1 content
        </div>
        <div class="tab-pane fade"
             id="tabs-blog"
             role="tabpanel"
        >
            Tab 2 content
        </div>
    </div>
</div>
```


4. 마지막 tab만 복사해서 추가 한 뒤,
   - li의 role="" 을 삭제, li.nav-item 클래스 삭제, a.nav-link 클래스 삭제를 해주고
   - **ms-auto를 통해 우측으로 더보기 버튼을 붙인다.**
```html
<li class="ms-auto">
    <a class=""
       href="#"
    >
        더보기
    </a>
</li>
```
![img.png](../ui/217.png)


5. 먼저 tab을 싸고 있는 `div.media-box`부터 css로 조절한다. 상하패딩만 일단 준다.
```css
/* sectino3 media tab */
.section3 .media-box {
    padding: 10px 0;
}
```

6. `ul.nav-tabs > li > a`로 글자크기를 조정해준다.
   - **활성화되기 전 기본 상태를 처리한다고 생각한다.**
   - **border:none을 해줘야 둘러싼 border가 active/hover시에 안나타난다.**
```css
.section3 .media-box .nav {
    font-size: 13px;
}

/* 활성화되기 전, tab 글자 */
.section3 .media-box .nav-tabs > li > a {
   font-size: 13px;
   color: #999;

   border: none;
}
```

7. a에 대해 `a.active`와 `:hover, :focus`를 설정해주면 된다.
   - **hover시에는 border를 제거하면 위치가 바뀔 수 있으니 `border-color:transparent`를 넣어주자.**

