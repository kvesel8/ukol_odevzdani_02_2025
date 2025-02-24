import {Page, TestType, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs,PlaywrightWorkerOptions} from '@playwright/test'


export class InventoryPom {
    
    protected _page: Page
    protected _test: TestType<PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    private _defaultTimeout: number

    constructor (
        page: Page,
        test:TestType<PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    ) {
        this._page=page
        this._test=test
        this._defaultTimeout=10_000
    }

    public async sortHighToLow(){
        await this._test.step('Sorting products from highest price to lowest price', async() => {
            await this._page.locator('select[data-test="product-sort-container"]').first().click({timeout:this._defaultTimeout})
            await this._page.locator('select', {hasText:'"Price (high to low)"'}).first().click({timeout:this._defaultTimeout}); 
            //await this._page.locator('value="hilo"').first().click({timeout:this._defaultTimeout});   
            //await this._page.getByText('"Price (high to low)"').first().click({timeout:this._defaultTimeout}); 
        })
    }

    public async addItemToCart(){
    
    }    
}