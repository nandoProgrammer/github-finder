import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiGithubService } from './github.service';
import { environment } from '../../../environments/environment.development';

describe('ApiGithubService', () => {
  let service: ApiGithubService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiGithubService]
    });
    service = TestBed.inject(ApiGithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch profile by username', () => {
    const userName = 'testUser';
    const mockResponse = { id: 1, name: 'Test User' };

    service.getProfileByUserName(userName).subscribe((response:any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${userName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch profile repos', () => {
    const userName = 'testUser';
    const mockResponse = [{ id: 1, name: 'Repo1' }, { id: 2, name: 'Repo2' }];

    service.getProfileRepos(userName).subscribe((response:any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${userName}/repos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
