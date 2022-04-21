import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const App = () => {
  const [markdown, setMarkdown] = useState("# githubmd");
  return (
    <main>
      <h1 className="page-title">
        🪶 githubmd by <a href="https://gmlunesa.com">gmlunesa</a>
      </h1>
      <section className="markdown">
        <textarea
          className="input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        ></textarea>
        <article className="result">
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <SyntaxHighlighter
                    children={children}
                    style={materialDark}
                    {...props}
                  />
                );
              },
            }}
          />
        </article>
      </section>
    </main>
  );
};

export default App;
