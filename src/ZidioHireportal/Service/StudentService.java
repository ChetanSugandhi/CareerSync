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
    	Optional<StudentModel> existingStudent = studentRepository.findByEmail(student.getEmail());
        return existingStudent.orElseGet(() -> studentRepository.save(student));
    }

    public StudentModel updateStudent(Long id, StudentModel student) {
        student.setId(id);
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    public void uploadResume(Long id, byte[] resumeData) {
        StudentModel student = studentRepository.findById(id).orElse(null);
        if (student != null) {
            student.setResume(resumeData);
            studentRepository.save(student);
        }
    }

    public byte[] downloadResume(Long id) {
        return studentRepository.findById(id)
                .map(StudentModel::getResume)
                .orElse(null);
    }

  
    

}
