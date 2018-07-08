import { DurationPipe } from './duration.pipe';

describe('CourseDurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });
});
