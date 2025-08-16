package com.hahaton.controller;

import com.hahaton.ai.AIAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {
    
    private final AIAgent aiAgent;
    
    @Autowired
    public AIController(AIAgent aiAgent) {
        this.aiAgent = aiAgent;
    }
    
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        String response = aiAgent.getResponse(question);
        
        return ResponseEntity.ok(Map.of("response", response));
    }
    
    @GetMapping("/tip")
    public ResponseEntity<Map<String, String>> getRandomTip() {
        String tip = aiAgent.getRandomTip();
        return ResponseEntity.ok(Map.of("tip", tip));
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "AI Agent is running!"));
    }
}
