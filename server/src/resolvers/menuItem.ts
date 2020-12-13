import { MenuItem } from "../entities/MenuItem";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class MenuItemResolver {
    @Query(() => [MenuItem])
    async menuItems(): Promise<MenuItem[]> {
        return MenuItem.find()
    }

    @Query(() => MenuItem, {nullable: true})
    async menuItem(@Arg('id') id: number): Promise<MenuItem | undefined>{
        return MenuItem.findOne(id)
    }
}
