package com.beatgridmedia.assignment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MoviesListResponse {
  private List<MovieDto> movies;
  private long totalMovies;
}
