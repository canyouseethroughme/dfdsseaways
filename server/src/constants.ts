import { MikroORM } from "@mikro-orm/core"

export const __prod__ = process.env.NODE_ENV === 'production'

export const seed = (orm: MikroORM, entity: Function, object: object) => {
    return orm.em.create(entity, object)
}

export const persist = (orm: MikroORM, object: object) => {
    return orm.em.persistAndFlush(object)
}