"use client";
import { CodeBlock, dracula } from "react-code-blocks";

export default function Rio({
  code,
  language,
  showLineNumbers,
}: {
  code: string;
  language: string;
  showLineNumbers: boolean;
}) {
  return <CodeBlock text={code} language={language} showLineNumbers={showLineNumbers} theme={dracula} />;
}
