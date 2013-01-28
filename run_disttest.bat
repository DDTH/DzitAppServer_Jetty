set JETTY_HOME=%cd%\disttest
DEL /q/s %JETTY_HOME%\logs\*.*
rem DEL /q/s %CATALINA_HOME%\temp\*.*
rem DEL /q/s %CATALINA_HOME%\work\*.*
call %JETTY_HOME%\bin\jettyserver.bat run
