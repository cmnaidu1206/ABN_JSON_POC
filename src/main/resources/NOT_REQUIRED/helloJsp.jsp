<%@ page language="java" contentType="text/html; charset=US-ASCII"
	pageEncoding="US-ASCII"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<body>
		<c:out value="${pageContext.request.remoteUser}"></c:out>
		<c:out value='${param.lastName}'/>,
		<c:out value='${param.firstName}'/>
		 <c:forEach items='${header}' var='h'>
         <ul>
            <%-- Display the key of the current item, which
                 represents the request header name and the
                 current item's value, which represents the
                 header value --%>
            <li>Header Name: <c:out value='${h.key}'/></li>
            <li>Header Value: <c:out value='${h.value}'/></li>
         </ul>
      </c:forEach>
       <c:forEach items='${param}' var='h'>
         <ul>
            <%-- Display the key of the current item, which
                 represents the request header name and the
                 current item's value, which represents the
                 header value --%>
            <li>PARAM Name: <c:out value='${h.key}'/></li>
            <li>PARAM Value: <c:out value='${h.value}'/></li>
         </ul>
      </c:forEach>
</body>
<p>
</html>