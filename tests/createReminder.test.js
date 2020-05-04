import { createReminder } from "../src/createReminder";
import moment from "moment";

const event = {
    type: "Message4Bot",
    text: "-m test",
    group: {
        id: "321544194",
        name: null,
        description: null,
        type: "PrivateChat",
        status: "Active",
        members: ["228768004", "680681005"],
        isPublic: null,
        creationTime: "2020-04-14T17:47:57.287Z",
        lastModifiedTime: "2020-04-21T21:00:32.866Z",
    },
    bot: {
        id: "680681005",
        token: {
            access_token:
                "U0pDMTJQMDFQQVMwMHxBQUMyOGtNMEYzMFg2VmRxc3hwVDFmTElneG0xTmx4ZXpYb0owa1lrNTNuM0xoVkFfMmo0LXN5UXVmeGdZT2FQOWdwNF9QWWRPMEVYNENYQjd4dmJsWHJoOU1pQ0tjQmZFWE04RWFEc3FFZ0lVQUJnbmFtelhsTjJWcG5ITWlHbWlRWnlSVUdSUHlBeW13NVU4YkptV2hHamxZWkluRE9pbHNncTBhUE9fYmRscS11RkNEb0ZRc1B2MGNxTTYzb2d5ZWZaUlgyaXBHYXhsVm9VZkl3QnE3RzZ8U2k0dFZBfGlFWGpleGxfa0FhNTEtSzVNbWlHUUF8QUE",
            token_type: "bearer",
            expires_in: 2147483647,
            scope: "ReadAccounts EditExtensions SubscriptionWebhook Glip",
            owner_id: "680681005",
            endpoint_id: "BEiJ7WYFQ7ywz79mMcg2Uw",
        },
        createdAt: "2020-04-14T17:47:26.440Z",
        updatedAt: "2020-04-14T17:47:26.440Z",
    },
    userId: "228768004",
    message: {
        id: "3812999172",
        groupId: "321544194",
        type: "TextMessage",
        text: "![:Person](680681005) -m test",
        creatorId: "228768004",
        addedPersonIds: null,
        creationTime: "2020-04-21T21:00:32.810Z",
        lastModifiedTime: "2020-04-21T21:00:32.810Z",
        attachments: null,
        activity: null,
        title: null,
        iconUri: null,
        iconEmoji: null,
        mentions: [
            {
                id: "680681005",
                type: "Person",
                name: "Remind",
            },
        ],
        eventType: "PostAdded",
    },
};

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
