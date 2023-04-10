import { Button, Input, Textarea } from "dragontail-experimental";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { genVocabHtmlStr, processVocab } from "../lib/genPdf";

const Home: NextPage = () => {
  const [termSep, setTermSep] = useState<string>(",");
  const [lineSep, setLineSep] = useState<string>("\\n");
  const [title, setTitle] = useState<string>("");
  const [vocab, setVocab] = useState<string>("");

  const handleGenerate = async () => {
    const vocabList = processVocab(vocab, termSep, lineSep);
    const htmlStr = genVocabHtmlStr(vocabList, title);

    const response = await fetch("/api/htmlpdf", {
      method: "POST",
      body: JSON.stringify({
        content: htmlStr,
      }),
    });

    console.log(response.ok);

    if (!response.ok) return window.alert("Failure...");

    const data = await response.json();
    const pdfBuffer = Uint8Array.from(data.pdfBuffer.data);
    console.log(pdfBuffer.buffer);
    const blob = new Blob([pdfBuffer.buffer], {
      type: "application/pdf",
    });
    const a = document.createElement("a");
    const downloadUrl = window.URL.createObjectURL(blob);
    a.style.display = "none";
    a.href = downloadUrl;
    a.download = `${title}.pdf`;
    document.body.append(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
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
              isDisabled={!title || !vocab}
            >
              Generate
            </Button>
          </div>
          <div className="w-[0px] border-slate-200/20 rounded-full border-[1px] border-solid"></div>
          <div className="flex-1 flex flex-col justify-evenly">
            <article className="flex flex-col gap-2 items-start">
              <h3 className="text-md text-white/90">Collection Title</h3>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="e.g. German Unit 1"
                variant="underline"
                containerClassName="w-full"
              />
            </article>
            <article className="flex flex-col gap-2 items-start">
              <h3 className="text-md text-white/90">
                Between Term and Definition
              </h3>
              <Input
                value={termSep}
                onChange={(e) => {
                  setTermSep(e.target.value);
                }}
                variant="underline"
                containerClassName="max-w-[120px]"
              />
            </article>
            <article className="flex flex-col gap-2 items-start">
              <h3 className="text-md text-white/90">
                Between Rows (default to new line)
              </h3>
              <Input
                value={lineSep}
                onChange={(e) => {
                  setLineSep(e.target.value);
                }}
                variant="underline"
                containerClassName="max-w-[120px]"
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
