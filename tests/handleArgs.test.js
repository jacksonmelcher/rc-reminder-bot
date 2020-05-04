import handleArgs from "../src/handleArgs";
import {
    helpText,
    issueText,
    noArgsText,
    joinedGroup,
} from "../responses/index";

const testHelpEvent = {
    type: "Message4Bot",
    text: "help",
};
const testIssueEvent = {
    type: "Message4Bot",
    text: "issue",
};
const testNoArgsEvent = {
    type: "Message4Bot",
    text: "",
};

const testJoinedEvent = {
    type: "BotJoinGroup",
    text: "",
};

it("should output help text", async () => {
    const returned = await handleArgs(testHelpEvent, false, true);

    expect(returned).toBe(helpText);
});

it("should output issue text", async () => {
    const returned = await handleArgs(testIssueEvent, false, true);

    expect(returned).toBe(issueText);
});

it("should output noArgs text", async () => {
    const returned = await handleArgs(testNoArgsEvent, false, true);

    expect(returned).toBe(noArgsText);
});

it("should output noArgs text", async () => {
    const returned = await handleArgs(testNoArgsEvent, false, true);

    expect(returned).toBe(noArgsText);
});

test("should output bot JoinedGroup text", async () => {
    const returned = await handleArgs(testJoinedEvent, false, true);

    expect(returned).toBe(joinedGroup);
});
