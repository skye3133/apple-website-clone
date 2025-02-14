// (()=>{})();

(()=>{

  let yOffset = 0; //window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffet)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
  let enterNewScene = false; //새로운 씬이 시작된 순간 true

  const sceneInfo = [
    {
      //0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs : {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas : document.querySelector('#video-canvas-0'),
        context : document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages : []
      },
      values : {
        videoImageCount : 300,
        imageSequence : [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      }
    },
    {
      //1
      type: 'normal',
      // heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs : {
        container : document.querySelector('#scroll-section-1')
      }
    },
    {
      //2
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs : {
        canvas : document.querySelector('#video-canvas-2'),
        context : document.querySelector('#video-canvas-2').getContext('2d'),
        videoImages : [],
        container : document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin')
      },
      values: {
        videoImageCount : 960,
        imageSequence : [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
      }
    },
    {
      //3
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs : {
        container : document.querySelector('#scroll-section-3'),
        canvas : document.querySelector('.image-blend-canvas'),
        context : document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath : [
          './images/tansan.png',
          './images/tansan_tanso.png'
        ],
        images : []
      },
      values : {
        rect1X : [0, 0, { start: 0, end: 0 }],
        rect2X : [0, 0, { start: 0, end: 0 }],
        blendHeight : [0, 0, {start: 0, end: 0}],
        canvas_scale: [0, 0, {start: 0, end: 0}],
        rectStartY: 0,
      }
    },
  ]

  function setCanvasImage() {
    let imgElem;
    for(var i = 0; i < sceneInfo[0].values.videoImageCount; i++){
      imgElem = new Image();
      imgElem.src = `./video/003/cider ${20 + i}.jpg`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
    let imgElem2;
    for(var i = 0; i < sceneInfo[2].values.videoImageCount; i++){
      imgElem2 = new Image();
      imgElem2.src = `./video/002/IMG_${7027 + i}.jpg`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    let imgElem3;
    for(var i = 0; i < sceneInfo[3].objs.imagesPath.length; i++){
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[3].objs.imagesPath[i]
      sceneInfo[3].objs.images.push(imgElem3);
    }
  }
  setCanvasImage();

  function setLayout(){
    //각 스크롤 섹션의 높이 세팅
    for(let i = 0; i < sceneInfo.length; i++){
      if(sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }else if(sceneInfo[i].type === 'normal'){
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for(let i = 0; i < sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset){
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id',`show-scene-${currentScene}`)

    
    const widthRatio = window.innerWidth / sceneInfo[0].objs.canvas.width;
    const heightRatio = window.innerHeight / sceneInfo[0].objs.canvas.height;
    // console.log('width:::::::' + widthRatio,'height:::::::' + heightRatio);
    let canvasScaleRatio;

    if(widthRatio <= heightRatio){
      canvasScaleRatio = heightRatio;
    }else{
      canvasScaleRatio = widthRatio;
    }

    const heightRatio2 = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio2})`;
  }

  function calcValues(values, currentYOffset){
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    if(values.length == 3){
      //start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      const partScrollRatio = currentYOffset - partScrollStart;
      
      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
        rv = (partScrollRatio / partScrollHeight) * (values[1] - values[0]) + values[0];
      }else if(currentYOffset < partScrollStart){
        rv = values[0]
      }else if(currentYOffset > partScrollEnd ){
        rv = values[1]
      }
    }else{
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation(){
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight

    switch(currentScene){
      case 0 : 

        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);

        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }
        
        break;

      case 2 : 
        // console.log('2 play')
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          //in
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        }else{
          //out
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }
        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.83) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        //currentScene 3에서 끄는 캔버스를 미리 그려주기 시작
        if(scrollRatio > 0.9){
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          // console.log('width:::::::' + widthRatio,'height:::::::' + heightRatio);
          let canvasScaleRatio;

          if(widthRatio <= heightRatio){
            canvasScaleRatio = heightRatio;
          }else{
            canvasScaleRatio = widthRatio;
          }

          objs.canvas.style.transform = `scale(${canvasScaleRatio})`
          objs.context.fillStyle = '#fff';
          objs.context.drawImage(objs.images[0], 0, 0);

          //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          const reCalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const reCalculatedInnerHeight = window.innerHeight / canvasScaleRatio;


          const whiteRectWidth = reCalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - reCalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] = values.rect1X[0] + reCalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          //좌우 흰색 박스 그리기
          // objs.context
          objs.context.fillRect(values.rect1X[0],0, parseInt(whiteRectWidth), objs.canvas.height)
          objs.context.fillRect(values.rect2X[0],0, parseInt(whiteRectWidth), objs.canvas.height)
          // objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)),0, parseInt(whiteRectWidth), objs.canvas.height)
          // objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)),0, parseInt(whiteRectWidth), objs.canvas.height)
        }
        break;

      case 3 : 
        // console.log('3 play')
        //가로 세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        // console.log('width:::::::' + widthRatio,'height:::::::' + heightRatio);
        let canvasScaleRatio;

        if(widthRatio <= heightRatio){
          canvasScaleRatio = heightRatio;
        }else{
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`
        objs.context.fillStyle = '#fff';
        objs.context.drawImage(objs.images[0], 0, 0);

        //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const reCalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const reCalculatedInnerHeight = window.innerHeight / canvasScaleRatio;


        if(!values.rectStartY){
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight ;
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight ;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = reCalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - reCalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + reCalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        //좌우 흰색 박스 그리기
        // objs.context
        // objs.context.fillRect(values.rect1X[0],0, parseInt(whiteRectWidth), objs.canvas.height)
        // objs.context.fillRect(values.rect2X[0],0, parseInt(whiteRectWidth), objs.canvas.height)
        objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)),0, parseInt(whiteRectWidth), objs.canvas.height)
        objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)),0, parseInt(whiteRectWidth), objs.canvas.height)


        if(scrollRatio < values.rect1X[2].end){
          step = 1;
          // console.log('캔버스 닿기 전')
          objs.canvas.classList.remove('sticky');
        }else{
          step = 2;
          // console.log('캔버스 닿은 후')
          // 이미지 블렌드
          // imageBlendY : [0, 0, {start: 0, end: 0}],
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
          const blendHeight = calcValues(values.blendHeight, currentYOffset);
          
          objs.context.drawImage(objs.images[1], 
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
          );
          
          objs.canvas.classList.add('sticky');
          objs.canvas.style.top =  `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
            
          if(scrollRatio > values.blendHeight[2].end){
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
            
            objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`
            objs.canvas.style.marginTop = 0;
          }
            
          if(scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0){
            objs.canvas.classList.remove('sticky');
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`
          }
        }

        break;
    }
  }


  function scrollLoop(){
    enterNewScene = false;
    prevScrollHeight = 0;
    for(let i = 0; i < currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id',`show-scene-${currentScene}`)
    }

    if(yOffset < prevScrollHeight){ 
      enterNewScene = true;
      if(currentScene == 0) return;
      currentScene--;
      document.body.setAttribute('id',`show-scene-${currentScene}`)
    }

    if(enterNewScene) return;

    playAnimation();
  };
  
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  
  // window.addEventListener('DOMContentLoaded', setLayout); // DOM만 로드되면 실행, 이미지, 소스파일은 추후
  window.addEventListener('load', ()=>{
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  }); //이미지까지 로딩이 다 되면 실행
  window.addEventListener('resize', setLayout);
})();