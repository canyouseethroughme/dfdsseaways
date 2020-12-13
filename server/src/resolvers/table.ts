import { Table } from "../entities/Table";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class TableResolver {
    @Query(() => [Table])
    async tables(): Promise<Table[]> {
        return Table.find()
    }

    @Query(() => Table, {nullable: true})
    table(@Arg('id') id: number): Promise<Table | undefined>{
        return Table.findOne(id)
    }
}