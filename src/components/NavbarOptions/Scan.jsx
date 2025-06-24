import React, { useState } from "react";
import Tesseract from "tesseract.js";

const Scan = () => {
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    setOcrText("");
    setProgress(0);
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleScan = () => {
    if (!image) return;
    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(Math.round(m.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        setOcrText(text);
        setLoading(false);
      })
      .catch(() => {
        setOcrText("Failed to recognize text.");
        setLoading(false);
      });
  };

  return (
    <section className="bg-gradient-to-br from-cyan-900 to-teal-900 dark:bg-gradient-to-br dark:from-cyan-100 dark:via-sky-100 dark:to-teal-50 border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 mb-8 mt-16 text-white dark:text-black" id="scan">
      {/* SECTION: Scan */}
      <h2 className="text-2xl font-bold mb-4">Scan Receipt</h2>
      <p className="mb-4">
        Upload a grocery receipt photo to automatically add items to your
        pantry.
      </p>
      <input
        type="file"
        accept="image/*"
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white dark:file:bg-cyan-50 file:text-teal-900 dark:file:text-cyan-900 hover:file:bg-gray-100 dark:hover:file:bg-cyan-100"
        onChange={handleImageChange}
        disabled={loading}
      />
      <button
        onClick={handleScan}
        disabled={!image || loading}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow transition"
      >
        {loading ? "Scanning..." : "Scan"}
      </button>
      {loading && (
        <div className="mt-4">Scanning... {progress}%</div>
      )}
      {ocrText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Recognized Text:
          </h3>
          <pre className="bg-white dark:bg-cyan-50 rounded p-4 text-teal-900 dark:text-cyan-900 whitespace-pre-wrap border border-black dark:border-white">
            {ocrText}
          </pre>
        </div>
      )}
    </section>
  );
};

export default Scan;
