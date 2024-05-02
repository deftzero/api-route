// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";
import chromium from '@sparticuz/chromium'

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {


  if (req.method === 'POST') {

    (async () => {
      // try {
        const browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
  
        await page.goto(req.body.baseUrl);
  
        await page.setViewport({ width: 1080, height: 1024 });
        const pdf: any = await page.pdf({
          format: 'A4',
        });
  
        await browser.close();
  
        res.status(200).send(pdf);
      // } catch (error) {
      //   res.status(200).json({ message: error });
      // }
    })()
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
