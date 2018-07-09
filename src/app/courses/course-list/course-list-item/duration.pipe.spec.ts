import { DurationPipe } from './duration.pipe';

describe('CourseDurationPipe', () => {
  const pipe = new DurationPipe();
  it('should instantiate successfully', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform minutes to hours and minutes', () => {
    expect(pipe.transform(162)).toBe('2h 42min');
  });

  it('should not show hours if duration is less than one hour', () => {
    expect(pipe.transform(42)).toBe('42min');
  });

  it('should pad minutes with zero if needed', () => {
    expect(pipe.transform(65)).toBe('1h 05min');
  });
});
