
import { getConnection } from 'typeorm'
import { Order } from '../entities/Order'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const orderSeeds = async () => {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Order)
        .values([{reservationId: 1}
        ]).execute()
    // eslint-disable-next-line no-console
    console.log('order: ', result)
}