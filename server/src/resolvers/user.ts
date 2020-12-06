import { User } from "../entities/User";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users(@Ctx() { em }: MyContext): Promise<User[]> {
        return em.find(User, {})
    }
}