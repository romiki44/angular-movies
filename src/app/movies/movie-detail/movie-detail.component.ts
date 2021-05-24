import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieDTO } from '../movies.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoordinatesMapWithMessage } from '../../utilities/map/coordinate';
import { RatingService } from '../../utilities/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitazer: DomSanitizer,
    private ratingService: RatingService
  ) {}

  movie: MovieDTO;
  releaseDate: Date;
  trailerUrl: SafeResourceUrl;
  coordinates: CoordinatesMapWithMessage[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService.getById(params.id).subscribe((movie) => {
        console.log(movie);
        this.movie = movie;
        this.releaseDate = new Date(movie.releaseDate);
        this.trailerUrl = this.generateYoutubeUrlForEmbeddedVideo(
          movie.trailer
        );
        this.coordinates = movie.movieTheaters.map((movieTheater) => {
          return {
            latitude: movieTheater.latitude,
            longitude: movieTheater.longitude,
            message: movieTheater.name,
          };
        });
      });
    });
  }

  generateYoutubeUrlForEmbeddedVideo(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }

    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    const embeddedLink = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitazer.bypassSecurityTrustResourceUrl(embeddedLink);
  }

  onRating(rate: number) {
    this.ratingService.rate(this.movie.id, rate).subscribe(() => {
      Swal.fire('Success', 'Your vote has been received', 'success');
    });
  }
}
