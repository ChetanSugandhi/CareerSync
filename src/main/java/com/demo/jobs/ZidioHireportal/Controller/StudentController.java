package com.demo.jobs.ZidioHireportal.Controller;

import com.demo.jobs.ZidioHireportal.Model.StudentModel;
import com.demo.jobs.ZidioHireportal.Service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // ✅ Accessible by USER and ADMIN
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<StudentModel> getAllStudents() {
        System.out.println("hii");
        return studentService.getAllStudents();
    }

    // ✅ Accessible by USER and ADMIN
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public StudentModel getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // ✅ Accessible by ADMIN only
    @PostMapping("/savestudent")
    @PreAuthorize("hasRole('ADMIN')")
    public StudentModel addStudent(@RequestBody StudentModel student) {
        return studentService.addStudent(student);
    }

    // ✅ Accessible by ADMIN only
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public StudentModel updateStudent(@PathVariable Long id, @RequestBody StudentModel student) {
        return studentService.updateStudent(id, student);
    }

    // ✅ Accessible by ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}
