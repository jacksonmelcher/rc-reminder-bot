import { Service, Bot } from "ringcentral-chatbot/dist/models";

const remind = async () => {
    const services = await Service.findAll({ where: { name: "Remind" } });
    console.log(services.length);
    // for (const service of services) {
    //     const group = await service.groupId;

    //     console.log(group);
    // }
};

export default remind;
