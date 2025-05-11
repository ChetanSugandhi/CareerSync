package com.demo.jobs.ZidioHireportal.Service;

import com.demo.jobs.ZidioHireportal.Model.StudentModel;
import com.demo.jobs.ZidioHireportal.Repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }

    public StudentModel getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public StudentModel addStudent(StudentModel student) {
        return studentRepository.save(student);
    }

    public StudentModel updateStudent(Long id, StudentModel student) {
        student.setId(id);
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
