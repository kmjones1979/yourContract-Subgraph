import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { GreetingChange } from "../generated/YourContract/YourContract"

export function createGreetingChangeEvent(
  greetingSetter: Address,
  newGreeting: string,
  premium: boolean,
  value: BigInt
): GreetingChange {
  let greetingChangeEvent = changetype<GreetingChange>(newMockEvent())

  greetingChangeEvent.parameters = new Array()

  greetingChangeEvent.parameters.push(
    new ethereum.EventParam(
      "greetingSetter",
      ethereum.Value.fromAddress(greetingSetter)
    )
  )
  greetingChangeEvent.parameters.push(
    new ethereum.EventParam(
      "newGreeting",
      ethereum.Value.fromString(newGreeting)
    )
  )
  greetingChangeEvent.parameters.push(
    new ethereum.EventParam("premium", ethereum.Value.fromBoolean(premium))
  )
  greetingChangeEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return greetingChangeEvent
}
