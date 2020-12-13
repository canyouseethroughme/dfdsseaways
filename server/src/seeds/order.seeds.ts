
import { getConnection } from 'typeorm'
import { Order } from '../entities/Order'

export const orderSeeds = async () => {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Order)
        .values([{reservationId: 1}
        ]).execute()
    console.log('order: ', result)
}