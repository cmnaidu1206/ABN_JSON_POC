<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<style type="text/css">
.bg {
	background-image: url("asserts/images/bg.jpg");
	height: 100%; 
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
	<!-- All Style sheets are Included at the top -->
	<link rel="shortcut icon" href="<c:url value=" asserts/images/favicon.ico " />" />
	<link rel="stylesheet" href="<c:url value=" asserts/css/bootstrap.min.css " />" />
	<link rel="stylesheet" href="<c:url value=" asserts/css/custom-styles.css " />" />
	<title>ABN AMRO</title>
</head>

<body class="bg">
	<div class="container">
		<div class="col-md-4 col-sm-3"></div>
		<div class="col-md-4 col-sm-6">
			<div class="jumbotron" style="margin-top: 100px">
				<div class="row">
					<h3 align="center" style="color: #00958F; margin-top: 0px;">ABN AMRO</h3>
					<form action="${pageContext.request.contextPath}/login" method="post">
						<div class="form-group inner-addon left-addon">
							<i class="glyphicon glyphicon-user"></i>
							<input type="text" name="username" class="form-control" placeholder="username">
						</div>
						<div class="form-group inner-addon left-addon">
							<i class="glyphicon glyphicon-lock"></i>
							<input type="password" name="password" class="form-control" placeholder="password">
						</div>
						<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
						<button type="submit" class="btn-primary form-control " style="background-color: #00958F">Sign in</button>
					</form>
				</div>

				<c:if test="${param.error ne null}">
					<div class="row" style="margin-top: 10px">
						<div class="alert alert-danger">
							Invalid Credentials !
						</div>
					</div>
				</c:if>

				<c:if test="${param.logout ne null}">
					<div class="row" style="margin-top: 10px">
						<div class="alert alert-info">
							Successfully Signed Out !
						</div>
					</div>
				</c:if>
			</div>
		</div>
		<div class="col-md-4 col-sm-3"></div>
	</div>
</body>
<!-- All scripts will be included at the bottom -->
<script src="<c:url value=" asserts/lib/jquery-3.3.1.js " />"></script>
<script src="<c:url value=" asserts/lib/bootstrap.min.js " />"></script>
</html>