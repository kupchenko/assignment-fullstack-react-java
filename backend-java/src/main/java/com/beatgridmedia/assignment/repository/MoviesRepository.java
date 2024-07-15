package com.beatgridmedia.assignment.repository;

import com.beatgridmedia.assignment.model.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MoviesRepository extends CrudRepository<Movie, Long> {
  List<Movie> findAll(Pageable pageable);
}
