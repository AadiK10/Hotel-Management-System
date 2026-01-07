package com.hotel.hotelmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reception")
public class ReceptionistController {

    @GetMapping("/dashboard")
    public String receptionistDashboard() {
        return "Receptionist dashboard access";
    }
}
