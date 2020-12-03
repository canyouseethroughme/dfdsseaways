import { MikroORM } from '@mikro-orm/core'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import mikroConfig from './mikro-orm.config'
import { HelloResolver } from './resolvers/hello'
import { __prod__ } from './constants'

//// IMPORTS FOR SEEDS
// import { userSeeds } from './seeds/user.seeds'
// import { tableSeeds } from './seeds/table.seeds'
// import { menuItemSeeds } from './seeds/menuItem.seeds'
import { bookingSeeds } from './seeds/booking.seeds'
/////////////////////////////////////

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    await orm.getMigrator().up()
    
    ///////////////////////
    // SEEDS
    // await userSeeds(orm)
    // await tableSeeds(orm)
    // await menuItemSeeds(orm)
    await bookingSeeds(orm)
    ///////////////////////
   
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    })

    apolloServer.applyMiddleware({app})

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main().catch(err => {
    console.error(err)
})

console.log('hello world')