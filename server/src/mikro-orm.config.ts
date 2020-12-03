import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { MikroORM } from '@mikro-orm/core'
import path from 'path'
import { Table } from "./entities/Table";
import { Reservation } from "./entities/Reservation";
import { OrderItem } from "./entities/OrderItem";
import { Order } from "./entities/Order";
import { MenuItem } from "./entities/MenuItem";
import { Booking } from "./entities/Booking";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/, 
    },
    entities: [User, Table, Reservation, OrderItem, Order, MenuItem, Booking],
        dbName: 'dfds',
        type: 'postgresql',
        debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]