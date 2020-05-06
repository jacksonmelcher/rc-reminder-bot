import moment from "moment";

let time = moment().add(10, "minutes").format("MM/DD/YY hh:mm a");

export const testEvent = {
    type: "Message4Bot",
    text: `-m This is a message for the event test -t ${time}`,
    group: {
        id: "560119814",
        name: "Bot Demo (copy)",
        description: null,
        type: "Team",
        status: "Active",
        members: ["228768004", "680681005", "274527004"],
        isPublic: false,
        creationTime: "2020-05-04T17:43:25.662Z",
        lastModifiedTime: "2020-05-06T18:02:16.778Z",
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
        id: "3881312260",
        groupId: "560119814",
        type: "TextMessage",
        text:
            "![:Person](680681005) -m This is a message for the event test -t 05/06/20 11:30am",
        creatorId: "228768004",
        addedPersonIds: null,
        creationTime: "2020-05-06T18:02:16.669Z",
        lastModifiedTime: "2020-05-06T18:02:16.669Z",
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
