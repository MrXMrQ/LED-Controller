import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

type Data = {
  status: string;
};

type ErrorData = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method === 'GET') {
    try {
      const { ip } = req.query;

      const timeoutPromise = new Promise<Data>((_, reject) => {
        setTimeout(() => {
          reject({ error: 'Request timed out' });
        }, 100); // 1000 milliseconds = 1 seconds
      });

      const responsePromise = axios.get<Data>(`http://${ip}/get`);

      const response = await Promise.race([responsePromise, timeoutPromise]);

      const data: Data = {
        status: (response as AxiosResponse<Data>).data.status,
      };

      res.status(200).json(data);
    } catch (error) {
      const data: Data = {
        status: 'Offline',
      };
      res.status(200).json(data);
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
