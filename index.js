"use strict";
const rand = (n,x) => Math.random()*(x-n) + n;
const irand = (n,x) => Math.round(rand(n,x));

(async function(){
    await Promise.all([
        import("./js/fonts.js"),
        import("./js/codepoints.js"),
        import("./js/randocanvas.js"),
    ]);

    const canvas = window.canvas = document.querySelector("canvas");
    const ctx = window.ctx = canvas.getContext("2d");
    const randocanvas = window.randocanvas = new RandoCanvas(ctx);
    document.body.addEventListener("click", function(){
        canvas.requestFullscreen();
    });
    const loop = function(){

        for(let i = 0; i<rand(1,3); i++){
            switch(irand(0,2)){
                case 0:
                    randocanvas.setFill();
                    randocanvas.strokeRandomPath();
                    break;
                case 1:
                    randocanvas.setFill();
                    randocanvas.randomText();
                    break;
                case 2:
                    randocanvas.randomizePixels();
                    break;
                

            }
        }

        
    };
    const trigger = function(){
        loop();
        requestAnimationFrame(trigger);
    };
    trigger();
    
})();