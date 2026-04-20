"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState("Requesting camera...");
  const [error, setError] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (!mounted || !videoRef.current) return;

        streamRef.current = stream;

        const video = videoRef.current;
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        try {
          await video.play();
          if (mounted) {
            setStatus("Camera active");
            setError("");
          }
        } catch (err) {
          console.error("Play error:", err);
          if (mounted) {
            setError("Could not start camera preview.");
            setStatus("Camera failed");
          }
        }
      } catch (err) {
        console.error("Camera error:", err);
        if (mounted) {
          setError("Please allow camera access.");
          setStatus("Camera failed");
        }
      }
    }

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  function captureFrame() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    setCapturedImage(image);
  }

  function clearCapture() {
    setCapturedImage(null);
    setAnalysis(null);
  }

  async function analyzeImage() {
    if (!capturedImage) return;

    setAnalyzing(true);
    setError("");
    console.log("🔍 Starting image analysis...");

    try {
      // Remove the data URL prefix to get just the base64
      const base64Data = capturedImage.split(",")[1];
      console.log("📤 Sending image to API...");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Data }),
      });

      console.log(`📊 API response status: ${response.status}`);
      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Failed to analyze image";
        console.error("❌ API error:", errorMsg);
        setError(errorMsg);
        return;
      }

      console.log("✅ Analysis received successfully");
      setAnalysis(data.result);
      // Clear the captured image after successful analysis
      setCapturedImage(null);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Error sending image to API");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-900 via-teal-800 to-cyan-700 text-white p-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <Link href="/" className="font-bold text-xl">
            EcoScan
          </Link>
          <Link href="/" className="border px-4 py-2 rounded-full">
            ← Back
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4">Scanner</h1>
        <p className="mb-6">Hold an item in front of the camera</p>

        {/* Status */}
        <p className="mb-4 text-green-200">{status}</p>
        {error && <p className="text-red-400">{error}</p>}

        {/* Camera */}
        <div className="rounded-2xl overflow-hidden border border-white/20 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-[400px] object-cover bg-black"
          />
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center flex-wrap">
          <button
            onClick={captureFrame}
            disabled={analyzing}
            className="bg-green-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Scan Item
          </button>

          {capturedImage && !analysis && (
            <button
              onClick={analyzeImage}
              disabled={analyzing}
              className="bg-blue-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzing ? "Analyzing..." : "Analyze"}
            </button>
          )}

          <button
            onClick={clearCapture}
            disabled={analyzing}
            className="border px-6 py-3 rounded-full hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>

        {/* Preview */}
        {capturedImage && (
          <div className="mt-8">
            <h2 className="mb-2">Captured Image</h2>
            <img
              src={capturedImage}
              className="mx-auto rounded-xl max-w-full"
            />
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-xl text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
              {analysis}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}