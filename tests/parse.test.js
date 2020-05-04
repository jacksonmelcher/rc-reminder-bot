import { parse } from "../src/parse";
import moment from "moment";

const event = {
    group: {
        id: "696969",
    },
};

test("Should handle message then time", async () => {
    const text = "-m message first -t 5/1/20 7:00pm";
    const args = text.split(" ");
    const message = {
        text: "message first",
        timeCreated: moment(),
        reminderTime: moment("5/1/20 7:00pm", "MM/DD/YY hh:mm a"),
        creator: "Jackson Melcher",
        groupId: "696969",
    };
    const returned = await parse(args, event);

    expect(returned).toMatchObject(message);
});

test("Should handle message then time", async () => {
    const text = "-t 5/1/20 7:00pm -m time first";
    const args = text.split(" ");
    const message = {
        text: "message first",
        timeCreated: moment(),
        reminderTime: moment("5/1/20 7:00pm", "MM/DD/YY hh:mm a"),
        creator: "Jackson Melcher",
        groupId: "696969",
    };
    const returned = await parse(args, event);

    expect(returned).toMatchObject(message);
});
