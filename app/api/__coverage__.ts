import { BlitzApiRequest, BlitzApiResponse } from "blitz"

export default function __coverage__(req: BlitzApiRequest, res: BlitzApiResponse) {
  res.status(200).json({
    coverage: (global as any).__coverage__ || null,
  })
}
