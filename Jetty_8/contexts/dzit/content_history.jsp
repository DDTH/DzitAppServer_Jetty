<%@page session="false" %>
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.*" %>
<div id="content-wrap">
	<div id="main">
        <h2>2013-01-29: v1.0.2</h2>
        <ul>
            <li>Bundle Hazelcast Control Center.</li>
        </ul>
	
        <h2>2013-01-29: v1.0.1</h2>
        <ul>
            <li>Add login service DzitAppServer_Realm.</li>
            <li>Bundle ActiveMQ v5.6.0.</li>
        </ul>
        
		<h2>2013-01-29: v1.0</h2>
		<p>Start project DzitAppServer_Jetty</p>
	</div>
	
	<%
	List customMainMenuList = new ArrayList();
	/*
	Map menuItem = new HashMap();
	menuItem.put("url", "#DDTHServer");
	menuItem.put("label", "DDTH Server Info");
	customMainMenuList.add(menuItem);
	
	menuItem = new HashMap();
	menuItem.put("url", "#VersionInfo");
	menuItem.put("label", "Version Info");
	customMainMenuList.add(menuItem);
	*/
	%>
	<%@include file="sidebar.jsp" %>
</div>
