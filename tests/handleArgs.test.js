import handleArgs from '../src/handleArgs';
import { helpText, issueText, noArgsText } from '../responses/index';

const testHelpEvent = {
    type: 'Message4Bot',
    text: 'help',
};
const testIssueEvent = {
    type: 'Message4Bot',
    text: 'issue',
};
const testNoArgsEvent = {
    type: 'Message4Bot',
    text: '',
};

test('should output help text', async () => {
    const returned = await handleArgs(testHelpEvent, false, true);

    expect(returned).toBe(helpText);
});

test('should output issue text', async () => {
    const returned = await handleArgs(testIssueEvent, false, true);

    expect(returned).toBe(issueText);
});

test('should output noArgs text', async () => {
    const returned = await handleArgs(testNoArgsEvent, false, true);

    expect(returned).toBe(noArgsText);
});
