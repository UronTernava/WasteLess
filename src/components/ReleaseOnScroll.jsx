import React, { useRef, useEffect, useState } from "react";

const RevealOnScroll = ({ children, className = "" }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
