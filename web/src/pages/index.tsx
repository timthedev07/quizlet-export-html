import { Button, Input, Textarea } from "dragontail-experimental";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { genVocabHtmlStr, processVocab } from "../lib/genPdf";
import { IFrame } from "../components/Iframe";

const Home: NextPage = () => {
  const [termSep, setTermSep] = useState<string>(",");
  const [lineSep, setLineSep] = useState<string>("\\n");
  const [vocab, setVocab] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleGenerate = () => {
    const vocabList = processVocab(vocab, termSep, lineSep);
    const htmlStr = genVocabHtmlStr(vocabList);
  };

  return (
    <div className="pt-24 px-12 sm:px-36 pb-12">
      <header>
        <h1 className="font-extrabold text-4xl text-center">Quizlet → PDF</h1>
      </header>
      <section className="mt-16 lg:mt-12">
        <div className="flex flex-col lg:flex-row gap-16 p-6 lg:p-8 rounded-lg control_board w-full h-[438px] lg:h-[438px] shadow-lg">
          <div className="flex-1 flex flex-col items-center gap-8 justify-center">
            <h2 className="text-white/90 text-xl">Vocab</h2>
            <Textarea
              value={vocab}
              onChange={(e) => setVocab(e.target.value)}
              className="h-[60%]"
              variant="underline"
            ></Textarea>
            <Button
              color="orange"
              className="self-right"
              onClick={() => {
                handleGenerate();
              }}
            >
              Generate
            </Button>
          </div>
          <div className="w-[0px] border-slate-200/20 rounded-full border-[1px] border-solid"></div>
          <div className="flex-1 flex flex-col justify-evenly">
            <article className="flex flex-col gap-4 items-start">
              <h3 className="text-mdtext-white/90">
                Between Term and Definition
              </h3>
              <Input
                value={termSep}
                onChange={(e) => {
                  setTermSep(e.target.value);
                }}
                variant="underline"
                className="max-w-[120px]"
              />
            </article>
            <article className="flex flex-col gap-4 items-start">
              <h3 className="text-md text-white/90">
                Between Rows (default to new line)
              </h3>
              <Input
                value={lineSep}
                onChange={(e) => {
                  setLineSep(e.target.value);
                }}
                variant="underline"
                className="max-w-[120px]"
              />
            </article>
          </div>
        </div>
      </section>
      <section className="mt-24">
        <h1 className="font-extrabold text-2xl text-center">Preview</h1>
        <IFrame className="w-full" ref={iframeRef}></IFrame>
      </section>
    </div>
  );
};

export default Home;
