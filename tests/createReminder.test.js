// import { createReminder } from "../src/createReminder";
// import moment from "moment";

// it("Should handle message then time", async () => {
//     const text = "-m message first -t 5/4/20 4:20pm";
//     const args = text.split(" ");
//     const message = {
//         text: "message first",
//         timeCreated: "2020-05-04T22:00:23.426Z",
//         reminderTime: "2020-05-04T23:20:00.000Z",
//         creator: "Jackson Melcher",
//         groupId: "321544194",
//     };
//     const returned = await createReminder(args, event, true);

//     expect(returned).toMatchObject(message);
// });

// it("Should handle message then time", async () => {
//     const text = "-t 5/1/20 7:00pm -m time first";
//     const args = text.split(" ");
//     const message = {
//         text: "message first",
//         timeCreated: "2020-05-04T22:00:23.426Z",
//         reminderTime: "2020-05-04T23:20:00.000Z",
//         creator: "Jackson Melcher",
//         groupId: "321544194",
//     };
//     const returned = await createReminder(args, event, true);
//     console.log("RETURNED" + returned);

//     expect(returned).toMatchObject(message);
// });
