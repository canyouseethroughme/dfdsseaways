import { getConnection } from 'typeorm'
import { Table } from '../entities/Table'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const tableSeeds = async () => {

    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Table)
        .values([
            {maxPersons: 2}, 
            {maxPersons: 2}, 
            {maxPersons: 2}, 
            {maxPersons: 2}, 
            {maxPersons: 4}, 
            {maxPersons: 4}, 
            {maxPersons: 4}, 
            {maxPersons: 4}, 
            {maxPersons: 8}, 
            {maxPersons: 8}, 
            {maxPersons: 8}, 
            {maxPersons: 8} 
        ]).execute()
    // eslint-disable-next-line no-console
    console.log('tables: ', result)
}