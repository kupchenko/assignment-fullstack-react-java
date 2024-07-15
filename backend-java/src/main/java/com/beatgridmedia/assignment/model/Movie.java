package com.beatgridmedia.assignment.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "movie")
public class Movie {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String description;
  private Integer year;
  private String duration;
  private Double rating;
  @Column(name = "image_url")
  private String imageUrl;
  @Column(name = "thumbnail_url")
  private String thumbnailUrl;
  private String directors;
  private String genres;
  private String actors;
}
