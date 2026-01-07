package com.hotel.hotelmanagement.controller;

import com.hotel.hotelmanagement.entity.User;
import com.hotel.hotelmanagement.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reception/users")
@PreAuthorize("hasRole('RECEPTIONIST')")
public class ReceptionistUserController {

    private final UserRepository userRepo;

    public ReceptionistUserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // View users (READ ONLY)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // Update basic user details 
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());

        return userRepo.save(user);
    }
}
