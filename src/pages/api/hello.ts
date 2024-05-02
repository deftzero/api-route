// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {


  if(req.method === 'POST') {

    (async () => {

      const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ]
      });
      const page = await browser.newPage();

      await page.goto(req.body.baseUrl, {
        waitUntil: 'networkidle0',
      });

      await page.setViewport({ width: 1080, height: 1024 });
      const pdf: any = await page.pdf({
        format: 'A4',
      });

      await browser.close();
      
      res.status(200).send(pdf);
    })()
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
