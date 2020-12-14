import { Booking } from '../entities/Booking'
import { getConnection } from 'typeorm'

export const bookingSeeds = async () => {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Booking)
        .values([
            {userId: 1, startDate: new Date('2021-02-10T17:00:00.000Z'), endDate: new Date('2021-02-15T17:00:00.000Z')},
            {userId: 2, startDate: new Date('2021-02-10T17:00:00.000Z'), endDate: new Date('2021-02-15T17:00:00.000Z')}
        ]).execute()
    console.log('bookings', result)
}