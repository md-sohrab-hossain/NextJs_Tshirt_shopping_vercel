const puppeteer = require("puppeteer");

describe("Tshirt prenting design site test", () => {
  const Url = URL + "/";
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--start-maximized"],
      defaultViewport: null,
    });
    const pages = await browser.pages();
    page = pages[0];
  });

  it("Compilation check", async () => {
    const response = await page.goto(Url, {
      waitUntil: "networkidle2",
    });

    await expect(response.status()).toBe(200);
    await expect(page.title()).resolves.toMatch("Tshirt desing and order");
  });

  it("Go to login page", async () => {
    const loginButton = "a[href='/customPages/user/login']";
    await page.waitForSelector(loginButton);
    await page.click(loginButton);
    await page.waitForNavigation({
      waitUntil: "networkidle2",
    });
    expect(page.url()).toContain(Url + "customPages/user/login");
  });

  it("Fillup Login form and login", async () => {
    const email = "input[placeholder='Enter Email']";
    const password = "input[placeholder='Enter Password']";
    await page.waitForSelector(email);
    await page.focus(email);
    await page.keyboard.type("test123@gmail.com"); // input email

    await page.waitForSelector(password);
    await page.focus(password);
    await page.keyboard.type("123456"); // input password
    await page.keyboard.press("Enter"); // trigger submit and go to home page/
    await page.waitForNavigation({
      waitUntil: "networkidle2",
    });
    expect(page.url()).toContain(Url);
  });

  afterAll(async () => {
    browser.close();
  });
});
