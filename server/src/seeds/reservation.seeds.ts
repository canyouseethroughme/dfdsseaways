import { getConnection } from 'typeorm'
import { Reservation } from '../entities/Reservation'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const reservationSeeds = async () => {

    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Reservation)
        .values([
            {dateAndTime: new Date('2021-02-11T10:00:00.000Z'), bookingId: 1, noPersons: 2, tableId: 2},
            {dateAndTime: new Date('2021-02-11T14:00:00.000Z'), bookingId: 1, noPersons: 2, tableId: 2},
            {dateAndTime: new Date('2021-02-11T19:00:00.000Z'), bookingId: 1, noPersons: 2, tableId: 2},
        ]).execute()
    // eslint-disable-next-line no-console
    console.log('reservations: ', result)
}