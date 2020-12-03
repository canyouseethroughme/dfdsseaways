import { MikroORM } from '@mikro-orm/core'
import { User } from '../entities/User'
import { seed, persist } from '../constants'

export const userSeeds = async (orm: MikroORM) => {
    const user1 = seed(orm, User, {first_name: 'Andrei', last_name: 'Stefan'})
    const user2 = seed(orm, User, {first_name: 'Mathias', last_name: 'Jan'})
    const user3 = seed(orm, User, {first_name: 'John', last_name: 'Doe'})
    const user4 = seed(orm, User, {first_name: 'Boris', last_name: 'Johnson'})
    const user5 = seed(orm, User, {first_name: 'Steven', last_name: 'Segal'})
    await persist(orm, [user1, user2, user3, user4, user5])
    const users = await orm.em.find(User, {})
    console.log('users:', users)
}