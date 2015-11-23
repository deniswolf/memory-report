# memory-report
node.js module for reporting memory consumption and optionally taking heap dumps on detected leaks

## Settings
* logger - logger for memory stats on GC (default: console.log)
* errorLogger - logger for memory leaks and errors (default: console.error)
* reportStats - report every GC events (default: false)
* dump - try to record dump heap file on memory leaks (default: false)
* dumpPathOrFunction - string or function that returns path for memory dump heaps (default: current directory)
