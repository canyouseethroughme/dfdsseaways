import { getConnection } from 'typeorm'
import { Reservation } from '../entities/Reservation'

export const reservationSeeds = async () => {

    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Reservation)
        .values([
            {dateAndTime: new Date('2021-02-11T10:00:00.000Z'), bookingId: 50, noPersons: 2, tableId: 2},
            {dateAndTime: new Date('2021-02-11T14:00:00.000Z'), bookingId: 50, noPersons: 2, tableId: 2},
            {dateAndTime: new Date('2021-02-11T19:00:00.000Z'), bookingId: 50, noPersons: 2, tableId: 2},
        ]).execute()
    console.log('reservations: ', result)
}