const alphabetize = (vocabPairs: [string, string][]) => {
  return vocabPairs.sort(([a], [b]) => {
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
  });
};

export const processVocab = (
  vocab: string,
  termSep: string = ",",
  lineSep: string = "\\n"
) => {
  [
    ["\\n", "\n"],
    ["\\t", "\t"],
    ["\\r", "\r"],
  ].forEach(([a, b]) => {
    lineSep = lineSep.replace(a, b);
    termSep = termSep.replace(a, b);
  });

  const vocabPairs = vocab
    .trim()
    .split(lineSep)
    .map((termDef) => termDef.split(termSep) as [string, string]);

  return alphabetize(vocabPairs);
};

export const genVocabHtmlStr = (vocab: [string, string][], title: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
          :root {
              --rad: 10px;
          }

          body {font-family: 'Trebuchet MS', sans-serif;}

          table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
              border-top-left-radius: var(--rad);
              border-top-right-radius: var(--rad);
              border-bottom: solid 3px rgb(9, 153, 123);
              font-size: 12px;
          }

          td, th {
              border-top: none;
              text-align: left;
              padding: 10px;
              border-bottom: solid 1px rgb(196, 196, 196);
          }

          tr:nth-child(even) {
              background-color: rgb(238, 238, 238);
          }

          #header-row {
              color: white;
              background-color: rgb(9, 153, 123);
          }

          #header-row th:first-child {
              border-top-left-radius: 10px;
          }

          #header-row th:last-child {
              border-top-right-radius: 10px;
          }
      </style>
    </head>
    <body>
      <h1 style="text-align: center; margin-bottom: 7px; color: #2f2f2f; font-family: 'Times New Roman', serif;">${title}</h1>
      <h3 style="text-align: center; color: #6f6f6f; margin-top: 3px; margin-bottom: 32px; font-family: 'Times New Roman', serif;">Vocabulary Collection</h3>
      <table>
          <tr id="header-row">
              <th>Term</th>
              <th>Definition</th>
          </tr>
          ${vocab
            .map(
              ([a, b], c) =>
                `<tr${
                  c % 2 === 0 ? "background-color: rgb(238, 238, 238);" : ""
                }><td style="border-top: none;text-align: left;padding: 10px;border-bottom: solid 1px rgb(196, 196, 196);">${a}</td><td style="border-top: none;text-align: left;padding: 10px;border-bottom: solid 1px rgb(196, 196, 196);">${b}</td></tr>`
            )
            .join("\n")}
      </table>
    </body>
  </html>`;
};
