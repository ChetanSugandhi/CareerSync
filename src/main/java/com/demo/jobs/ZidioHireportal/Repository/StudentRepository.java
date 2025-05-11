package com.demo.jobs.ZidioHireportal.Repository;

import com.demo.jobs.ZidioHireportal.Model.StudentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentModel, Long> {
}

