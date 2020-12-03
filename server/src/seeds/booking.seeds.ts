import { MikroORM } from '@mikro-orm/core'
import { Booking } from '../entities/Booking'
import { seed, persist } from '../constants'

export const bookingSeeds = async (orm: MikroORM) => {
    const booking1 = seed(orm, Booking, {start_date: '2021-02-10', end_date: '2021-02-15', user_id: 1})
    const booking2 = seed(orm, Booking, {start_date: '2021-02-14', end_date: '2021-02-16', user_id: 3})
    const booking3 = seed(orm, Booking, {start_date: '2021-01-24', end_date: '2021-01-28', user_id: 4})
    await persist(orm, [booking1, booking2, booking3])
    const bookings = await orm.em.find(Booking, {})
    console.log('bookings: ', bookings)
}