<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
		<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
			<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
				<!DOCTYPE html>
				<html>

				<head>
					<link rel="shortcut icon" href="<c:url value=" asserts/images/favicon.ico " />" />
					<link rel="stylesheet" href="<c:url value=" asserts/css/bootstrap.min.css " />" />
					<link rel="stylesheet" href="<c:url value=" asserts/css/custom-styles.css " />" />

					<script src="<c:url value=" asserts/lib/jquery-3.3.1.js " />"></script>
					<script src="<c:url value=" asserts/lib/bootstrap.min.js " />"></script>

					<title>ABN AMRO</title>
				</head>

				<body>
					<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
						<div class="container-fluid">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
								    aria-controls="navbar">
									<span class="sr-only">Toggle navigation</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
								<a class="navbar-brand" href="/">ABN AMRO</a>
							</div>
							<div id="navbar" class="collapse navbar-collapse">
								<ul class="nav navbar-nav">
									<li class="active">
										<a href="/">Home</a>
									</li>
									<li>
										<a href="/">About</a>
									</li>
								</ul>
								<c:if test="${param.logout == null}">
								<ul class="nav navbar-nav navbar-right">
									<li class="dropdown">
										<a  href="" class="dropdown-toggle" data-toggle="dropdown">Register
											<span class="caret"></span>
										</a>
										<ul class="dropdown-menu dropdown-lr animated flipInX" role="menu">
											<div class="col-lg-12">
												<div class="text-center">
													<h3>
														<b>Register</b>
													</h3>
												</div>
												<form id="ajax-register-form" action="/register" method="post" role="form" autocomplete="off">
													<div class="form-group">
														<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
													</div>
													<div class="form-group">
														<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="">
													</div>
													<div class="form-group">
														<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
													</div>
													<div class="form-group">
														<input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
													</div>
													<div class="form-group">
														<div class="row">
															<div class="col-xs-6 col-xs-offset-3">
																<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-info" value="Register Now">
															</div>
														</div>
													</div>
													<input type="hidden" class="hide" name="token" id="token" value="7c6f19960d63f53fcd05c3e0cbc434c0">
												</form>
											</div>
										</ul>
									</li>
									<li class="dropdown">
										<a href="" class="dropdown-toggle" data-toggle="dropdown">Log In
											<span class="caret"></span>
										</a>
										<ul class="dropdown-menu dropdown-lr animated slideInRight" role="menu">
											<div class="col-lg-12">
												<div class="text-center">
													<h3>
														<b>Log In</b>
													</h3>
												</div>
												<form id="ajax-login-form" action="/login" method="post" role="form" autocomplete="off">
													<div class="form-group">
														<label for="username">Username</label>
														<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="" autocomplete="off">
													</div>

													<div class="form-group">
														<label for="password">Password</label>
														<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" autocomplete="off">
													</div>

													<div class="form-group">
														<div class="row">
															<div class="col-xs-7">
																<input type="checkbox" tabindex="3" name="remember" id="remember">
																<label for="remember"> Remember Me</label>
															</div>
															<div class="col-xs-5 pull-right">
																<input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-success" value="Log In">
															</div>
														</div>
													</div>

													<div class="form-group">
														<div class="row">
															<div class="col-lg-12">
																<div class="text-center">
																	<a href="" tabindex="5" class="forgot-password">Forgot Password?</a>
																</div>
															</div>
														</div>
													</div>
													<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
												</form>
											</div>
										</ul>
									</li>
								</ul>
								</c:if>
							</div>
						</div>
					</nav>

						<!-- <c:if test="${param.error ne null}">
							<p>Invalid username and password.</p>
						</c:if>
						<c:if test="${param.logout ne null}">
							<p>You have been logged out</p>
						</c:if>
						<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> -->
				</body>

				</html>