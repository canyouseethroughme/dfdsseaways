import { User } from "../entities/User";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find()
    }

    @Query(() => User, {nullable: true})
    user(@Arg('id') id: number): Promise<User | undefined>{
        return User.findOne(id)
    }
}