const gatherPageObjects = require('./scripts/pageObject-finder');

exports.config = {
  capabilities: {
    seleniumAddress: process.env.SELENIUM_ADDRESS,
    SELENIUM_PROMISE_MANAGER: 0,
    metadata: {
      device: `${process.env.DEVICE}`,
      platform: {
        name: `${process.env.PLATFORM}`,
        version: `${process.env.VERSION}`,
      },
    },
    browserName: process.env.BROWSER,
    shardTestFiles: (process.env.BROWSER_INSTANCES > 1),
    maxInstances: process.env.BROWSER_INSTANCES,
  },
  ignoreUncaughtExceptions: true,
  baseUrl: process.env.URL,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  async onPrepare() {
    browser.ignoreSynchronization = true;
    browser.resetUrl = 'file://';
  // eslint-disable-next-line global-require
    require('babel-register');
    await gatherPageObjects();
  },
  cucumberOpts: {
    strict: true,
    require: [
      `${__dirname}/../../${process.env.STEPS_DEFINITIONS_DEFAULT}`,
      'Step-definitions/*.js',
      'Hooks/*.js',
    ],
    format: `json:./reports/cucumber.${process.pid}.json`
  },
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      openReportInBrowser: true,
      displayDuration: true,
      pageTitle: 'Paylocity - Automated Test Report',
      reportName: 'Paylocity Challenge - Automated Test Report',
      pageFooter: `<div align="center">
                       <p class="text-align-center">by Jorge Lopez for Paylocity &nbsp; &nbsp;</p>
                   </div>`,
      customData: {
        title: 'Execution Details',
        data: [
          { label: 'Project', value: `${process.env.REPORT_PROJECT}` },
          { label: 'Release', value: `${process.env.REPORT_RELEASE}` },
        ],
      },
    },
  }],
};
