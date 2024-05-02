// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  // @ts-ignore: Nextjs API APP_URL: Update it once env contains the app url
  const nextRequestMeta = req[Reflect.ownKeys(req).find(
    (s) => String(s) === "Symbol(NextRequestMeta)"
  )];

  const baseUrl = nextRequestMeta.__NEXT_INIT_URL.split('/api/')[0]

  res.status(200).json({ name: baseUrl });
}
