import { Booking } from './entities/Booking'
import { MenuItem } from './entities/MenuItem'
import { Order } from './entities/Order'
import { OrderItem } from './entities/OrderItem'
import { Reservation } from './entities/Reservation'
import { User } from './entities/User'
import { Table } from './entities/Table'

export default {
    type: 'postgres',
    database: 'dfds2',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: [Booking, MenuItem, Order, OrderItem, Reservation, Table, User]
}