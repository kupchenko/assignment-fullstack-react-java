package com.beatgridmedia.assignment.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class MovieDto {
  private Long id;
  private String name;
  private String description;
  private Integer year;
  private String duration;
  private Double rating;
  private String imageUrl;
  private String thumbnailUrl;
  private List<String> directors;
  private List<String> genres;
  private List<String> actors;
}
