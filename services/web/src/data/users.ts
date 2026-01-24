import type { User } from "../types/basetypes";

const users: User[] = [
    {
        id: 1,
        username: "john_doe",
        email: "john.doe@example.com",
        accountType: "buyer",
        phoneNumber: "123-456-7890",
    },
    {
        id: 2,
        username: "jane_seller",
        email: "jane.seller@example.com",
        accountType: "seller",
        phoneNumber: "098-765-4321",
    }
]

export { users };