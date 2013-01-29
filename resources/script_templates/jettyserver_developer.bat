@echo off
rem
rem Startup script for jetty under Windows systems.

rem set JETTY_HOME=@@JETTY_HOME@@
rem set ACTIVEMQ_HOME=%JETTY_HOME%\activemq
rem set ACTIVEMQ_BASE=%ACTIVEMQ_HOME%
rem set OPTS_JVM=-server -Xms128m -Xmx128m -Djava.net.preferIPv4Stack=true -Djava.awt.headless=true -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:PrintFLSStatistics=1 -XX:PrintCMSStatistics=1 -XX:+PrintTenuringDistribution -XX:+PrintGCDetails -XX:+PrintGCDateStamps -verbose:gc -Xloggc:%JETTY_HOME%\logs\garbage.log
rem set OPTS_ACTIVEMQ=-Dactivemq.home=%ACTIVEMQ_HOME% -Dactivemq.base=%ACTIVEMQ_BASE% -Dorg.apache.activemq.UseDedicatedTaskRunner=false -Dorg.apache.activemq.store.kahadb.LOG_SLOW_ACCESS_TIME=200
rem set JETTY_OPTS=-Djetty.home=%JETTY_HOME% -Dhazelcast.mancenter.home=%JETTY_HOME%\data\hazelcast -Dspring.profiles.active=dev %OPTS_ACTIVEMQ% %OPTS_JMX% %OPTS_JVM%

set STOP.PORT=8055
set STOP.KEY=jetty_stop_key
set STOP.WAIT=10
set JAVA_EXEC=java
set EXTRA_OPS=STOP.KEY=%STOP.KEY% STOP.PORT=%STOP.PORT%

if ""%1"" == ""version"" goto doVersion
if ""%1"" == ""dry-run"" goto doDryRun
if ""%1"" == ""run"" goto doRun
if ""%1"" == ""start"" goto doStart
if ""%1"" == ""stop"" goto doStop

echo Usage:  jettyserver ( commands ... )
echo commands:
echo   version           Print version information
echo   dry-run           "dry-run "Jetty
echo   run               Start Jetty in the current window
echo   start             Start Jetty in a separate window
echo   stop              Stop Jetty
goto end

:doVersion
	set ACTION=--version
	goto execCmd

:doDryRun
	set ACTION=--dry-run
	goto execCmd

:doStop
	set ACTION=--stop
	set EXTRA_OPS=%EXTRA_OPS% STOP.WAIT=%STOP.WAIT%
	goto execCmd
	
:doRun
	set ACTION=
	goto execCmd

:doStart
	set ACTION=
	if not "%OS%" == "Windows_NT" goto noTitle
	if "%TITLE%" == "" set TITLE=Jetty
	set JAVA_EXEC=start "%TITLE%" %JAVA_EXEC%
	goto gotTitle
:noTitle
	set JAVA_EXEC=start %JAVA_EXEC%
:gotTitle
	goto execCmd
	
:execCmd
	%JAVA_EXEC% %JETTY_OPTS% -jar %JETTY_HOME%\start.jar %EXTRA_OPS% --ini=%JETTY_HOME%\start.ini %ACTION%
	goto end

:end