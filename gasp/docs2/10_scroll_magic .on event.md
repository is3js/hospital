1. **velocity의 begin, complete,progress와 비슷한 `start, end, progress`이벤트를 받아 처리할 수 있으며, function 인자로는 event를 받아면 된다.**
    - **start는 화면시작에 해당 scene이 걸리기 시작할 때이다.**
    - 퍼센티지는 function event 인자로 `event.progress`를 찍으면 된다.
```js
    /* 1. Controller + Scene객체 생성 후 add*/
    let controller = new ScrollMagic.Controller();

    /* 1) .section1에 scene 객체 생성 */
    let scene = new ScrollMagic.Scene({
        // triggerElement: "header",
        // triggerHook: "onLeave",
        // reverse: false,
        offset: 100,
        // setVelocity() 사용시 duration 주석처리해야함.
        duration: 200,
    });
    scene.setPin(".section1");
    /* 4) .section1의 scene객체 event */
    scene.on("start", function (event) {
        console.log("Hit start point of scene.")
    })
    scene.on("end", function (event) {
        console.log("Hit end point of scene.")
    })
    scene.on("progress", function (event) {
        console.log(event.progress + "%")
    })

    /* 2. controller에 scene객체 추가 */
    controller.addScene(scene);
```
