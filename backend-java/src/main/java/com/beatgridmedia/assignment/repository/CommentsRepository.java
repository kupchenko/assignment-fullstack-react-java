package com.beatgridmedia.assignment.repository;

import com.beatgridmedia.assignment.model.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentsRepository extends CrudRepository<Comment, Long> {
  List<Comment> findAllByMovieId(Long movieId, Pageable pageRequest);
}
