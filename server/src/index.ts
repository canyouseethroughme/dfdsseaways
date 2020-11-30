import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { HelloResolver } from './resolvers/hello'
// import { User } from './entities/User'

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    await orm.getMigrator().up()
    
    // const user = orm.em.create(User, {first_name: 'Andrei', last_name: 'Stefan'})
    // await orm.em.persistAndFlush(user)
    // const users = await orm.em.find(User, {})
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