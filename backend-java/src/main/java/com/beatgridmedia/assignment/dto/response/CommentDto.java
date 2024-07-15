package com.beatgridmedia.assignment.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
  private Long id;
  private String content;
  private String userName;
  private String userAvatarUrl;
  private LocalDateTime timestamp;
}
