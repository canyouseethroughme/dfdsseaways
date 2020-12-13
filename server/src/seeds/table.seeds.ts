import { getConnection } from 'typeorm'
import { Table } from '../entities/Table'

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
    console.log('tables: ', result)
}