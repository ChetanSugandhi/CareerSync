package com.demo.jobs.ZidioHireportal.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SturdentController {
	@RequestMapping("/Controller")
	public String great() {
		
		return "Welcome to jobsportal";
	}

}
