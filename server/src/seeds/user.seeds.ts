import { getConnection } from 'typeorm'
import { User } from '../entities/User'


export const userSeeds = async () => {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            {firstName: 'Andrei', lastName: 'Stefan'}, 
            {firstName: 'Mathias', lastName: 'Jan'}, 
        ]).execute()
    console.log('users: ', result)
}
