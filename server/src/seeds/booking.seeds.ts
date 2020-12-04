import { MikroORM } from '@mikro-orm/core'
import { Booking } from '../entities/Booking'
import { seed, persist } from '../constants'

export const bookingSeeds = async (orm: MikroORM) => {
    const booking1 = seed(orm, Booking, {id: 55, user: 1, start_date: '2021-02-10', end_date: '2021-02-15'})
    const booking2 = seed(orm, Booking, {id: 66, user: 3, start_date: '2021-02-14', end_date: '2021-02-16'})
    const booking3 = seed(orm, Booking, {id: 77, user: 4, start_date: '2021-01-24', end_date: '2021-01-28' })
    await persist(orm, [booking1, booking2, booking3])
    const bookings = await orm.em.find(Booking, {})
    console.log('bookings: ', bookings)
}