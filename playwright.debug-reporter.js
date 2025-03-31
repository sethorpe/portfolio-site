const { Reporter } = require('@playwright/test/reporter');

class DebugReporter {
    onTestEnd(test, result) {
        const status = result.status === 'passed' ? '✓' : '✗';
        console.log(`Test: ${test.title} - Status: ${status}`);
    }
}

module.exports = DebugReporter;