import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import jsPDF from "jspdf";

export default function Genwin() {
  const bookRef = useRef(null);
  const stageRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [zoomImg, setZoomImg] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  //  Disables all scrolling and zooming globally
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.touchAction = "none";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      document.documentElement.style.touchAction = "auto";
    };
  }, []);

  const onFlip = (e) => setCurrent(e.data);
  const onPrev = () => bookRef.current?.pageFlip().flipPrev();
  const onNext = () => bookRef.current?.pageFlip().flipNext();

  const goToPage = (index) => {
  const book = bookRef.current?.pageFlip();
  if (book) {

    book.turnToPage(index);
    setCurrent(index);
  }
};


  
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    pages.forEach((p, i) => {
      if (i !== 0) doc.addPage();
      doc.setFontSize(16);
      doc.text(p.name || "", 40, 80);
      doc.setFontSize(11);
      doc.text(`Size: ${p.size || ""}`, 40, 110);
      doc.text(`Code: ${p.code || ""}`, 40, 130);
      doc.text(`Price: ₹${p.price ?? ""}`, 40, 150);
      doc.text(`Master Packing: ${p.packing ?? ""}`, 40, 170);
    });
    doc.save("genwin-catalog.pdf");
  };

  const downloadBlob = async (url, filename) => {
    try {
      const driveMatch = url.match(/\/d\/([-.\w]+)\//);
      let dlUrl = url;
      if (driveMatch) dlUrl = `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
      const res = await fetch(dlUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Unable to download file. It might be blocked by CORS.");
    }
  };

  const pages = [
    { id: 1, images: ["/img1.JPG"], videos: ["https://drive.google.com/file/d/1-AxX_wWFKvYokY6gqFa6AOzNh_1iggSt/preview"], name: "GENWIN ACRYLIC CLEAR TAPE", size: "9MM x 1MM x 3MTR", code: "GW*CL*9*1*3", price: 44, packing: 36 },
    { id: 2, images: ["/img2.JPG"], videos: ["https://drive.google.com/file/d/14WufWbwoDoDI16nVDlzZP98av22qhhfU/preview"], name: "GENWIN ACRYLIC CLEAR TAPE", size: "12MM x 1MM x 3MTR", code: "GW*CL*12*1*3", price: 56, packing: 30 },
    { id: 3, images: ["/img3.JPG"], videos: ["https://drive.google.com/file/d/1QgNmdPZKywbDxsMzOHfUXtfCeSdTS4te/preview"], name: "GENWIN ACRYLIC CLEAR TAPE", size: "9MM x 1MM x 9MTR", code: "GW*CL*9*1*9", price: 90, packing: 36 },
    { id: 4, images: ["/img4.JPG"], videos: ["https://drive.google.com/file/d/101FKG6d27_nOUzPN87NkmZIe5LPIclGm/preview"], name: "GENWIN ACRYLIC CLEAR TAPE", size: "12MM x 1MM x 9MTR", code: "GW*CL*12*1*9", price: 120, packing: 30 },
    { id: 5, images: ["/img5.JPG"], videos: ["https://drive.google.com/file/d/1V00dz-CZrIoQTfWKZJ_RcUMkuu9AakCa/preview"], name: "GENWIN ACRYLIC CLEAR TAPE", size: "18MM x 1MM x 9MTR", code: "GW*CL*18*1*9", price: 180, packing: 18 },
    { id: 6, images: ["/img6.JPG"], videos: ["https://drive.google.com/file/d/1_HI4zrktUczUXr9PHrt0HlcmqM3CHP9r/preview"], name: "GENWIN ACRYLIC CLEAR TAPE", size: "24MM x 1MM x 9MTR", code: "GW*CL*24*1*9", price: 240, packing: 15 },
    { id: 7, images: ["/img7.JPG"], videos: ["https://drive.google.com/file/d/1mgBsVHpEDRVVJQRnXzgj7nvt8LoOtmjy/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "9MM x 0.8MM x 3MTR", code: "GW*GREY*9*0.8*3", price: 44, packing: 36 },
    { id: 8, images: ["/img8.JPG"], videos: ["https://drive.google.com/file/d/1_8hejTv_apA30kDBn53zvHsKkpMWiklv/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "12MM x 0.8MM x 3MTR", code: "GW*GREY*12*0.8*3", price: 56, packing: 30 },
    { id: 9, images: ["/img9.JPG"], videos: ["https://drive.google.com/file/d/1OfjwD0veQB2gbboASIhqQi_MyDpYCbko/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "9MM x 0.8MM x 9MTR", code: "GW*GREY*9*0.8*9", price: 90, packing: 36 },
    { id: 10, images: ["/img10.JPG"], videos: ["https://drive.google.com/file/d/1Fm_Q8uw7nzbBG-rIQ-P4EAb2uAnZ_yC9/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "12MM x 0.8MM x 9MTR", code: "GW*GREY*12*0.8*9", price: 120, packing: 30 },
    { id: 11, images: ["/img11.JPG"], videos: ["https://drive.google.com/file/d/146RKYRzbdecwp4Swsz4KLATDuWCGI5I9/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "18MM x 0.8MM x 9MTR", code: "GW*GREY*18*0.8*9", price: 180, packing: 18 },
    { id: 12, images: ["/img12.JPG"], videos: ["https://drive.google.com/file/d/1-GQn4M-MLjA_8NSXS4F36XZCvOzwL_Q4/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "24MM x 0.8MM x 9MTR", code: "GW*GREY*24*0.8*9", price: 240, packing: 15 },
    { id: 13, images: ["/img13.JPG"], videos: ["https://drive.google.com/file/d/10hh8B03nyVBYXVlCd4I6PrwZE0Usr-SC/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "7MM x 0.8MM x 33MTR", code: "GW*GREY*7*0.8*33", price: 170, packing: 50 },
    { id: 14, images: ["/img14.JPG"], videos: ["https://drive.google.com/file/d/1DsP59PWd8KxEgyRryu4lrFIQtgZKY264/preview"], name: "GENWIN ACRYLIC FOAM TAPE", size: "8MM x 0.8MM x 33MTR", code: "GW*GREY*8*0.8*33", price: 190, packing: 50 },
  ];

  const isMobile = window.innerWidth < 640;

  useEffect(() => {
    const flip = bookRef.current?.pageFlip?.();
    if (flip) {
      flip.setOptions({
        width: isMobile ? window.innerWidth : 900,
        height: isMobile ? window.innerHeight : 600,
        size: "stretch",
        showCover: true,
        usePortrait: true,
        useMouseEvents: !isMobile,
        useTouchEvents: !isMobile,
        clickEventForward: !isMobile,
        swipeDistance: isMobile ? 9999 : 30,
        mobileScrollSupport: false,
        flippingTime: isMobile ? 0 : 1000,
        maxShadowOpacity: isMobile ? 0 : 0.5,
      });
    }

    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="h-screen overflow-hidden bg-white flex flex-col items-center justify-center"
      style={{ touchAction: "none", height: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-red-600 shadow w-full">
        <div className="flex justify-between items-center px-4 h-16">
          <div onClick={() => goToPage(0)} className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="logo" className="w-10 h-10 bg-white p-1 rounded" />
            <div>
              <p className="text-white font-semibold text-lg leading-none">GENWIN</p>
              <p className="text-white text-xs">Building Up to Your Expectation</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="hidden sm:inline px-3 py-1 bg-white text-red-600 rounded" onClick={onPrev}>Prev</button>
            <button className="hidden sm:inline px-3 py-1 bg-white text-red-600 rounded" onClick={onNext}>Next</button>
            <button onClick={() => setTocOpen(true)} className="sm:hidden bg-white text-red-600 p-2 rounded-md">☰</button>
          </div>
        </div>
      </header>

      {/* MAIN SECTION */}
      <div ref={stageRef} className="flex flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 pt-4 gap-6 overflow-hidden">
        {/* Desktop TOC */}
        <aside className="hidden lg:block w-80 bg-white border rounded-md p-4 shadow-sm overflow-y-auto max-h-[85vh]">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Table of Contents</h3>
          {pages.map((p, i) => (
            <button
              key={p.id}
              className={`w-full text-left p-3 rounded-md ${i === current ? "bg-red-50 border border-red-100" : "hover:bg-gray-50"}`}
              onClick={() => goToPage(i)}
            >
              <div className="text-sm font-medium text-gray-800">{p.name}</div>
              <div className="text-xs text-gray-500">{p.size}</div>
            </button>
          ))}
        </aside>

        {/* Mobile TOC */}
        {tocOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="bg-black/40 flex-1" onClick={() => setTocOpen(false)}></div>
            <div className="w-72 bg-white p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Contents</h3>
              {pages.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    goToPage(i);
                    setTocOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-md ${i === current ? "bg-red-50 border border-red-100" : "hover:bg-gray-50"}`}
                >
                  <div className="text-sm font-medium text-gray-800">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.size}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FLIPBOOK */}
        <main className="flex-1 overflow-hidden">
          <HTMLFlipBook
            width={window.innerWidth < 640 ? window.innerWidth : 900}
            height={window.innerWidth < 640 ? window.innerHeight * 0.85 : 650}
            size="stretch"
            minWidth={320}
            maxWidth={3000}
            minHeight={400}
            maxHeight={3000}
            mobileScrollSupport={false}
            useMouseEvents={false}
            clickEventForward={false}
            drawShadow={true}
            flippingTime={1000}
            ref={bookRef}
            swipeDistance={0}
            onFlip={onFlip}
            className="w-full select-none"
          >
            {pages.map((p, i) => (
             <article key={p.id} className="p-4 bg-white overflow-y-auto sm:overflow-y-visible">

                <div className="flex justify-between items-center mb-3 lg:hidden">
                  <button
                    onClick={onPrev}
                    aria-label="Previous"
                    className="px-3 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
                  >
                    Prev
                  </button>

                  <div className="text-sm text-gray-600">
                    Page {current + 1} / {pages.length}
                  </div>

                  <button
                    onClick={onNext}
                    aria-label="Next"
                    className="px-3 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
                  >
                    Next
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Size: {p.size}</p>
                <p className="text-sm text-gray-600">Code: {p.code}</p>
                <p className="text-sm text-gray-600">Price: ₹{p.price}</p>
                <p className="text-sm text-gray-600 mb-3">Packing: {p.packing}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-md border border-gray-100 p-3 flex flex-col items-center justify-center">
                    {p.images?.[0] ? (
                      <>
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full object-contain rounded-md cursor-pointer transition-transform duration-300 hover:scale-105 max-h-[320px]"
                          onClick={() => setZoomImg(p.images[0])}
                        />
                        <button
                          className="mt-3 px-4 py-2 w-full sm:w-auto rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                          onClick={() =>
                            downloadBlob(
                              p.images[0],
                              `${(p.name || "image").replace(/\s+/g, "_")}.jpg`
                            )
                          }
                        >
                          Download Image
                        </button>
                      </>
                    ) : (
                      <div className="text-sm text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="rounded-md border border-gray-100 p-3 flex flex-col items-center justify-center">
                    {p.videos?.[0] ? (
                      <>
                        <div className="w-full aspect-video rounded-md overflow-hidden">
                          <iframe
                            src={p.videos[0]}
                            title={`video-${i}`}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            className="w-full h-full"
                          />
                        </div>
                        <button
                          className="hidden sm:inline-block mt-3 px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                          onClick={() =>
                            downloadBlob(
                              p.videos[0],
                              `${(p.name || "video").replace(/\s+/g, "_")}.mp4`
                            )
                          }
                        >
                          Download Video
                        </button>
                      </>
                    ) : (
                      <div className="text-sm text-gray-400">No video</div>
                    )}
                  </div>
                </div>

                <footer className="text-xs text-gray-400 mt-4">
                  Genwin | Page {i + 1}
                </footer>
              </article>
            ))}
          </HTMLFlipBook>

          {zoomImg && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
              onClick={() => {
                setZoomImg(null);
                setZoomScale(1);
              }}
            >
              <div
                className="bg-white rounded-lg shadow-lg max-w-3xl w-[92%] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded-md bg-red-50 text-red-600"
                      onClick={() => setZoomScale((s) => s + 0.2)}
                    >
                      +
                    </button>
                    <button
                      className="px-3 py-1 rounded-md bg-red-50 text-red-600"
                      onClick={() => setZoomScale((s) => Math.max(0.5, s - 0.2))}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="px-3 py-1 rounded-md bg-red-600 text-white"
                    onClick={() => {
                      setZoomImg(null);
                      setZoomScale(1);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="flex justify-center overflow-auto">
                  <img
                    src={zoomImg}
                    alt="zoom"
                    style={{ transform: `scale(${zoomScale})` }}
                    className="max-h-[70vh] object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
