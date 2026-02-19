package com.hotel.hotelmanagement.controller;

import com.hotel.hotelmanagement.dto.LoginRequest;
import com.hotel.hotelmanagement.dto.RegisterRequest;
import com.hotel.hotelmanagement.entity.User;
import com.hotel.hotelmanagement.repository.UserRepository;
import com.hotel.hotelmanagement.security.JwtUtil;
import com.hotel.hotelmanagement.service.AuthService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService,
                         AuthenticationManager authenticationManager,
                         UserRepository userRepository,
                         JwtUtil jwtUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
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

    // ✅ NEW ENDPOINT - Get current user profile (works for ALL roles)
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extract token from header
            String token = authHeader.substring(7);
            
            // Extract email from token
            String email = jwtUtil.extractEmail(token);
            
            // Find user by email
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Return user data (excluding password)
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}