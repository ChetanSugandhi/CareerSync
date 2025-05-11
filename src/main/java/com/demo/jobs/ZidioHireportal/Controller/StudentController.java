package com.demo.jobs.ZidioHireportal.Controller;

import com.demo.jobs.ZidioHireportal.Model.StudentModel;
import com.demo.jobs.ZidioHireportal.Service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students
    @GetMapping
    public List<StudentModel> getAllStudents() {
    	System.out.println("hii");
        return studentService.getAllStudents();
    }

    // Get a student by ID
    @GetMapping("/{id}")
    public StudentModel getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // Add a new student
    @PostMapping("/savestudent")
    public StudentModel addStudent(@RequestBody StudentModel student) {
        return studentService.addStudent(student);
    }

    // Update an existing student
    @PutMapping("/{id}")
    public StudentModel updateStudent(@PathVariable Long id, @RequestBody StudentModel student) {
        return studentService.updateStudent(id, student);
    }

    // Delete a student by ID
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}
