package com.beatgridmedia.assignment.repository;

import com.beatgridmedia.assignment.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
