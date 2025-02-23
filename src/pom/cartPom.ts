import {TestType, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions, Page, expect} from '@playwright/test'
import { cartSel } from '../../data/selectors/cartSel'

const urlCart= 'https://www.saucedemo.com/cart.html'

export class CartPom {

    protected _page: Page
    protected _test: TestType <PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    private _url: string
    private _defaultTimeout: number

    constructor(
        page: Page,
        test: TestType <PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    ) {
        this._page=page
        this._test=test
        this._url=urlCart
        this._defaultTimeout=10_000
    }

    public async navigateToCart(){
        await this._test.step('Navigate to shopping cart', async() => {
            await this._page.locator(cartSel.CART_BUTTON).first().click({timeout:this._defaultTimeout})
            await expect(this._page).toHaveURL(this._url)
        })
    }

    public async productCheck(){

    }

    public async navigateToCheckout(){
        await this._test.step('Click the button checkout to navigate to Checkout', async() =>{
            await this._page.locator(cartSel.CHECKOUT_BUTTON).first().click({timeout:this._defaultTimeout})
        })
    }
}