"use strict";

// let osc = new OffscreenCanvas(640,360);
// let ctx = osc.getContext("2d");

// ctx.arc(x,y,radius,startAngle,endAngle,antiClockwise);
// ctx.beginPath();
// ctx.arcTo(x1,y1,x2,y2,radius);
// ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
// ctx.clearRect(x,y,w,h);
// ctx.closePath()
// ctx.clip() / ctx.fill() / ctx.stroke()
// ctx.createLinearGradient(x0,y0,x1,y1);
// ctx.createPattern(canvasimagesource, repetition);
// ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
// ctx.drawImage(image,dx,dy);
// ctx.ellipse(x,y,radiusX,radiusY,rotation,startAngle,endAngle,anticlockwise);
// ctx.fillRect(x,y,w,h);
// ctx.fillText(text,x,y,maxWidth);
// ctx.filter, ctx.font, ctx.fillStyle, ctx.direction, 
//     ctx.globalAlpha, ctx.globalCompositeOperation, 
//     ctx.imageSmoothingEnabled, ctx.imageSmoothingQuality, 
//     ctx.lineCap, ctx.lineDashOffset, ctx.lineJoin, ctx.strokeStyle
//     ctx.lineWidth, ctx.miterLimit, ctx.shadowBlur, ctx.shadowColor, ctx.shadowOffsetX, ctx.shadowOffsetY
//     ctx.textAlign, ctx.textBaseline
// ctx.lineTo(x,y);

// ctx.moveTo(x,y);
// ctx.quadraticCurveTo(cpx,cpy,x,y);
// ctx.rect(x,y,w,h);
// ctx.resetTransform();
// ctx.restore()
// ctx.rotate(angle);
// ctx.save();
// ctx.scale(x,y);
// ctx.setLineDash(segments);
// ctx.setTransform(a,b,c,d,e,f);
// ctx.strokeRect(x,y,w,h);
// ctx.strokeText(text,x,y,maxWidth);
// ctx.transform(a,b,c,d,e,f);
// ctx.translate(x,y);

//#region Util
const rand = (n,x) => Math.random()*(x-n) + n;
const irand = (n,x) => Math.round(rand(n,x));
const choose = a => a[irand(0,a.length-1)];
const chooser = a => a.splice(irand(0,a.length-1),1)[0];
const rgba =  (r = 255, g = 255, b = 255, a = 1) => `rgba(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)},${a.toFixed(2)})`;
const hsla = (h=0, s = 0.5, l = .5, a = 1) => `hsla(${h.toFixed(2)}, ${(s*100).toFixed(0)}%, ${(l*100).toFixed(0)}%, ${a.toFixed(2)})`;
const mix = (a,b,v) => a*Math.min(1,Math.max(0,v)) + b*(1-Math.min(1,Math.max(0,v)));
//#endregion

class RandoCanvas {
    /**@type {CanvasRenderingContext2D} */ ctx = null;
    constructor(ctx){
        this.ctx = ctx;
    }
    setFill(){
        let degs = [0,30,60,90,120,150,180,210,240,270,300,330];
        this.ctx.fillStyle = hsla(choose(degs),rand(0.5,1),rand(0,1),rand(0.5,1));
        this.ctx.strokeStyle = hsla(choose(degs),rand(0.5,1),rand(0,1),rand(0.5,1));
        // this.ctx.fillStyle = rgba(rand(0,255),rand(0,255),rand(0,255),rand(0,1));
        // this.ctx.strokeStyle = rgba(rand(0,255),rand(0,255),rand(0,255),rand(0,1));
    }
    getDimensions(){
        const w = ctx.canvas.width, h = ctx.canvas.height;
        const d = Math.sqrt(w**2 + h**2);
        return {w,h,d};
    }
    
    strokeRandomPath(){
        const ctx = this.ctx;
        const {w,h,d} = this.getDimensions();
        ctx.beginPath();
        ctx.moveTo(rand(0,w), rand(0,h));
        for(let i = 0; i < rand(1,100);i++){
            switch(irand(0,3)){
                case 0: ctx.moveTo(rand(0,w), rand(0,h)); break;
                case 1: ctx.lineTo(rand(0,w), rand(0,h)); break;
                case 2: ctx.arcTo(rand(0,w), rand(0,h), rand(0,w), rand(0,h), rand(0,d)); break;
                case 3: ctx.rect(rand(0,w),rand(0,h), rand(0,w), rand(0,h)); break;
            }
        }

        if(rand(0,1)>0.5){ 
            ctx.stroke();
        } else{
            ctx.fill();
        }
    }
    randomText(){
        const ctx = this.ctx;
        const {w,h,d} = this.getDimensions();
        let out = "";
        for(let i = 0; i < rand(2,150); i++){
            let codepoint = choose(codepoints);
            out += String.fromCodePoint(irand(codepoint.start,codepoint.end));//irand(32,1114111));
        };
        let fs = irand(1,d);
        let ff = choose(window.fonts);
        ctx.font = `${fs}px ${ff}`;
        if(rand(0,1)>0.5){ 
            ctx.strokeText(out,rand(0,w),rand(0,h));
        } else{
            ctx.fillText(out,rand(0,w),rand(0,h));
        }
    };

    randomizeFilter(){
        let filters = [];
        for(let i = 0; i<rand(0,5); i++){
            filters.push(choose([
                "hue-rotate(%sdeg)", "brightness(%s)", "contrast(%s)", "sepia(%s)", "invert(%s)", "blur(%spx)"
            ]).replace("%s", rand(0,360)));
        }

        this.ctx.filter = filters.join(" ");
    }
    randomizePixels(){
        const ctx = this.ctx;
        const {w,h,d} = this.getDimensions();
        let x = rand(0,w-1), y = rand(0,h-1), cw = rand(1,w-x), ch = rand(1,h-y);

        let id = ctx.getImageData(x,y,cw,ch);
        for(let i = 0; i < id.data.length; i+=4){

            switch(irand(1,1) ){
                case 0:
                    id.data[i+0] = (id.data[i+0] + rand(0,255))/2;
                    id.data[i+1] = (id.data[i+1] + rand(0,255))/2;
                    id.data[i+2] = (id.data[i+2] + rand(0,255))/2;
                    id.data[i+3] = 255;
                break;
                case 1:
                    id.data[i+0] = mix(id.data[irand(0,id.data.length/4) * 4 + 0], id.data[i+0], rand(0,1));
                    id.data[i+1] = mix(id.data[irand(0,id.data.length/4) * 4 + 1], id.data[i+1], rand(0,1)); //choose(id.data);
                    id.data[i+2] = mix(id.data[irand(0,id.data.length/4) * 4 + 2], id.data[i+2], rand(0,1));// choose(id.data);
                    id.data[i+3] = 255;

            }
        }
        ctx.putImageData(id,x,y);
    }
};

window.RandoCanvas = RandoCanvas;