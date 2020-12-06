import { MenuItem } from "../entities/MenuItem";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class MenuItemResolver {
    @Query(() => [MenuItem])
    menuItems(@Ctx() { em }: MyContext): Promise<MenuItem[]> {
        return em.find(MenuItem, {})
    }
}