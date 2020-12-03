import { MikroORM } from '@mikro-orm/core'
import { Table } from '../entities/Table'
import { seed, persist } from '../constants'

export const tableSeeds = async (orm: MikroORM) => {
    const table1 = seed(orm, Table, {max_persons: 2}) // 2 person table
    const table2 = seed(orm, Table, {max_persons: 2}) // 2 person table
    const table3 = seed(orm, Table, {max_persons: 2}) // 2 person table
    const table4 = seed(orm, Table, {max_persons: 2}) // 2 person table
    const table5 = seed(orm, Table, {max_persons: 4}) // 4 person table
    const table6 = seed(orm, Table, {max_persons: 4}) // 4 person table
    const table7 = seed(orm, Table, {max_persons: 4}) // 4 person table
    const table8 = seed(orm, Table, {max_persons: 4}) // 4 person table
    const table9 = seed(orm, Table, {max_persons: 8}) // 8 person table
    const table10 = seed(orm, Table, {max_persons: 8}) // 8 person table
    const table11 = seed(orm, Table, {max_persons: 8}) // 8 person table
    const table12 = seed(orm, Table, {max_persons: 8}) // 8 person table
    await persist(orm, [table1, table2, table3, table4, table5, table6, table7, table8, table9, table10, table11, table12])
    const tables = await orm.em.find(Table, {})
    console.log('tables:', tables)
}