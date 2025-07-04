import { useEffect, useRef, useState } from "react";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(10);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startDrawing = (e: MouseEvent) => {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e: MouseEvent) => {
      setMousePos({ x: e.offsetX, y: e.offsetY });

      if (!isDrawing) return;

      ctx.strokeStyle = isErasing ? "#ffffff" : color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "square";

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [isDrawing, color, isErasing, lineWidth]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Toolbar */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setIsErasing(false)}
          style={{
            backgroundColor: !isErasing ? "lightblue" : "",
            marginRight: "10px",
          }}
        >
          Brush
        </button>
        <button
          onClick={() => setIsErasing(true)}
          style={{
            backgroundColor: isErasing ? "lightblue" : "",
          }}
        >
          Eraser
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginLeft: "20px" }}
          disabled={isErasing}
        />
        <input
          type="range"
          min={1}
          max={50}
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {/* Whiteboard Area */}
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "600px",
          border: "2px solid #000",
          background: "#fff",
          cursor: isErasing ? "none" : "crosshair",
        }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{
            display: "block",
          }}
        />

        {/* Eraser Square Preview */}
        {isErasing && mousePos && (
          <div
            style={{
              position: "absolute",
              width: `${lineWidth}px`,
              height: `${lineWidth}px`,
              top: `${mousePos.y - lineWidth / 2}px`,
              left: `${mousePos.x - lineWidth / 2}px`,
              border: "1px solid black",
              backgroundColor: "rgba(255,255,255,0.3)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Whiteboard;
