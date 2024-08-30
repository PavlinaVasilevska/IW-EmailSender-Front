import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OccurrenceService } from '../../services/occurrence.service';
import { OccurrenceDTO } from '../../models/occurrence.dto.model';

@Component({
  selector: 'app-occurrence-details',
  templateUrl: './occurrence-details.component.html',
  styleUrls: ['./occurrence-details.component.css']
})
export class OccurrenceDetailsComponent implements OnInit {
  occurrence: OccurrenceDTO | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = true;

  constructor(
    private occurrenceService: OccurrenceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOccurrence();
  }

  private loadOccurrence(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.occurrenceService.getOccurrenceByUuid(uuid).subscribe(
        (occurrence: OccurrenceDTO) => {
          this.occurrence = occurrence;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching occurrence details', error);
          this.errorMessage = 'Failed to load occurrence details.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'Invalid occurrence identifier.';
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
