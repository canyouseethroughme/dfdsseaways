import { Table } from "../entities/Table";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class TableResolver {
    @Query(() => [Table])
    tables(@Ctx() { em }: MyContext): Promise<Table[]> {
        return em.find(Table, {})
    }
}