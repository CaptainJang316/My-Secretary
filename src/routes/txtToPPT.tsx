// import PptxGenJS from "pptxgenjs/types";

// // 1. Create a new Presentation
// let pres = new PptxGenJS();

// // 2. Add a Slide
// let slide = pres.addSlide();

// // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
// slide.addText("Hello World from PptxGenJS...", {
//     x: 1.5,
//     y: 1.5,
//     color: "363636",
//     fill: { color: "F1F1F1" },
//     align: pres.AlignH.center,
// });

// // 4. Save the Presentation
// pres.writeFile({ fileName: "Sample Presentation.pptx" });


import React from "react";
import pptxgen from "pptxgenjs";

const PptxGenerator = () => {
  const generatePptx = () => {
    // 새 프레젠테이션 생성
    const ppt = new pptxgen();

    // 슬라이드 추가
    const slide = ppt.addSlide();

    // 텍스트 상자 추가
    slide.addText("Hello, World!", { x: 1, y: 1, w: "80%", h: 1 });

    // PPTX 파일 다운로드
    ppt.writeFile({ fileName: "Sample Presentation.pptx" });
  };

  return (
    <div>
      <button onClick={generatePptx}>Generate PPTX</button>
    </div>
  );
};

export default PptxGenerator;