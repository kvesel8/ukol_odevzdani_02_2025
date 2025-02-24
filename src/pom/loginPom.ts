import {expect, TestType, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs,PlaywrightWorkerOptions, Page} from '@playwright/test'
import { loginSel as sel}   from '../../data/selectors/loginSel'
import { Users } from '../type/usersDataTypes'

const urlLogin= 'https://www.saucedemo.com/'

const jsonData= JSON.parse(JSON.stringify(require("../../data/json/usersData")))
const users = jsonData as Users


export class LoginPom {

    protected _page: Page
    protected _test: TestType<PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
    protected _url: string
    private _defaultTimeout: number
    private _clickDelay: number

    constructor(
        page:Page,
        test: TestType<PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>

    ) {
        this._page=page
        this._test=test
        this._url=urlLogin
        this._defaultTimeout=10_000
        this._clickDelay=200
    }

    public async navigateToLoginPage(){
        await this._test.step('Navigate to login page', async() => {
            await this._page.goto(urlLogin,{timeout:this._defaultTimeout, waitUntil:'load'})
            await expect(this._page).toHaveURL(urlLogin,{timeout:this._defaultTimeout})
        })
    }

    public async fillStandardUser(){
        await this._test.step('Fill username and password', async() => {
            await this._page.getByPlaceholder(sel.USERNAME_FIELD).first().fill(users.validPassword[0].username,{timeout:this._defaultTimeout})
            await this._page.locator(sel.PASSWORD_FIELD).first().fill(users.validPassword[0].password,{timeout:this._defaultTimeout})
        })
    }

    public async clickLoginButton(){
        await this._test.step('Click on the login button and check for home page', async() => {
            await this._page.locator(sel.LOGIN_BUTTON).first().click({timeout:this._defaultTimeout, delay:this._clickDelay})

        })
    }

    public async fillInvalidUserName(){
        await this._test.step('Fill invalid username and correct password', async() => {
                await this._page.getByPlaceholder(sel.USERNAME_FIELD).first().fill(users.invalidUserName[0].username,{timeout:this._defaultTimeout})
                await this._page.locator(sel.PASSWORD_FIELD).first().fill(users.invalidUserName[0].password,{timeout:this._defaultTimeout})         
        })
    }

    public async fillInvalidUserNamesCheck(){
        await this._test.step('Fill invalid usernames and valid passwords', async() => {
            for (let user of users.invalidUserName) {
                await this._page.getByPlaceholder(sel.USERNAME_FIELD).first().fill(user.username,{timeout:this._defaultTimeout})
                await this._page.locator(sel.PASSWORD_FIELD).first().fill(user.password,{timeout:this._defaultTimeout})
                await this.clickLoginButton()
                await this.reloadPage()
            }
        })
    }

    public async fillInvalidPassword(){
        await this._test.step('Fill invalid password and valid username', async() =>{
            await this._page.getByPlaceholder(sel.USERNAME_FIELD).first().fill(users.invalidPassword[0].username,{timeout:this._defaultTimeout})
            await this._page.locator(sel.PASSWORD_FIELD).first().fill(users.invalidPassword[0].password,{timeout:this._defaultTimeout})         
        })
    }
    
    public async checkUserNameOrPasswordErrorDisplayed(){
        await this._test.step('Check error message is displayed in case invalid username or password', async() => {
            await expect(this._page.locator(sel.ERROR_MESSAGE_FIELD)).toContainText('Epic sadface: Username and password do not match any user in this service')
        })
    }

    public async checkRequiredErrorDisplayed(){
        await this._test.step('Check error message is displayed in case username or password field is empty', async() => {
            await expect(this._page.locator(sel.ERROR_MESSAGE_FIELD)).toContainText('is required')
        })
    }

    public async reloadPage(){
        await this._page.reload({timeout:this._defaultTimeout,waitUntil:'load'})
    }
}