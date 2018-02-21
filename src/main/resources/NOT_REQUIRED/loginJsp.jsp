<%@ page language="java" contentType="text/html; charset=US-ASCII"
	pageEncoding="US-ASCII"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


	<%-- <form action="/login" method="POST">
		<label for="username">User Name:</label> <input id="username"
			name="username" type="text" /> <label for="password">Password:</label>
		<input id="password" name="password" type="password" /> <input
			type="submit" value="Log In" /> <input type="hidden"
			name="${_csrf.parameterName}" value="${_csrf.token}" />
	</form>    --%>

	
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="asserts/css/bootstrap.min.css" type="text/css">
    <meta charset="utf-8">
    <title>Login</title>
  </head>
<body style="background-color: #4b5257">
  <div class="container">
    <div class="col-lg-4"></div>
    <div class="col-lg-4">
      <div class="jumbotron" style="margin-top:150px">
        <h3>Please login</h3>
        <form action="Dashboard.jsp">
          <div class="form-group">
            <input type="text" name="username" class="form-control" placeholder="Enter Username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Enter password">
          </div>
          <button type="submit" class="btn-primary form-control">Login</button>
        </form>
      </div>
    </div>
    <div class="col-lg-4"></div>
  </div>
</body>
</html>