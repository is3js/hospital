1. 헤더 div 밑에 `div.section1`을 만들고 부트스트랩의 picture 예제를 가져온다.
    - 이미지를 모바일과 감별하기 위해서 **bootstrap picture > source + `img.img-fluid` 조합을 이용한다.**
    - 부트스트랩의 picture를 검색해서 복붙한다.

```html
<!-- 섹션1 -->
<div class="section1">
    <picture>
        <source srcset="..." type="image/svg+xml">
        <img src="..." class="img-fluid img-thumbnail" alt="...">
    </picture>
</div>
```

2. **source태그에 `media="(max-width: 991px)"` 속성을 줘서 lg보다 작을 때 나타나도록 간주한다.**
```html
<source media="(max-width: 991px) srcset="...">
```
