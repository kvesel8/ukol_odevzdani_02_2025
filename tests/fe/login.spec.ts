import { test } from "@playwright/test";
import { LoginPom } from "../../src/pom/loginPom";


  
test.describe("Login tests", () => {

  test("Log in with standard user", async ({ page }) => {
    const login = new LoginPom(page, test);

    await login.navigateToLoginPage();
    await login.fillStandardUser();
    await login.clickLoginButton();
    await page.pause();
  });

  test('Login with no username and passwoprd', async({page}) => {
    const login = new LoginPom(page, test);

    await login.navigateToLoginPage()
    await login.clickLoginButton()
    await login.checkRequiredErrorDisplayed()

  })

  test("Login with invalid user name", async ({ page }) => {
    const login = new LoginPom(page, test);

    await login.navigateToLoginPage()
    await login.fillInvalidUserName()
    await login.clickLoginButton()
    await login.checkUserNameOrPasswordErrorDisplayed()

  });

  test("Login with invalid password", async ({ page }) => {
    const login = new LoginPom(page, test);

    await login.navigateToLoginPage()
    await login.fillInvalidPassword()
    await login.clickLoginButton()
    await login.checkUserNameOrPasswordErrorDisplayed()

  });
});
