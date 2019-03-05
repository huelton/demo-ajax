package com.huelton.demoajax.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/")
    public String index(){
    	return "redirect:/promocao/add";
    }
	
	@GetMapping("/table")
    public String table(){
    	return "promo-datatables";
    }
}
