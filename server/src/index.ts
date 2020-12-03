import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { HelloResolver } from './resolvers/hello'
// import { User } from './entities/User'
// import { Booking } from './entities/Booking'

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    await orm.getMigrator().up()
    
    // const user1 = orm.em.create(User, {first_name: 'John', last_name: 'Doe'})
    // const user2 = orm.em.create(User, {first_name: 'Mathias', last_name: 'Jan'})
    // const booking1 = orm.em.create(Booking, {user_id: 20, start_date: "2021-02-10", end_date: "2021-02-15"})
    // await orm.em.persistAndFlush(booking1)
    // await orm.em.persistAndFlush([user1, user2])
    // await orm.em.persistAndFlush(user2)
    // const users = await orm.em.find(Booking, {})
    // console.log(users)
    
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