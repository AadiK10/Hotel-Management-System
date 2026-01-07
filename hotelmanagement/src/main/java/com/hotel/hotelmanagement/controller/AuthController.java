package com.hotel.hotelmanagement.controller;

import com.hotel.hotelmanagement.dto.RegisterRequest;
import com.hotel.hotelmanagement.service.AuthService;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;

    public AuthController(AuthService authService,
            AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return "User registered";
    }
    
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(
            request.email,
            request.password,
            authenticationManager
        );
    }


       
}
