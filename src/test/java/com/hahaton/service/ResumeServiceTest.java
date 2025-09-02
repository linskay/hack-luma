package com.hahaton.service;

import com.hahaton.ai.GeminiService;
import com.hahaton.model.ResumeRequest;
import com.hahaton.model.ResumeResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ResumeServiceTest {

    @Mock
    private GeminiService geminiService;

    @InjectMocks
    private ResumeService resumeService;

    private ResumeRequest testRequest;

    @BeforeEach
    void setUp() {
        testRequest = new ResumeRequest();
        
        ResumeRequest.PersonalInfo personalInfo = new ResumeRequest.PersonalInfo();
        personalInfo.setName("Иван Иванов");
        personalInfo.setEmail("ivan@example.com");
        personalInfo.setPhone("+7 (999) 123-45-67");
        personalInfo.setLocation("Москва");
        testRequest.setPersonalInfo(personalInfo);
        
        ResumeRequest.Skill skill = new ResumeRequest.Skill();
        skill.setName("Java");
        skill.setLevel(85);
        skill.setCategory("Backend");
        testRequest.setSkills(Arrays.asList(skill));
        
        testRequest.setJobTitle("Java Developer");
        testRequest.setExperience("3 года разработки на Java");
        testRequest.setEducation("Высшее техническое образование");
        testRequest.setAdditionalInfo("Активный участник open source проектов");
    }

    @Test
    void testGenerateResume_Success() {
        // Given
        when(geminiService.generateText(anyString())).thenReturn("Сгенерированное резюме");

        // When
        ResumeResponse response = resumeService.generateResume(testRequest);

        // Then
        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertNotNull(response.getPdfBase64());
        assertTrue(response.getPdfBase64().length() > 0);
        assertEquals("Резюме успешно сгенерировано", response.getMessage());
    }

    @Test
    void testGenerateResume_WithGeminiError() {
        // Given
        when(geminiService.generateText(anyString())).thenThrow(new RuntimeException("AI service error"));

        // When
        ResumeResponse response = resumeService.generateResume(testRequest);

        // Then
        assertNotNull(response);
        assertTrue(response.isSuccess()); // Should fallback to basic template
        assertNotNull(response.getPdfBase64());
        assertTrue(response.getPdfBase64().length() > 0);
    }

    @Test
    void testGenerateResume_WithEmptyRequest() {
        // Given
        ResumeRequest emptyRequest = new ResumeRequest();
        emptyRequest.setPersonalInfo(new ResumeRequest.PersonalInfo());
        emptyRequest.setJobTitle("Test");

        // When
        ResumeResponse response = resumeService.generateResume(emptyRequest);

        // Then
        assertNotNull(response);
        // Service should return a response even if it's not successful
        assertNotNull(response.getMessage());
    }

    @Test
    void testGenerateResume_WithNullValues() {
        // Given
        ResumeRequest nullRequest = new ResumeRequest();
        nullRequest.setJobTitle("Test");

        // When
        ResumeResponse response = resumeService.generateResume(nullRequest);

        // Then
        assertNotNull(response);
        // Service should return a response even if it's not successful
        assertNotNull(response.getMessage());
    }
}
