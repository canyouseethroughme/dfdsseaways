import { MikroORM } from '@mikro-orm/core'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import mikroConfig from './mikro-orm.config'
import { __prod__ } from './constants'

//// IMPORTS FOR RESOLVERS
import { ReservationResolver } from './resolvers/reservation'
import { TableResolver } from './resolvers/table'
import { UserResolver } from './resolvers/user'
import { OrderItemResolver } from './resolvers/orderItem'
import { OrderResolver } from './resolvers/order'
import { MenuItemResolver } from './resolvers/menuItem'
import { BookingResolver } from './resolvers/booking'
//// IMPORTS FOR SEEDS
// import { userSeeds } from './seeds/user.seeds'
// import { tableSeeds } from './seeds/table.seeds'
// import { menuItemSeeds } from './seeds/menuItem.seeds'
// import { bookingSeeds } from './seeds/booking.seeds'
// /////////////////////////////////////

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    await orm.getMigrator().up()
    
    ///////////////////////
    // SEEDS
    // await userSeeds(orm)
    // await tableSeeds(orm)
    // await menuItemSeeds(orm)
    // await bookingSeeds(orm)
    ///////////////////////
   
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ReservationResolver, TableResolver, UserResolver, OrderItemResolver, OrderResolver, MenuItemResolver, BookingResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    })

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main().catch(err => {
    console.error(err)
})