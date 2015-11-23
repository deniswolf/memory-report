module.exports = function(initSettings){
  var memwatch = require('memwatch-next');
  var heapdump;
  var settings = initSettings || {};
  var logger = settings.logger || console.log;
  var errorLogger = settings.errorLogger || settings.logger || console.error;
  var heapDumpEnabled = settings.dump;
  var dumpPathOrFunction = settings.dumpPathOrFunction;

  var reportStats = settings.reportStats;

  if(heapDumpEnabled){
    heapdump = require('heapdump');
  }
  if(reportStats){
    memwatch.on('stats', function(stats) {
      logger({GC_STATS:stats});
    });
  }
  memwatch.on('leak', function(info){
    logger("MEMORY_REPORT:",info);

    if(heapDumpEnabled){
      var dumpPath;
      if (typeof(dumpPathOrFunction) == 'function') {
        dumpPath = dumpPathOrFunction();
      } else if (typeof(dumpPathOrFunction) == 'string'){
        dumpPath = dumpPathOrFunction;
      }
      if(dumpPath){
        heapdump.writeSnapshot(function(err, file){
          if(err){
            errorLogger({MEMORY_REPORT:err});
          }
          logger({MEMORY_REPORT_DUMP_FILE:file});
        });
      } else {
        heapdump.writeSnapshot();
      }
    }
  })

}
