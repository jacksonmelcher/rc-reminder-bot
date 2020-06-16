// import handleArgs from "../src/handleArgs";

// import {
//     helpText,
//     issueText,
//     noArgsText,
//     joinedGroup,

//     testEvent,
// } from "../responses/index";

// let event = testEvent;
// const testHelpEvent = {
// type: "Message4Bot",

//     text: "help",
// };
// const testIssueEvent = {
//     type: "Message4Bot",
//     text: "issue",
// };
// const testNoArgsEvent = {
//     type: "Message4Bot",
//     text: "",
// };

// const testJoinedEvent = {
//     type: "BotJoinGroup",
//     text: "",
// };
// const message = [
//     {
//         creator: "Jackson Melcher",
//         creatorId: "228768004",
//         duration: "PT9M23.489S",
//         groupId: "560119814",
//         reminderTime: "2020-05-06T20:09:00.000Z",
//         text: "This is a message for the event test",
//         timeCreated: "2020-05-06T19:59:36.511Z",
//     },
// ];

// it("should output help text", async () => {
//     const returned = await handleArgs(testHelpEvent, false, true);

//     expect(returned).toBe(helpText);
// });

// it("should output issue text", async () => {
//     const returned = await handleArgs(testIssueEvent, false, true);

//     expect(returned).toBe(issueText);
// });

// it("should output noArgs text", async () => {
//     const returned = await handleArgs(testNoArgsEvent, false, true);

//     expect(returned).toBe(noArgsText);
// });

// it("should output noArgs text", async () => {
//     const returned = await handleArgs(testNoArgsEvent, false, true);

//     expect(returned).toBe(noArgsText);
// });

// it("should output bot JoinedGroup text", async () => {
//     const returned = await handleArgs(testJoinedEvent, false, true);

//     expect(returned).toBe(joinedGroup);
// });

// // it("Not sure", async () => {
// //     const returned = await handleArgs(event, false, true);

// //     expect(returned).toMatchObject(message);
// // });
