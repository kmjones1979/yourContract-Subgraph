import { BigInt } from "@graphprotocol/graph-ts";
import { GreetingChange as GreetingChangeEvent } from "../generated/YourContract/YourContract";
import { Greeting, Sender } from "../generated/schema";
import { log } from "matchstick-as";

export function handleGreetingChange(event: GreetingChangeEvent): void {
    let senderString = event.params.greetingSetter.concatI32(
        event.logIndex.toI32()
    );

    log.info("Sender: {}", [senderString.toHexString()]);

    let sender = Sender.load(senderString);

    if (sender === null) {
        sender = new Sender(senderString);
        sender.address = event.params.greetingSetter;
        sender.createdAt = event.block.timestamp;
        sender.greetingCount = BigInt.fromI32(1);
    } else {
        sender.greetingCount = sender.greetingCount.plus(BigInt.fromI32(1));
    }

    let greeting = new Greeting(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );

    greeting.newGreeting = event.params.newGreeting;
    greeting.sender = senderString;
    greeting.premium = event.params.premium;
    greeting.value = event.params.value;

    greeting.blockNumber = event.block.number;
    greeting.blockTimestamp = event.block.timestamp;
    greeting.transactionHash = event.transaction.hash;

    sender.save();
    greeting.save();
}
