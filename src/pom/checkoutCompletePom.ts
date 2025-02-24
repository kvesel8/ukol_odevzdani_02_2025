import {TestType, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions, Page, expect} from '@playwright/test'
import { checkoutCompleteSel } from '../../data/selectors/checkoutCompleteSel'


export class CheckoutCompletePom {

    protected _page: Page
    protected _test: TestType <PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>

    constructor(
        page: Page,
        test: TestType <PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    ) {
        this._page=page
        this._test=test
    }

    public async checkSuccessfullOrder(){ 
       await this._test.step('Check order is succesfully completed', async() => {
        await expect(this._page.locator(checkoutCompleteSel.CHECKOUT_TEXT)).toHaveText('Checkout: Complete!')
       })
    }
}