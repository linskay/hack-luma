package com.hahaton.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hahaton.model.ResumeRequest;
import com.hahaton.model.ResumeResponse;
import com.hahaton.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.context.annotation.Import;
import com.hahaton.config.SecurityConfig;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ResumeController.class)
@Import(SecurityConfig.class)
public class ResumeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ResumeService resumeService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGenerateResume_Success() throws Exception {
        // Given
        ResumeRequest request = new ResumeRequest();
        ResumeRequest.PersonalInfo personalInfo = new ResumeRequest.PersonalInfo();
        personalInfo.setName("Иван Иванов");
        personalInfo.setEmail("ivan@example.com");
        personalInfo.setPhone("+7 (999) 123-45-67");
        personalInfo.setLocation("Москва");
        request.setPersonalInfo(personalInfo);
        request.setJobTitle("Frontend Developer");

        ResumeResponse response = new ResumeResponse("base64pdfcontent", "Резюме успешно сгенерировано", true);
        when(resumeService.generateResume(any(ResumeRequest.class))).thenReturn(response);

        // When & Then
        mockMvc.perform(post("/api/resume/generate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Резюме успешно сгенерировано"))
                .andExpect(jsonPath("$.pdfBase64").value("base64pdfcontent"));
    }

    @Test
    public void testGenerateResume_Error() throws Exception {
        // Given
        ResumeRequest request = new ResumeRequest();
        ResumeResponse response = new ResumeResponse(null, "Ошибка при генерации", false);
        when(resumeService.generateResume(any(ResumeRequest.class))).thenReturn(response);

        // When & Then
        mockMvc.perform(post("/api/resume/generate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Ошибка при генерации"));
    }

    @Test
    public void testHealth() throws Exception {
        mockMvc.perform(get("/api/resume/health"))
                .andExpect(status().isOk())
                .andExpect(content().string("Resume service is running"));
    }
}
