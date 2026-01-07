package com.hotel.hotelmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @GetMapping("/dashboard")
    public String customerDashboard() {
        return "Customer dashboard access";
    }
}
