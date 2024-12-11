let app;
let bgBack;
let bgMiddle;
let bgFront;
let train;

window.onload = function () {
    app = new PIXI.Application({
        width: 750,  
        height: 1334, 
        backgroundColor: 0xAAAAAA
    });

    
    document.querySelector("#gameDiv").appendChild(app.view);

    app.loader.baseUrl = "image";
    app.loader
        .add("bgBack", "canyon_back.png")
        .add("bgMiddle", "fauna_medium.png")
        .add("bgFront", "sand_front.png")
        .add("train", "NH_Chicago_train_mobsters_01.gif"); 

    app.loader.onComplete.add(initLevel);
    app.loader.load();
};

function initLevel() {
    bgBack = createBg(app.loader.resources["bgBack"].texture);
    bgMiddle = createBg(app.loader.resources["bgMiddle"].texture);
    bgFront = createBg(app.loader.resources["bgFront"].texture);

    let frames = [];
    let totalFrames = 20;  
    for (let i = 0; i < totalFrames; i++) {
        frames.push(app.loader.resources["train"].texture.clone());
    }

    
    train = new PIXI.AnimatedSprite(frames);
    train.position.set(500, 640); 
    train.animationSpeed = 0.1;  
    train.play();  

    app.stage.addChild(train);

    app.ticker.add(animateTrain);
}

function animateTrain() {
    train.x += 2;  
    if (train.x > app.renderer.width) {
        train.x = -train.width;
    }
}

function createBg(texture) {
    let tiling = new PIXI.TilingSprite(texture, 750, 1334 ); 
    tiling.position.set(0, 0);
    app.stage.addChild(tiling);
    return tiling;
}
