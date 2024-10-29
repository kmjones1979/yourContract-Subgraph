import { GreetingChange as GreetingChangeEvent } from "../generated/YourContract/YourContract"
import { GreetingChange } from "../generated/schema"

export function handleGreetingChange(event: GreetingChangeEvent): void {
  let entity = new GreetingChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.greetingSetter = event.params.greetingSetter
  entity.newGreeting = event.params.newGreeting
  entity.premium = event.params.premium
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
