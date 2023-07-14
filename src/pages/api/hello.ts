// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (!req.body.nachname) {
      res.status(400).json({ name: 'Missing'})
      return
    } 
    res.status(200).json({ name: 'Kenny' })
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}
