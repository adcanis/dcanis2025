import React from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface TextHighlighterProps {
  text: string;
  align?: Align;
  minHeightVh?: number;
  sticky?: boolean;
  fontSize?: string;
  lineHeight?: string;
}

type Align = "left" | "center" | "right";

const LIGHT = "#e3e8eb";
const DARK = "#0b090a";

const Word = ({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  const color = useTransform(progress, [start, end], [LIGHT, DARK], {
    clamp: true,
  });

  return (
    <motion.span style={{ color }}>
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
};

const TextHighlighter = ({
  text,
  align = "center",
  minHeightVh = 220,
  sticky = true,
  fontSize = "10em",
  lineHeight = "1em",
}: TextHighlighterProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const words = React.useMemo(() => text.split(" "), [text]);

  return (
    <section ref={containerRef} className="th-container">
      <div className={sticky ? "th-sticky" : "th-nonsticky"}>
        <motion.div
          className="th-inner"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="th-h1">
            {words.map((w, i) => (
              <Word
                key={`${w}-${i}`}
                word={w}
                index={i}
                total={words.length}
                progress={scrollYProgress}
              />
            ))}
          </h1>
        </motion.div>
      </div>
      <style jsx>{`
        .th-container {
          position: relative;
          width: 100%;
          min-height: ${minHeightVh}vh;
          overflow: hidden;
        }

        .th-sticky {
          position: sticky;
          top: 0;
          height: 100dvh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .th-nonsticky {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 150px 0;
        }

        .th-inner {
          width: 80%;
          padding: 150px 0;
          display: flex;
          justify-content: center;
        }

        .th-h1 {
          margin: 0;
          font-size: ${fontSize};
          line-height: ${lineHeight};
          text-align: ${align};
          color: ${LIGHT}; /* fallback */
          /* If you want the big “soft” look like your screenshot: */
          /* letter-spacing: -0.02em; */
        }
      `}</style>
    </section>
  );
};

export default TextHighlighter;
