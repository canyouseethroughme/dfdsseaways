import { MikroORM } from '@mikro-orm/core'
import { MenuItem } from '../entities/MenuItem'
import { seed, persist } from '../constants'

export const menuItemSeeds = async (orm: MikroORM) => {
    //// TYPE
    // starter: 1
    // main_course: 2
    // side_orders: 3
    // desert: 4
    // alcoholic: 5
    // nonalcoholic: 6
    //// ITEM_TYPE
    // food: 1
    // drink: 2
    // /////////////////////////////////////
    const menuItem1 = seed(orm, MenuItem, {type: 1, item_type: 1, name: 'KöD Tartare', description: 'Beef tartare made from Danish prime beef w. crispy rye bread, beetroot, smoked mayo & lemon', price: 105})
    const menuItem2 = seed(orm, MenuItem, {type: 1, item_type: 1, name: 'Lobster Ravioli', description: 'Homemade ravioli w. langoustine, herbal oil & langoustine broth', price: 95})
    const menuItem3 = seed(orm, MenuItem, {type: 1, item_type: 1, name: 'Salmon Tartare', description: 'Thinly sliced Danish beef w. Danish gouda cheese, croutons, baby leafs & browned butter cream', price: 110})
    const menuItem4 = seed(orm, MenuItem, {type: 2, item_type: 1, name: 'Ribeye', description: '400gr. Greater Omaha - Angus/Hereford - USA/Grain-fed', price: 395})
    const menuItem5 = seed(orm, MenuItem, {type: 2, item_type: 1, name: 'Ribeye', description: '350gr. Angus/Hereford - Australia/Grain-fed', price: 350})
    const menuItem6 = seed(orm, MenuItem, {type: 2, item_type: 1, name: 'Ribeye', description: '700gr. Cöte de köd - Hereford - Uruguay/Grain-fed - Matured at least 35 days', price: 565})
    const menuItem7 = seed(orm, MenuItem, {type: 2, item_type: 1, name: 'Wagyu', description: '150gr. Snowbeef - Hida-Gyu - Grade5A/Feeding: Corn, grains & Japanese beer', price: 545})
    const menuItem8 = seed(orm, MenuItem, {type: 2, item_type: 1, name: 'Tenderloin', description: '225gr. Hereford - Uruguay/Grass-fed - Matured at least 35 days', price: 285})
    const menuItem9 = seed(orm, MenuItem, {type: 3, item_type: 1, name: 'Steak Fries à la KöD', description: 'Danish gouda cheese & herbs', price: 50})
    const menuItem10 = seed(orm, MenuItem, {type: 3, item_type: 1, name: 'Sweet Potato Fries', description: 'Danish gouda cheese & herbs', price: 55})
    const menuItem11 = seed(orm, MenuItem, {type: 3, item_type: 1, name: 'Chili/Garlic Fries', description: 'Thin fries w. homemade chili seasoning', price: 55})
    const menuItem12 = seed(orm, MenuItem, {type: 3, item_type: 1, name: 'Sauteed Mushrooms', description: 'w. pickled pearl onions & thyme', price: 50})
    const menuItem13 = seed(orm, MenuItem, {type: 3, item_type: 1, name: 'Truffle Fries w. fresh tarragon', description: 'Danish gouda cheese & herbs', price: 50})
    const menuItem14 = seed(orm, MenuItem, {type: 4, item_type: 1, name: 'Classic creme brulee', description: 'w, passionfruit sorbet', price: 80})
    const menuItem15 = seed(orm, MenuItem, {type: 4, item_type: 1, name: 'White Chocolate Mousse', description: 'w. roasted almonds, cherries & dark chocolate', price: 80})
    const menuItem16 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Gin & Tonic', description: 'Choose your favourite from our extensive G&T Menu', price: 85})
    const menuItem17 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Lemonade à la KöD', description: 'Stolichnaya Vodka – Homemade lemonade – Angostura', price: 80})
    const menuItem18 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Dark ‘n’ Stormy', description: 'Bacardi Anejo Cuatro – Ginger Beer – Lime – Gomme', price: 95})
    const menuItem19 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Rio Alto', description: 'Chardonnay, Reserva, 2018, Maipo – Chile', price: 80})
    const menuItem20 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Seguinot-Bordet', description: 'Chablis Premier Cru, 2017, Chablis – France', price: 95})
    const menuItem21 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Toscana Rosso', description: 'Sangiovese, Carparzo, 2018, Toscana – Italy', price: 95})
    const menuItem22 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Tuborg Classic', description: 'Danish dark and slightly complex pilsner beer', price: 60})
    const menuItem23 = seed(orm, MenuItem, {type: 5, item_type: 2, name: 'Heineken', description: 'Dutch super-inoffensive lager with a stronger, bitter taste', price: 60})
    const menuItem24 = seed(orm, MenuItem, {type: 6, item_type: 2, name: 'Evian', description: 'Natural spring water from several sources near Évian-les-Bains, Geneva', price: 70})
    const menuItem25 = seed(orm, MenuItem, {type: 6, item_type: 2, name: 'Juice', description: 'Fresh juice made from oranges, apples, grepfruits or strawberries', price: 50})
    const menuItem26 = seed(orm, MenuItem, {type: 6, item_type: 2, name: 'Soda', description: 'Coca-Cola, Fanta Orange, Faxe Kondi or Tonic water', price: 60})
    await persist(orm, [menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6, menuItem7, menuItem8, menuItem9, menuItem10, menuItem11, menuItem12, menuItem13, menuItem14, menuItem15, menuItem16, menuItem17, menuItem18, menuItem19, menuItem20, menuItem21, menuItem22, menuItem23, menuItem24, menuItem25, menuItem26])
    const menuItems = await orm.em.find(MenuItem, {})
    console.log('menu items:', menuItems)
}