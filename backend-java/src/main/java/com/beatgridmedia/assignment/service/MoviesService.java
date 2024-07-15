package com.beatgridmedia.assignment.service;

import com.beatgridmedia.assignment.dto.request.CreateCommentRequest;
import com.beatgridmedia.assignment.dto.response.CommentDto;
import com.beatgridmedia.assignment.dto.response.CommentsResponse;
import com.beatgridmedia.assignment.dto.response.MovieDto;
import com.beatgridmedia.assignment.dto.response.MoviesListResponse;
import com.beatgridmedia.assignment.model.Comment;
import com.beatgridmedia.assignment.model.Movie;
import com.beatgridmedia.assignment.model.User;
import com.beatgridmedia.assignment.repository.CommentsRepository;
import com.beatgridmedia.assignment.repository.MoviesRepository;
import com.beatgridmedia.assignment.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MoviesService {
  private final ObjectMapper objectMapper;
  private final UserRepository userRepository;
  private final MoviesRepository moviesRepository;
  private final CommentsRepository commentsRepository;

  public MoviesListResponse findMovies(Integer page, Integer count) {
    PageRequest pageRequest = PageRequest.of(page, count);
    List<MovieDto> movies = moviesRepository.findAll(pageRequest)
        .stream()
        .map(this::mapToMovieDto)
        .toList();
    long totalMoviesInTheLibrary = moviesRepository.count();
    return new MoviesListResponse(movies, totalMoviesInTheLibrary);
  }

  public MovieDto findMovie(Long movieId) {
    return moviesRepository.findById(movieId)
        .map(this::mapToMovieDto)
        .orElseThrow(() -> new IllegalArgumentException("Movie not found by id"));
  }

  @SneakyThrows
  private MovieDto mapToMovieDto(Movie movie) {
    MovieDto movieDto = new MovieDto();
    movieDto.setId(movie.getId());
    movieDto.setName(movie.getName());
    movieDto.setDescription(movie.getDescription());
    movieDto.setRating(movie.getRating());
    movieDto.setThumbnailUrl(movie.getThumbnailUrl());
    movieDto.setYear(movie.getYear());
    movieDto.setImageUrl(movie.getImageUrl());
    movieDto.setDuration(toStringDuration(Duration.parse(movie.getDuration())));
    movieDto.setActors(objectMapper.readValue(movie.getActors(), List.class));
    movieDto.setDirectors(objectMapper.readValue(movie.getDirectors(), List.class));
    movieDto.setGenres(objectMapper.readValue(movie.getGenres(), List.class));
    return movieDto;
  }

  private String toStringDuration(Duration duration) {
    return String.format("%dh %02dm",
        duration.toHours(),
        duration.toMinutesPart());
  }

  public CommentsResponse findMovieComments(Long movieId) {
    PageRequest pageRequest = PageRequest.of(0, 500, Sort.by("timestamp").ascending());
    List<CommentDto> allByMovieId = commentsRepository.findAllByMovieId(movieId, pageRequest)
        .stream()
        .map(MoviesService::mapToCommentDto)
        .collect(Collectors.toList());
    return new CommentsResponse(allByMovieId);
  }

  private static CommentDto mapToCommentDto(Comment comment) {
    CommentDto commentDto = new CommentDto();
    commentDto.setContent(comment.getContent());
    commentDto.setUserName(comment.getUser().getName());
    commentDto.setUserAvatarUrl(comment.getUser().getAvatarUrl());
    commentDto.setTimestamp(comment.getTimestamp());
    return commentDto;
  }

  public void createCommentForMovie(Long movieId, CreateCommentRequest request) {
    Movie movie = moviesRepository.findById(movieId)
        .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
    Long userId = 1L; // This id should be retrieved from spring security context
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    Comment comment = new Comment();
    comment.setMovie(movie);
    comment.setContent(request.getContent());
    comment.setTimestamp(LocalDateTime.now());
    comment.setUser(user);
    commentsRepository.save(comment);
  }
}
