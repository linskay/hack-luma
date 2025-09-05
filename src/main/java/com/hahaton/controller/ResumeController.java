package com.hahaton.controller;

import com.hahaton.model.ResumeRequest;
import com.hahaton.model.ResumeResponse;
import com.hahaton.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/generate")
    public ResponseEntity<ResumeResponse> generateResume(@RequestBody ResumeRequest request) {
        try {
            ResumeResponse response = resumeService.generateResume(request);
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ResumeResponse(null, "Ошибка сервера: " + e.getMessage(), false));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Resume service is running");
    }
}
