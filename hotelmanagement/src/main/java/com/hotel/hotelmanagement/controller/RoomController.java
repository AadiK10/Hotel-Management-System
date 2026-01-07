package com.hotel.hotelmanagement.controller;

import com.hotel.hotelmanagement.entity.Room;
import com.hotel.hotelmanagement.repository.RoomRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepo;

    public RoomController(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    // View all rooms (ALL roles)
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    // Add room (ADMIN only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Room addRoom(@RequestBody Room room) {

        room.setStatus("AVAILABLE");
        return roomRepo.save(room);
    }
    
    @PutMapping("/{id}/book")
    @PreAuthorize("hasAnyRole('CUSTOMER','RECEPTIONIST')")
    public Room bookRoom(@PathVariable Long id) {

        Room room = roomRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if ("BOOKED".equals(room.getStatus())) {
            throw new RuntimeException("Room already booked");
        }

        room.setStatus("BOOKED");
        return roomRepo.save(room);
    }

}
