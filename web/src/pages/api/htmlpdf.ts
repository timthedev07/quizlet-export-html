import { NextApiHandler } from "next";
import htmlPdf from "html-pdf-node";
import { withMethodGuard } from "../../lib/middleware/method-guard";

const handler: NextApiHandler = async (req, res) => {
  const body = JSON.parse(req.body) as { content?: string };

  if (!body?.content)
    return res.status(400).json({
      err: "No HTML content found.",
    });

  const file = { content: body.content };

  htmlPdf.generatePdf(
    file,
    {
      format: "A4",
      printBackground: true,
      margin: { left: 30, right: 30, top: 20, bottom: 20 },
    },
    (err, buffer) => {
      if (err)
        return res.status(500).json({
          err: JSON.stringify(err),
        });
      else
        return res.status(200).json({
          pdfBuffer: buffer,
        });
    }
  );
};

export default withMethodGuard(handler, "POST");
