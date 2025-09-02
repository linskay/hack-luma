package com.hahaton.model;

public class ResumeResponse {
    private String pdfBase64;
    private String message;
    private boolean success;

    public ResumeResponse() {}

    public ResumeResponse(String pdfBase64, String message, boolean success) {
        this.pdfBase64 = pdfBase64;
        this.message = message;
        this.success = success;
    }

    // Getters and Setters
    public String getPdfBase64() { return pdfBase64; }
    public void setPdfBase64(String pdfBase64) { this.pdfBase64 = pdfBase64; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}
