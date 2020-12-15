import { OrderItem } from '../entities/OrderItem'
import { getConnection } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const orderItemSeeds = async () => {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(OrderItem)
        .values([
            {orderId: 1, menuItemId: 10, price: 55, amount: 1}, 
            {orderId: 1, menuItemId: 11, price: 55, amount: 2}, 
            {orderId: 1, menuItemId: 12, price: 50, amount: 1}
        ]).execute()
    // eslint-disable-next-line no-console
    console.log('order item: ', result)
}