
package com.demo.jobs.ZidioHireportal.Controller;

import com.demo.jobs.ZidioHireportal.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private StudentService studentService;

    // Upload resume
    @PostMapping("/upload/{id}")
    public ResponseEntity<String> uploadResume(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            studentService.uploadResume(id, file.getBytes());
            return ResponseEntity.ok("Resume uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload resume.");
        }
    }

    // Download resume
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadResume(@PathVariable Long id) {
        byte[] resumeData = studentService.downloadResume(id);
        if (resumeData == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("resume_" + id + ".pdf")
                .build());

        return new ResponseEntity<>(resumeData, headers, HttpStatus.OK);
    }
}
