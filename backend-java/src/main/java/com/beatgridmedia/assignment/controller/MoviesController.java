package com.beatgridmedia.assignment.controller;

import com.beatgridmedia.assignment.dto.request.CreateCommentRequest;
import com.beatgridmedia.assignment.dto.response.CommentsResponse;
import com.beatgridmedia.assignment.dto.response.MovieDto;
import com.beatgridmedia.assignment.dto.response.MoviesListResponse;
import com.beatgridmedia.assignment.service.MoviesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET})
@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MoviesController {
  private final MoviesService moviesService;

  @GetMapping
  private MoviesListResponse findMovies(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "30") Integer count) {
    return moviesService.findMovies(page, count);
  }

  @GetMapping("/{movieId}")
  private MovieDto findMoviesById(@PathVariable Long movieId) {
    return moviesService.findMovie(movieId);
  }

  @GetMapping("/{movieId}/comments")
  private CommentsResponse findMoviesComments(@PathVariable Long movieId) {
    return moviesService.findMovieComments(movieId);
  }


  @PostMapping("/{movieId}/comments")
  private void createCommentForMovie(@PathVariable Long movieId, @RequestBody CreateCommentRequest request) {
    moviesService.createCommentForMovie(movieId, request);
  }
}
