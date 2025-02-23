import { test } from '@playwright/test'
import { LoginPom } from '../pom/loginPom'
import { InventoryPom } from '../pom/inventoryPom'
import { CartPom } from '../pom/cartPom'
import { CheckoutPom } from '../pom/checkoutPom'
import { CheckoutCompletePom }from '../../src/pom/checkoutCompletePom'




test('Fill personal data form and finish the order', async({page}) => {
    const login = new LoginPom(page,test)
    const inventory = new InventoryPom(page, test)
    const cart = new CartPom(page,test)
    const checkout = new CheckoutPom(page,test)
    const checkoutComplete = new CheckoutCompletePom(page,test)    

    await login.navigateToLoginPage()
    await login.fillStandardUser()
    await login.clickLoginButton()

    await inventory.addItemToCart()
    
    await cart.navigateToCart()
    await cart.navigateToCheckout()

    await checkout.clickContinueButton()
    await checkout.fillPersonalData()
    await checkout.clickFinishButton()

    await checkoutComplete.checkSuccessfullOrder()
})