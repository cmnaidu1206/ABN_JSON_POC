package com.capgemini.ABN_AMERO_POC.login;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.ABN_AMERO_POC.shared.Response;

@RestController
@RequestMapping("/rest/user")
public class LoginController {

	@Autowired
	LoginService loginService;
	
	public LoginController() {
	}

	@PostMapping("/add")
	public Response addLogin(@RequestBody Login login) {
		return loginService.addLogin(login);
	}

	@PostMapping("/delete")
	public Response deleteLogin(@RequestBody Login login) {
		return loginService.deleteLogin(login);
	}

	@PostMapping("/update")
	public Response updateLogin(@RequestBody Login login) {
		return loginService.updateLogin(login);
	}
	@GetMapping("/get/{userName}")
	public Login getLoginByUserName(@PathVariable("userName")String userName) {
		return loginService.getLoginByUserName(userName);
	}

	@GetMapping("/getAll")
	public List<Login> getAllLogins() {
		return loginService.getAllLogins();
	}
	
	@PostMapping("/changePassword")
	public Response changePassword(@RequestBody Password password) {
		return loginService.changePassword(password);
	}
}
