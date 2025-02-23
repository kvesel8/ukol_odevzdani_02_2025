import { test } from '@playwright/test'
import { LoginPom } from '../pom/loginPom'
import { InventoryPom } from '../pom/inventoryPom'
import { CartPom } from '../../src/pom/cartPom'


test('Check product in shopping cart', async({page}) => {
    const login = new LoginPom(page, test)
    const inventory = new InventoryPom(page, test)
    const cart = new CartPom(page,test)

    await login.navigateToLoginPage()
    await login.fillStandardUser()
    await login.clickLoginButton()

    await inventory.addItemToCart()

    await cart.navigateToCart()
    await cart.productCheck()
})