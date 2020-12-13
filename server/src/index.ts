import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { __prod__ } from './constants'

//// IMPORTS FOR ENTITIES
import { Booking } from './entities/Booking'
import { MenuItem } from './entities/MenuItem'
import { Order } from './entities/Order'
import { OrderItem } from './entities/OrderItem'
import { Reservation } from './entities/Reservation'
import { User } from './entities/User'
import { Table } from './entities/Table'
// /////////////////////////////////////

//// IMPORTS FOR RESOLVERS
import { ReservationResolver } from './resolvers/reservation'
import { TableResolver } from './resolvers/table'
import { UserResolver } from './resolvers/user'
import { OrderItemResolver } from './resolvers/orderItem'
import { OrderResolver } from './resolvers/order'
import { MenuItemResolver } from './resolvers/menuItem'
import { BookingResolver } from './resolvers/booking'

// IMPORTS FOR SEEDS
// import { userSeeds } from './seeds/user.seeds'
// import { menuItemSeeds } from './seeds/menuItem.seeds'
// import { tableSeeds } from './seeds/table.seeds'
// import { bookingSeeds } from './seeds/booking.seeds'
// import { reservationSeeds } from './seeds/reservation.seeds'
// import { orderSeeds } from './seeds/order.seeds'
// import { orderItemSeeds } from './seeds/orderItem.seeds'
// /////////////////////////////////////



const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'dfds2',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [Booking, MenuItem, Order, OrderItem, Reservation, Table, User]
    })
    // SEEDS
    // await userSeeds()
    // await bookingSeeds()
    // await menuItemSeeds()
    // await tableSeeds()
    // await reservationSeeds()
    // await orderSeeds()
    // await orderItemSeeds()
    /////////////////////////
   
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TableResolver, UserResolver, OrderItemResolver, OrderResolver, MenuItemResolver, BookingResolver, ReservationResolver],
            validate: false
        }),
        context: () => ({  })
    })

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main().catch(err => {
    console.error(err)
})