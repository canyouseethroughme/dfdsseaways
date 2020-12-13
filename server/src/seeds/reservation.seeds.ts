import { getConnection } from 'typeorm'
import { Reservation } from '../entities/Reservation'

export const reservationSeeds = async () => {

    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Reservation)
        .values([
            {dateAndTime: new Date('2021-02-11 10:00'), bookingId: 1, noPersons: 2, tableId: 2},
            {dateAndTime: new Date('2021-02-11 15:00'), bookingId: 1, noPersons: 2, tableId: 2}, 
            {dateAndTime: new Date('2021-02-11 20:00'), bookingId: 1, noPersons: 2, tableId: 2}
        ]).execute()
    console.log('reservations: ', result)
}