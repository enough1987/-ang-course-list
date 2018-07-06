import { Course } from './course.model';

describe('CourseModel', () => {
  it('should instantiate successfully', () => {
    const course = new Course(
      42,
      1530287255,
      'the Ultimate Course',
      123,
      'on Life, the Universe, and Everything',
    );

    expect({ ...course }).toEqual({  // Expected object to be a kind of Object, but was Course({ ... })
      id: 42,
      creationDate: 1530287255,
      title: 'the Ultimate Course',
      durationMin: 123,
      description: 'on Life, the Universe, and Everything',
    });
  });

  it('should instantiate with default values for optional parameters', () => {
    const course = new Course(
      42,
      1530287255,
      'the Ultimate Course',
    );

    expect({ ...course }).toEqual({
      id: 42,
      creationDate: 1530287255,
      title: 'the Ultimate Course',
      durationMin: 0,
      description: '',
    });
  });
});