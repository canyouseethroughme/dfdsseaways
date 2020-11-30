import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
// import { User } from './entities/User'

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    await orm.getMigrator().up()

    // const user = orm.em.create(User, {first_name: 'Andrei', last_name: 'Stefan'})
    // await orm.em.persistAndFlush(user)
    // const users = await orm.em.find(User, {})
    // console.log(users)
}

main().catch(err => {
    console.error(err)
})

console.log('hello world')