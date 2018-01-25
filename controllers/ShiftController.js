Schedule(instances of shifts - terrible name)
id Int {
    Unique
    area Area.id
    startTime DateTime
    endTime DateTime
}

Swap
initiator Schedule.id
target Schedule.id