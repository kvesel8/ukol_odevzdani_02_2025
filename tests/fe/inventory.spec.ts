import { test } from '@playwright/test'
import { InventoryPom } from '../pom/inventoryPom'
import { LoginPom } from '../pom/loginPom'



test.describe('Inventory tests', () => {
    test('Select to view items High to Low price',{tag:"@only"}, async ({page}) => {
        const inventory= new InventoryPom(page, test)
        const login = new LoginPom(page,test)
    
        await login.navigateToLoginPage()
        await login.fillStandardUser()
        await login.clickLoginButton()
        await inventory.sortHighToLow()
    })
    
        test('Add the most expensive item to cart', async ({page}) => {
        const inventory= new InventoryPom(page, test)
        const login = new LoginPom(page,test)
    
        await login.navigateToLoginPage()
        await login.fillStandardUser()
        await login.clickLoginButton()
        await inventory.sortHighToLow()
        await inventory.addItemToCart()
        
    }) 
})



