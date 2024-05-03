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
      const urlPage = "https://adl-qa-frontend.softyware.com?agreementCode=1first_name=Mayo&last_name=Maris&address1=33 West Rocky Old Parkway&city=Ducimus&state=Tempore&zip=76983&phone_number=+1 (123) 299-9329&emergency_contact_first_name=September&emergency_contact_last_name=Best&emergency_contact_address1=798 North Nobel Freeway&emergency_contact_city=Dolor&emergency_contact_state=Eu&emergency_contact_zip=11866&emergency_contact_phone=+1 (661) 853-9361&felony_conviction=0&signature=Test"
      // try {
        const browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
  
        await page.goto(urlPage, {
          waitUntil: 'networkidle0'
        });
  
        await page.setViewport({ width: 1080, height: 1024 });
        const pdf: any = await page.pdf({
          format: 'A4',
        });
  
        await browser.close();
        
        res.setHeader('Content-Type', 'application/pdf')
        res.status(200).send(pdf);
      // } catch (error) {
      //   res.status(200).json({ message: error });
      // }
    })()
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
