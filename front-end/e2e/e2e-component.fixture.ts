import { Page } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';

export class E2EComponentFixture {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

const config: PlaywrightTestConfig = {
  reporter:[['html',{open:'always'}]],
  use:{
    headless:false,
    viewport:{width:1280 , height:720},
    ignoreHTTPSErrors:true,
    launchOptions:{
      slowMo:2000,
    }

  }
}


export default config;