import { parse } from "../src/parse";

test("Should handle message then time", () => {
    const text = "-m message first -t 5/1/20 7:00pm";
    const args = text.split(" ");
    const message = {
        text: "message first",
        time: "5/1/20 7:00pm",
    };
    const returned = parse(args);

    expect(returned).toMatchObject(message);
});

test("Should handle message then time", () => {
    const text = "-t 5/1/20 7:00pm -m time first";
    const args = text.split(" ");
    const message = {
        text: "time first",
        time: "5/1/20 7:00pm",
    };
    const returned = parse(args);

    expect(returned).toMatchObject(message);
});
