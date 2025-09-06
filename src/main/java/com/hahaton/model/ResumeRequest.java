package com.hahaton.model;

import java.util.List;

public class ResumeRequest {
    private PersonalInfo personalInfo;
    private List<Skill> skills;
    private String jobTitle;
    private String jobUrl; // Ссылка на вакансию
    private String experience;
    private String education;
    private String additionalInfo;

    public static class PersonalInfo {
        private String name;
        private String email;
        private String phone;
        private String location;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
    }

    public static class Skill {
        private String name;
        private int level; // 1-100
        private String category;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public int getLevel() { return level; }
        public void setLevel(int level) { this.level = level; }
        
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
    }

    // Getters and Setters
    public PersonalInfo getPersonalInfo() { return personalInfo; }
    public void setPersonalInfo(PersonalInfo personalInfo) { this.personalInfo = personalInfo; }
    
    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }
    
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    
    public String getJobUrl() { return jobUrl; }
    public void setJobUrl(String jobUrl) { this.jobUrl = jobUrl; }
    
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    
    public String getAdditionalInfo() { return additionalInfo; }
    public void setAdditionalInfo(String additionalInfo) { this.additionalInfo = additionalInfo; }
}
