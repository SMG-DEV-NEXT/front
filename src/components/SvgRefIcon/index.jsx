import axios from "axios";
import { useEffect, useState } from "react";

function SvgRefIcon({ url, color }) {
  const [svgContent, setSvgContent] = useState("");
  useEffect(() => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((e) => {
        setSvgContent(e.data);
      });
    // fetch(url)
    //   .then((res) => res.text())
    //   .then((text) => setSvgContent(text));
  }, [url]);

  return (
    <div
      style={{ color }}
      dangerouslySetInnerHTML={{
        __html: svgContent
          .replace(/stroke=".*?"/g, `stroke="${color}"`)
          .replace(/fill=".*?"/g, `fill="${color}"`)
          // fallback in case width/height not present at all
          .replace("<svg", '<svg width="20" height="20"'),
      }}
    />
  );
}

export default SvgRefIcon;
