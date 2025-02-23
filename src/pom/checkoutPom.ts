import {TestType, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions, Page} from '@playwright/test'
import { personFormData } from '../type/personFormDataTypes'
import { checkoutSel } from '../../data/selectors/checkoutSel'


const jsonData = JSON.parse(JSON.stringify(require('../../data/json/personFormData.json')))
const formData = jsonData as personFormData

export class CheckoutPom {

    protected _page: Page
    protected _test: TestType <PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    private _defaultTimeout: number

    constructor(
        page: Page,
        test: TestType <PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    ) {
        this._page=page
        this._test=test
        this._defaultTimeout=10_000
    }

    public async fillPersonalData(){ 
        await this._test.step('Fill form with personal data', async() => {
            await this._page.getByPlaceholder(checkoutSel.FIRST_NAME).fill(formData.firstName)
            await this._page.locator(checkoutSel.LAST_NAME).fill(formData.lastName)
            await this._page.locator(checkoutSel.POSTAL_CODE).fill(formData.postalCode)
        })
    }

    public async clickContinueButton(){
        await this._test.step('Click the button Continue to continue to checkout-step-two', async() => {
            await this._page.locator(checkoutSel.CONTINUE_BUTTON).click({timeout:this._defaultTimeout})
        })
    }

    public async clickFinishButton(){
        await this._test.step('Click the Finish button in checkout-step-two', async()=> {
            await this._page.locator(checkoutSel.FINISH_BUTTON).click({timeout:this._defaultTimeout})
        })
    }
}