import { getConnection } from 'typeorm'
import { User } from '../entities/User'


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const userSeeds = async () => {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            {firstName: 'Andrei', lastName: 'Stefan'}, 
            {firstName: 'Mathias', lastName: 'Jan'}, 
        ]).execute()
    // eslint-disable-next-line no-console
    console.log('users: ', result)
    
}
