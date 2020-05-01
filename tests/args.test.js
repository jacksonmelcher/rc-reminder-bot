import handleArgs from '../src/handleArgs';
import { helpText, issueText } from '../responses/index';

const testHelpEvent = {
  type: 'Message4Bot',
  text: 'help',
};
const testIssueEvent = {
  type: 'Message4Bot',
  text: 'issue',
};

test('should output help text', async () => {
  const returned = await handleArgs(testHelpEvent);

  expect(returned).toBe(helpText);
});

test('should output issue text', async () => {
  const returned = await handleArgs(testIssueEvent);

  expect(returned).toBe(issueText);
});
