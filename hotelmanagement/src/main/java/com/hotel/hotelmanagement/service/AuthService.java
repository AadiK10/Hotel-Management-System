package com.hotel.hotelmanagement.service;

import com.hotel.hotelmanagement.dto.RegisterRequest;
import com.hotel.hotelmanagement.entity.Role;
import com.hotel.hotelmanagement.entity.User;
import com.hotel.hotelmanagement.repository.RoleRepository;
import com.hotel.hotelmanagement.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.hotel.hotelmanagement.security.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;


import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;


    public AuthService(UserRepository userRepo,
                       RoleRepository roleRepo,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       UserDetailsService userDetailsService) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    public void register(RegisterRequest req) {

    	Role role = roleRepo.findByName(req.role)
    	        .orElseGet(() -> {
    	            Role newRole = new Role();
    	            newRole.setName(req.role);
    	            return roleRepo.save(newRole);
    	        });


        User user = new User();
        user.setUsername(req.username);
        user.setEmail(req.email);
        user.setPassword(passwordEncoder.encode(req.password));
        user.setRoles(Set.of(role));

        userRepo.save(user);
    }
    
    public String login(String email, String password,
            AuthenticationManager authManager) {

			authManager.authenticate(
			new UsernamePasswordAuthenticationToken(email, password)
			);
			
			UserDetails userDetails =
			userDetailsService.loadUserByUsername(email);
			
			return jwtUtil.generateToken(userDetails);
    	}
}
