package com.hotel.hotelmanagement.controller;

import com.hotel.hotelmanagement.entity.User;
import com.hotel.hotelmanagement.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserRepository userRepo;

    public AdminUserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // View all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // Delete user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }
}
