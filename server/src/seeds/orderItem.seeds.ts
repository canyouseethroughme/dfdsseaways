import { OrderItem } from '../entities/OrderItem'
import { getConnection } from 'typeorm'

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
    console.log('order item: ', result)
}