import { Request, Response } from 'express'

export type MyContext = {
  req: Request & { session: { bookingId: number }}
  res: Response
}