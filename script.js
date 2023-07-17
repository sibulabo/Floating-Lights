
const Light_count = 30;                             //光の数を設定
const stage = document.querySelector(".stage");     //stageクラスを持つ要素を取得

//100msec毎にLightを作成するループ
for (let i = 0; i < Light_count; i++) {
    setTimeout(() => {
        //createLight関数を呼び出して、Lightを作成
        createLight(i);
    }, 100);
}

//Lightを作成する関数
function createLight(i) {
    let span = document.createElement("span");  //span要素を作成
    stage.appendChild(span);                    //span要素をstageに追加

    //span要素の初期設定
    gsap.set(span, {
        left: gsap.utils.random(0, stage.offsetWidth),                      //spanの水平位置（左右）をランダムに設定
        top: gsap.utils.random(stage.offsetHeight / 2, stage.offsetHeight), //spanの垂直位置（上下）を下半分の範囲でランダムに設定
        scale: gsap.utils.random(.8, 2, .1),                              //spanの拡大縮小率をランダムに設定
        opacity: gsap.utils.random(.1, .8, .1)                              //spanの透明度をランダムに設定
    });

    //タイムライン生成
    let tl = gsap.timeline({
        paused: true,           //アニメーションを一時停止した状態で開始する（後のtl.play()で動作開始）
        onComplete: () => {     //タイムライン終了時の処理
            span.remove();          //アニメーションが完了したら、要素を削除
            createLight(i);         //createLight関数を再度呼び出して新しいLightを生成
        }
    });

    //span要素の動きを時系列に定義
    //(1) span要素を下から上方向に移動
    tl.to(span, {
        y: -stage.offsetHeight - span.offsetHeight, // 要素を上方向に移動させ、画面外に移動させる
        duration: gsap.utils.random(3, 10, .1), // 移動の持続時間をランダムに設定
        ease: Power0.easeNone // イージング関数を設定（等速）
    });
    //(2) span要素をゆらゆら左右に揺らす
    //  最初は、-30～30px(5刻み)の範囲で左右に 1秒かけて移動。（"<":直前のトゥイーンの開始時に発動）
    tl.to(span, {
        x: gsap.utils.random(-30, 30, 5),   //要素を左右にランダムに振動させる
        duration: 1,                        //振動の持続時間を1秒に設定
        ease: Power1.out                    //イージング関数を設定（アウトクォート）
    }, "<");
    //  2～5回目は、-30～30px(5px)の範囲で左右に 2～4秒かけて移動。（">":直前のトゥイーンの終了時に発動）
    for (var j = 0; j < 3; j++) {
        tl.to(span, {
            x: gsap.utils.random(-30, 30, 5),       // 要素を左右にランダムに振動させる
            duration: gsap.utils.random(2, 4, .5)   // 振動の持続時間をランダムに設定
        }, ">");
    }

    tl.play();  //アニメーションを再生
}
