package com.demo.jobs.ZidioHireportal.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.jobs.ZidioHireportal.Model.StudentModel;
import com.demo.jobs.ZidioHireportal.Service.StudentService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {
	@Autowired
    private StudentService studentService;

    // Get student profile
    @GetMapping("/{id}")
    public ResponseEntity<StudentModel> getProfile(@PathVariable Long id) {
        StudentModel student = studentService.getStudentById(id);
        if (student != null) return ResponseEntity.ok(student);
        return ResponseEntity.notFound().build();
    }

    // Update student profile
    @PutMapping("/{id}")
    public ResponseEntity<StudentModel> updateProfile(@PathVariable Long id, @RequestBody StudentModel updatedStudent) {
        StudentModel student = studentService.updateStudent(id, updatedStudent);
        return ResponseEntity.ok(student);
    }
}


